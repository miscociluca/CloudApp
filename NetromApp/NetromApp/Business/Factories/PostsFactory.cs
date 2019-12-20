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
    public class PostsFactory : IDataFactory<Postari, IPost>
    {
        private readonly CommentFactory _commentsFactory;
        private readonly LikeFactory _likeFactory;

        public PostsFactory()
        {
            _likeFactory = new LikeFactory();
            _commentsFactory = new CommentFactory();
        }
        public IPost CopyFromWithoutImage(Postari daObject)
        {
            return daObject != null
               ? new PostariBm
               {
                   Id = daObject.Id,
                   Titlu = daObject.Titlu,
                   CreatedDate = daObject.LastUpdated,
                   HasLike = daObject.Likes != null && daObject.Likes.Count > 0 ? true : false,
                   Comments = daObject.Comments != null ? daObject.Comments.Select(x => _commentsFactory.CopyFrom(x)).ToList() : null,
                   Likes = daObject.Likes != null ? daObject.Likes.Select(x => _likeFactory.CopyFrom(x)).ToList() : null,
                   IdUser = daObject.IdUser
               } : null;
        }
        public IPost CopyFrom(Postari daObject)
        {
            return daObject != null
               ? new PostariBm
               {
                   Id = daObject.Id,
                   Titlu = daObject.Titlu,
                   Imagine = daObject.Imagine,
                   CreatedDate = daObject.LastUpdated,
                   HasLike = daObject.Likes != null&&daObject.Likes.Count > 0 ? true : false,
                   Comments = daObject.Comments!=null? daObject.Comments.Select(x => _commentsFactory.CopyFrom(x)).ToList():null,
                   Likes = daObject.Likes!=null?daObject.Likes.Select(x => _likeFactory.CopyFrom(x)).ToList():null,
                   IdUser=daObject.IdUser
               } : null;
        }

        public Postari CopyTo(IPost entity)
        {
            return new Postari
            {
                Id = entity.Id,
                Titlu = entity.Titlu,
                Imagine = entity.Imagine,
                LastUpdated = entity.LastUpdated,
                IdUser = entity.IdUser
            };
        }

    }
}