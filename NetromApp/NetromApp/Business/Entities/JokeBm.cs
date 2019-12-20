using NetromApp.Business.Data.Interfaces;
using NetromApp.Business.Entities.Foundation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NetromApp.Business.Entities
{
    public class JokeBm : BaseTrackedEntity, IJoke
    {
        public string Titlu { get; set; }
        public string Gluma { get; set; }
        public int? Voturi { get; set; }
        public DateTime? LastUpdated { get; set; }
        public string IdUser { get; set; }
    }
}