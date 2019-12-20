using NetromApp.Business.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace NetromApp.Business.Data.Interfaces
{
    public interface IPost
    {
        int Id { get; set; }
        byte[] Imagine { get; set; }
        bool HasLike { get; set; }
        HttpPostedFileBase Image { get; set; }
        string IdUser { get; set; }
        string Titlu { get; set; }
        DateTime? LastUpdated { get; set; }
        UsersBm User { get; set; }
        ICollection<IComment> Comments { get; set; }
        ICollection<ILike> Likes { get; set; }
    }
}
