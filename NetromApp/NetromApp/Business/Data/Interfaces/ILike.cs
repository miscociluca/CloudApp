using NetromApp.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetromApp.Business.Data.Interfaces
{
    public interface ILike:IBaseEntity
    {
        int Id_Postare { get; set; }
        string Id_User { get; set; }
        DateTime? LastUpdated { get; set; }

        UsersBm User { get; set; }
        PostariBm Postari { get; set; }
    }
}
