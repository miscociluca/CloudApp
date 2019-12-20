using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(NetromApp.Startup))]
namespace NetromApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
