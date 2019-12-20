using NetromApp.Business.Services.System.Interfaces;
using NetromApp.Infrastructure.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace NetromApp.Business.Services
{
    public abstract class BaseDataService<TEntity> : IService<TEntity>
      where TEntity : class
    {
        #region private properties
        private DbContext _context;
        #endregion

        #region protected property
        protected IUnitOfWork unitOfWork;
        #endregion

        #region Ctor's
        public BaseDataService(DbContext context)
        {
            _context = context;
            unitOfWork = new UnitOfWork(context);
        }
        #endregion

        #region public method
        public abstract IEnumerable<TEntity> GetAll();

        public abstract TEntity GetById(int id);
        public abstract IEnumerable<TEntity> GetById(List<string> id);

        public abstract TEntity Add(TEntity entity);

        public abstract TEntity Update(TEntity entity);

        public abstract bool Delete(TEntity entity);

        public int Commit()
        {
            return unitOfWork.Commit();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
        #endregion
    }
}