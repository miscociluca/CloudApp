using NetromApp.Infrastructure.Repositories;
using NetromApp.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace NetromApp.Infrastructure.UnitOfWork
{
    public class UnitOfWork:IUnitOfWork
    {
        #region private properties
        private readonly DbContext _context;
        #endregion

        #region members
        private IPostsRepository _posts;
        public IPostsRepository Posts
        {
            get
            {
                if (_posts == null)
                {
                    _posts = new PostsRepository(_context);
                }
                return _posts;
            }
        }
        private ILikesRepository _likes;
        public ILikesRepository Likes
        {
            get
            {
                if (_likes == null)
                {
                    _likes = new LikesRepository(_context);
                }
                return _likes;
            }
        }
        private ICommentRepository _comms;
        public ICommentRepository Comments
        {
            get
            {
                if (_comms == null)
                {
                    _comms = new CommentRepository(_context);
                }
                return _comms;
            }
        }
        private IJokeRepository _jokes;
        public IJokeRepository Jokes
        {
            get
            {
                if (_jokes == null)
                {
                    _jokes = new JokeRepository(_context);
                }
                return _jokes;
            }
        }

        #endregion

        #region Ctor's
        public UnitOfWork(DbContext context)
        {
            _context = context;
        }
        #endregion

        #region public methods
        public void BeginTransaction()
        {
            _context.Database.BeginTransaction();
        }

        public int Commit()
        {
            try
            {
                return _context.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    var msg = string.Format("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    //LogService.Log.Error(msg);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        var prop = string.Format("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                        //LogService.Log.Error(prop);
                    }
                }
                throw new Exception(e.GetBaseException().Message);
            }
            catch (DbUpdateException e)
            {
                //LogService.Log.Error(e.Message);
                Rollback();

                throw new Exception(e.GetBaseException().Message);
            }
        }

        public Task<int> CommitAsync()
        {
            return _context.SaveChangesAsync();
        }

        public void Rollback()
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    _context.SaveChanges();
                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();
                }
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }
        #endregion
    }
}