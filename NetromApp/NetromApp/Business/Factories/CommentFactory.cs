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
    public class CommentFactory : IDataFactory<Comment, IComment>
    {
        public CommentFactory()
        {

        }
        public IComment CopyFrom(Comment daObject)
        {
          
            return daObject != null
               ? new CommentsBm
               {
                   Id = daObject.Id,
                   Comentariu = daObject.Comentariu,
                   Id_Postare= daObject.Id_Postare,
                   Id_User = daObject.Id_User
               } : null;
        }

        public Comment CopyTo(IComment entity)
        {
            return new Comment
            {
                Id = entity.Id,
                Comentariu = entity.Comentariu,
                Id_Postare = entity.Id_Postare,
                Id_User = entity.Id_User
            };
        }
    }
}