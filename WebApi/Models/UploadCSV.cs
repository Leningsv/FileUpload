using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class UploadCSV
    {
        public String Name { get; set; }
        //Pabellon
        public String Pavilion { get; set; }
        public String Cell { get; set; }
        //Horario
        public String Schedule { get; set; }
    }
}