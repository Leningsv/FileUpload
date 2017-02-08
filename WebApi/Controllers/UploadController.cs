using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Models;

namespace WebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UploadController : ApiController
    {
        [HttpPost]
        public IHttpActionResult UploadListCSV(List<UploadCSV> listUpload)
        {            
            try
            {
                foreach (var item in listUpload)
                {
                    DataTable mySqlTable = new DataTable();
                    using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.AppSettings["ConnectionStringMysql"]))
                    {
                        MySqlCommand commandMysql = new MySqlCommand("INSERT INTO preso (nombre, pablellon, celda, horario) "
                            + "VALUES('" + item.Name + "', '" + item.Pavilion + "', '" + item.Cell + "', '" + item.Schedule + "')");
                        commandMysql.Connection = connection;
                        connection.Open();
                        MySqlDataAdapter dta = new MySqlDataAdapter(commandMysql);
                        dta.Fill(mySqlTable);
                        connection.Close();
                    }                    
                }                
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
            return Ok(true);
        }
        [HttpPost]
        public IHttpActionResult UploadCsv(List<UploadFileCsv> listUploadFileCsv)
        {
            List<UploadFileCsv> auxListUploadFileCsv= new List<UploadFileCsv>();
            DateTime date = DateTime.Now;
            try
            {
                foreach (var item in listUploadFileCsv)
                {
                    UploadFileCsv auxUploadFileCsv = new UploadFileCsv();
                    auxUploadFileCsv = item;                    
                    String[] listName = item.Name.Split('.');
                    auxUploadFileCsv.Name = listName[0] + "-" + date.ToString("yyyymmddhhmmss")+"."+listName[1];
                    auxUploadFileCsv.Address = ConfigurationManager.AppSettings["LocalPath"] + auxUploadFileCsv.Name;
                    Byte[] bytes = Convert.FromBase64String(item.File64);
                    File.WriteAllBytes(auxUploadFileCsv.Address, bytes);
                    auxListUploadFileCsv.Add(auxUploadFileCsv);
                }
                foreach (var item in auxListUploadFileCsv)
                {
                    DataTable mySqlTable = new DataTable();
                    using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.AppSettings["ConnectionStringMysql"]))
                    {
                        MySqlCommand commandMysql = new MySqlCommand("LOAD DATA LOCAL INFILE '" + item.Address + "' INTO TABLE preso "
                            + "FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n' IGNORE 1 LINES (nombre, pablellon, celda, horario) "
                            + "SET usuario= '" + item.Username+"', anio='"+item.Period.Year+"', mes='"+item.Period.Month+"'");

                        commandMysql.Connection = connection;
                        connection.Open();
                        MySqlDataAdapter dta = new MySqlDataAdapter(commandMysql);
                        dta.Fill(mySqlTable);
                        connection.Close();
                        //var bl = new MySqlBulkLoader(connection)
                        //{
                        //    TableName = "preso",
                        //    Timeout = 5000000,
                        //    FieldTerminator = ",",
                        //    LineTerminator = "\r\n",
                        //    FileName = item.Address,
                        //    NumberOfLinesToSkip = 1,
                        //    Columns = { "nombre", "pablellon", "celda", "horario" },
                            
                            
                        //};
                        //var numberOfInsertedRows = bl.Load();
                    }
                    item.State = true;
                }                
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
            return Ok(auxListUploadFileCsv);
        }
        [HttpPost]
        public IHttpActionResult ValidatePeriod(Period period)
        {
            try
            {
                DataTable mySqlTable = new DataTable();
                using (MySqlConnection connection = new MySqlConnection(ConfigurationManager.AppSettings["ConnectionStringMysql"]))
                {
                    MySqlCommand commandMysql = new MySqlCommand("select  count(*) from preso where anio='"+period.AuxPeriod.Year+"' and "
                        + "mes='"+period.AuxPeriod.Month+"' and celda='"+period.Cell+"'");
                    commandMysql.Connection = connection;
                    connection.Open();
                    MySqlDataAdapter dta = new MySqlDataAdapter(commandMysql);
                    dta.Fill(mySqlTable);
                    connection.Close();
                }
                period.PeriodNumber = Convert.ToInt32(mySqlTable.AsEnumerable().FirstOrDefault().ItemArray[0]);
            }
            catch (Exception ex)
            {
                return NotFound();
            }
            return Ok(period);
        }        
    }
}
