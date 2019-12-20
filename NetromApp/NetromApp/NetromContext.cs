using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace NetromApp
{
    public class NetromContext : DbContext
    {
        public NetromContext()
               : base("name=PostEntities")
        {

        }

        public static NetromContext Create()
        {
            return new NetromContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }
    }

}