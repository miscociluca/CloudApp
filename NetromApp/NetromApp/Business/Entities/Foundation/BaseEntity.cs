using NetromApp.Business.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace NetromApp.Business.Entities.Foundation
{
    public abstract class BaseEntity
    {
        public int Id { get; set; }

        //todo: need clarification
        protected BaseEntity()
        {
        }

        protected BaseEntity(int id)
        {
            this.Id = id;
        }

        public virtual void CopyFrom(IBaseEntity entity)
        {
            Debug.Assert(entity != null);
            Id = entity.Id;
        }
    }
}