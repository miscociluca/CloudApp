using NetromApp.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace NetromApp.Infrastructure.Repositories
{
    public class JokeRepository : BaseRepository<Joke>, IJokeRepository
    {
        public JokeRepository(DbContext context) : base(context)
        {
        }
    }
}