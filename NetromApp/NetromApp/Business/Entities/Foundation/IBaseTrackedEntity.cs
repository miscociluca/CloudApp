using NetromApp.Business.Data.Interfaces;
using NetromApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetromApp.Business.Entities.Foundation
{
    public interface IBaseTrackedEntity :IBaseEntity
    {
        DateTime? CreatedDate { get; set; }
        DateTime? LastUpdatedDate { get; set; }
        ApplicationUser CreatedByUser { get; set; }
        ApplicationUser LastUpdatedByUser { get; set; }

        void CopyFrom(IBaseTrackedEntity entity);
    }
}
