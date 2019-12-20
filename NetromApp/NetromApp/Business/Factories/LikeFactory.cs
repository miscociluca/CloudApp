using AutoMapper;
using NetromApp.Business.Data.Interfaces;
using NetromApp.Business.Entities;
using NetromApp.Business.Factories.Foundation;
using NetromApp.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NetromApp.Business.Factories
{
    public class LikeFactory : IDataFactory<Like, ILike>
    {
        public LikeFactory()
        {
        }
        public ILike CopyFrom(Like daObject)
        {
            return daObject != null
               ? new LikeBm
               {
                   Id = daObject.Id,
                   Id_Postare = daObject.Id_Postare,
                   Id_User = daObject.Id_User,
                   LastUpdated=daObject.LastUpdated
               } : null;
        }

        public Like CopyTo(ILike entity)
        {
            return new Like
            {
                Id = entity.Id,
                LastUpdated = entity.LastUpdated,
                Id_Postare = entity.Id_Postare,
                Id_User = entity.Id_User
            };
        }
    }
}