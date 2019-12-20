using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetromApp.Business.Factories.Foundation
{
    public interface IDataFactory<TDao, TEntity>
    {
        TEntity CopyFrom(TDao daObject);

        TDao CopyTo(TEntity entity);
    }
}
