using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetromApp.Business.Data.Interfaces
{
    public interface IUser
    {
        string Id { get; set; }
        string Email { get; set; }
        string UserName { get; set; }
    }
}
