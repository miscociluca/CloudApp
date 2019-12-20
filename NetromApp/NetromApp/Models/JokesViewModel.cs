using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NetromApp.Models
{
    public class JokesViewModel
    {
        public int Id { get; set; }
        public string Titlu { get; set; }
        public string Gluma { get; set; }
        public int? Voturi { get; set; }
        public DateTime? LastUpdated { get; set; }
        public string IdUser { get; set; }
    }
}