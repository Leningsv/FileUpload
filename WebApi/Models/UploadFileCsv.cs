using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class UploadFileCsv
    {
        public String File64 { get; set; }
        public String Address { get; set; }
        public Boolean State { get; set; }
        public String Name { get; set; }
        public String Username { get; set; }
        public DateTime Period { get; set; }
    }
}