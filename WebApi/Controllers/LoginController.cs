using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Controllers.Authentication;
using WebApi.Models;

namespace WebApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        [HttpPost]
        public IHttpActionResult LoginUser(User user)
        {
            LdapAuthentication authentication = new LdapAuthentication(ConfigurationManager.AppSettings["ActiveDirectoryPath"]);
            try
            {
                user.Logged = authentication.IsAuthenticated(ConfigurationManager.AppSettings["ActiveDirectoryDomain"],user.Username,user.Password);
            }
            catch (Exception ex)
            {
                return NotFound();
            }
            user.Password = "";
            return Ok(user);
        }
    }
}
