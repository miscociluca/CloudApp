using NetromApp.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetromApp.Infrastructure.UnitOfWork
{
    public interface IUnitOfWork:IDisposable
    {
        #region repositories
        IPostsRepository Posts { get; }
        IJokeRepository Jokes { get; }
        ILikesRepository Likes { get; }
        ICommentRepository Comments { get; }

        #endregion

        void BeginTransaction();

        int Commit();

        Task<int> CommitAsync();

        void Rollback();
    }
}
