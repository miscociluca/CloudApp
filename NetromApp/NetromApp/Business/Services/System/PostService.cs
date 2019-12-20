using Microsoft.AspNet.Identity;
using NetromApp.Business.Data.Interfaces;
using NetromApp.Business.Entities;
using NetromApp.Business.Factories;
using NetromApp.Business.Services.System.Interfaces;
using NetromApp.Common.Helpers;
using NetromApp.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace NetromApp.Business.Services.System
{
    public class PostService : BaseDataService<IPost>, IPostService
    {
        private readonly PostsFactory _postsFactory;
        private readonly IPostsRepository _postsRepository;
        
        private readonly LikeFactory _likeFactory;
        private readonly ILikesRepository _likeRepository;

        private readonly CommentFactory _commentFactory;
        private readonly ICommentRepository _commentRepository;

        public PostService(DbContext context) : base(context)
        {
            _postsFactory = new PostsFactory();
            _postsRepository = unitOfWork.Posts;
            _commentFactory = new CommentFactory();
            _likeFactory = new LikeFactory();
        }
        public override IPost Add(IPost entity)
        {
            string CurrentUser = HttpContext.Current.User.Identity.GetUserId();
            try
            {
                byte[] imageBytes = null;
                if (entity.Image != null)
                {
                    imageBytes = FileHelper.ImageStringToByteArray(entity.Image.InputStream);
                }
                entity.Imagine = imageBytes;
                entity.IdUser = CurrentUser;
                var entityData = _postsFactory.CopyTo(entity);
                _postsRepository.AddOrUpdate(entityData);
                Commit();
                return _postsFactory.CopyFrom(entityData);
            }
            catch (Exception ex)
            {
                //LogService.Log.Error(ex);
            }
            return null;
        }

        public override bool Delete(IPost entity)
        {
            try
            {
                _postsRepository.Remove(_postsFactory.CopyTo(entity));
                Commit();
                return true;
            }
            catch (Exception ex)
            {
                //LogService.Log.Error(ex);
            }
            return false;
        }

        public override IEnumerable<IPost> GetAll()
        {
            try
            {
                var post = _postsRepository.GetAll()
                   .Select(x => _postsFactory.CopyFromWithoutImage(x))
                   .ToList();

                return post;
            }
            catch (Exception ex)
            {
                //LogService.Log.Error(ex);
            }
            return null;
        }

        public override IPost GetById(int id)
        {
            try
            {
                return _postsFactory.CopyFrom(_postsRepository.Get(id));
            }
            catch (Exception ex)
            {
                //LogService.Log.Error(ex);
            }
            return null;
        }

        public override IEnumerable<IPost> GetById(List<string> id)
        {
            throw new NotImplementedException();
        }

        public override IPost Update(IPost entity)
        {
            string CurrentUser = HttpContext.Current.User.Identity.GetUserId();
            try
            {
                if (entity.Comments != null && entity.Comments.Count > 0)
                {
                        var item = entity.Comments.ToList()[0];
                        CommentsBm comment = new CommentsBm();
                        comment.Id = item.Id;
                        comment.Comentariu = item.Comentariu;
                        comment.CreatedDate = DateTime.Now;
                        comment.Id_Postare = item.Id_Postare;
                        comment.Id_User = CurrentUser;
                        unitOfWork.Comments.AddOrUpdate(_commentFactory.CopyTo(comment));
                        Commit();
                    
                }
                if (!entity.HasLike && entity.Likes.Count > 0)
                {
                         var item =entity.Likes.ToList()[0];
                        if (unitOfWork.Likes.Find(x => x.Id==item.Id).Any())
                        {
                            item.Id_User = CurrentUser;
                            unitOfWork.Likes.Remove(_likeFactory.CopyTo(item));
                            Commit();
                        }
                    
                }
                if (entity.HasLike&& entity.Likes.Count > 0)
                {
                        var item = entity.Likes.ToList()[0];
                        LikeBm like = new LikeBm();
                        like.Id = item.Id;
                        like.Id_Postare = item.Id_Postare;
                        like.CreatedDate = DateTime.Now;
                        like.Id_User = CurrentUser;
                        unitOfWork.Likes.AddOrUpdate(_likeFactory.CopyTo(like));
                        Commit();
                }
                byte[] imageBytes = null;
                if (entity.Image != null)
                {
                    imageBytes = FileHelper.ImageStringToByteArray(entity.Image.InputStream);
                    entity.Imagine = imageBytes;
                }
                else
                {
                    entity.Imagine = _postsRepository.Find(x => x.Id == entity.Id).FirstOrDefault().Imagine;
                }
                entity.IdUser = CurrentUser;
                _postsRepository.AddOrUpdate(_postsFactory.CopyTo(entity));
                Commit();
                return entity;
            }
            catch (Exception ex)
            {
               // LogService.Log.Error(ex);
            }
            return null;
        }
    }
}