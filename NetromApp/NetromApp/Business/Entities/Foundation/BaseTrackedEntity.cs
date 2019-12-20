using NetromApp.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace NetromApp.Business.Entities.Foundation
{
    public abstract class BaseTrackedEntity : BaseEntity, IBaseTrackedEntity
    {
        #region C'tor

        protected BaseTrackedEntity(int id, ApplicationUser createdUser, ApplicationUser updatedUser, DateTime? createDateTime,
            DateTime? updateDateTime)
            : base(id)
        {
            CreatedByUser = createdUser;
            LastUpdatedByUser = updatedUser;
            CreatedDate = createDateTime;
            LastUpdatedDate = updateDateTime;
        }

        //added so we can have a default constructor on hierarchy
        protected BaseTrackedEntity()
        {
        }

        #endregion

        #region Public Members


        public DateTime? CreatedDate { get; set; }
        public DateTime? LastUpdatedDate { get; set; }

        #endregion

        public ApplicationUser CreatedByUser { get; set; }
        public ApplicationUser LastUpdatedByUser { get; set; }

        public virtual void CopyFrom(IBaseTrackedEntity entity)
        {
            Debug.Assert(entity != null);
            Id = entity.Id;
            CreatedDate = entity.CreatedDate;
            LastUpdatedDate = entity.LastUpdatedDate;
            CreatedByUser = entity.CreatedByUser;
            LastUpdatedByUser = entity.LastUpdatedByUser;
        }
    }
}