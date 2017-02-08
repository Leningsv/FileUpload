using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class User
    {
        public String Username { get; set; }
        public String Password { get; set; }
        public Boolean Logged { get; set; }
    }
}