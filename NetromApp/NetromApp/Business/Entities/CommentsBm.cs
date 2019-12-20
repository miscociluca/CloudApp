using NetromApp.Business.Data.Interfaces;
using NetromApp.Business.Entities.Foundation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NetromApp.Business.Entities
{
    public class CommentsBm : BaseTrackedEntity, IComment
    {
        public int Id_Postare { get; set; }
        public string Id_User { get; set; }
        public string Comentariu { get; set; }
        public virtual UsersBm User { get; set; }
        public virtual PostariBm Postari { get; set; }
    }
}