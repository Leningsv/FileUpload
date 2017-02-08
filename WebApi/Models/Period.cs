using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Period
    {
        public DateTime AuxPeriod { get; set; }
        public Int32 Cell { get; set; }
        public Int32 PeriodNumber { get; set; }
    }
}