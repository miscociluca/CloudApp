using NetromApp.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetromApp.Business.Data.Interfaces
{
    public interface IComment
    {
        int Id { get; set; }
        int Id_Postare { get; set; }
        string Id_User { get; set; }
        string Comentariu { get; set; }
        UsersBm User { get; set; }
        PostariBm Postari { get; set; }
    }
}
