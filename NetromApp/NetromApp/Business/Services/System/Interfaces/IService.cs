using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetromApp.Business.Services.System.Interfaces
{
    public interface IService<TEntity> : IDisposable
    {
        IEnumerable<TEntity> GetAll();

        TEntity GetById(int id);
        IEnumerable<TEntity> GetById(List<string> id);

        TEntity Add(TEntity entity);

        TEntity Update(TEntity entity);

        bool Delete(TEntity entity);
    }
}
