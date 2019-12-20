using NetromApp.Business.Data.Interfaces;
using NetromApp.Business.Entities.Foundation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NetromApp.Business.Entities
{
    public class UsersBm : BaseTrackedEntity, IUser
    {
        public string Email { get ; set ; }
        public string UserName { get; set; }
        string IUser.Id { get ; set ; }
    }
}