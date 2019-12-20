using NetromApp.Business.Data.Interfaces;
using NetromApp.Business.Entities.Foundation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NetromApp.Business.Entities
{
    public class LikeBm : BaseTrackedEntity, ILike
    {
        public int Id_Postare { get ; set; }
        public string Id_User { get; set ; }
        public DateTime? LastUpdated { get ; set ; }
        public UsersBm User { get; set; }
        public PostariBm Postari { get; set; }
    }
}