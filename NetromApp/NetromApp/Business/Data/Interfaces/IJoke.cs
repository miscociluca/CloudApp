using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetromApp.Business.Data.Interfaces
{
    public interface IJoke
    {
        int Id { get; set; }
        string Titlu { get; set; }
        string Gluma { get; set; }
        int? Voturi { get; set; }
        DateTime? LastUpdated { get; set; }
        string IdUser { get; set; }
    }
}
