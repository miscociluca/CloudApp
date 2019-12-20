using NetromApp.Business.Data.Interfaces;
using NetromApp.Business.Entities.Foundation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NetromApp.Business.Entities
{
    public class PostariBm : BaseTrackedEntity, IPost
    {
        public byte[] Imagine { get; set; }
        public HttpPostedFileBase Image { get; set; }
        public bool HasLike { get; set; }
        public string IdUser { get; set; }
        public string Titlu { get; set; }
        public DateTime? LastUpdated { get; set; }
        public   UsersBm User { get; set; }
        public  ICollection<IComment> Comments { get ; set; }
        public  ICollection<ILike> Likes { get; set; }
    }
}