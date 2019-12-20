using Microsoft.AspNet.Identity;
using NetromApp.Business.Data.Interfaces;
using NetromApp.Business.Factories;
using NetromApp.Business.Services.System.Interfaces;
using NetromApp.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace NetromApp.Business.Services.System
{
    public class JokeService : BaseDataService<IJoke>, IJokeService
    {
        private readonly JokeFactory _jokeFactory;
        private readonly IJokeRepository _jokeRepository;

        public JokeService(DbContext context) : base(context)
        {
            _jokeFactory = new JokeFactory();
            _jokeRepository = unitOfWork.Jokes;
        }
        public override IJoke Add(IJoke entity)
        {
            string CurrentUser = HttpContext.Current.User.Identity.GetUserId();
            try
            {
                entity.LastUpdated = DateTime.Now;
                entity.IdUser = CurrentUser;
                var entityData = _jokeFactory.CopyTo(entity);
                _jokeRepository.AddOrUpdate(entityData);
                Commit();
                return _jokeFactory.CopyFrom(entityData);
            }
            catch (Exception ex)
            {
                //LogService.Log.Error(ex);
            }
            return null;
        }

        public override bool Delete(IJoke entity)
        {
            try
            {
                _jokeRepository.Remove(_jokeFactory.CopyTo(entity));
                Commit();
                return true;
            }
            catch (Exception ex)
            {
                //LogService.Log.Error(ex);
            }
            return false;
        }

        public override IEnumerable<IJoke> GetAll()
        {
            try
            {
                var post = _jokeRepository.GetAll()
                   .Select(x => _jokeFactory.CopyFrom(x))
                   .ToList();

                return post;
            }
            catch (Exception ex)
            {
                //LogService.Log.Error(ex);
            }
            return null;
        }

        public override IJoke GetById(int id)
        {
            try
            {
                return _jokeFactory.CopyFrom(_jokeRepository.Get(id));
            }
            catch (Exception ex)
            {
                //LogService.Log.Error(ex);
            }
            return null;
        }

        public override IEnumerable<IJoke> GetById(List<string> id)
        {
            throw new NotImplementedException();
        }

        public override IJoke Update(IJoke entity)
        {
            string CurrentUser = HttpContext.Current.User.Identity.GetUserId();
            try
            {
                entity.IdUser = CurrentUser;
                entity.LastUpdated = DateTime.Now;
                _jokeRepository.AddOrUpdate(_jokeFactory.CopyTo(entity));
                Commit();
                return entity;
            }
            catch (Exception ex)
            {

            }
            return null;
        }
    }
}