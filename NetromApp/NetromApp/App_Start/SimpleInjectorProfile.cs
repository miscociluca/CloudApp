using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using NetromApp.Business.Services.System;
using NetromApp.Business.Services.System.Interfaces;
using NetromApp.Infrastructure;
using NetromApp.Models;
using SimpleInjector;
using SimpleInjector.Advanced;
using SimpleInjector.Diagnostics;
using SimpleInjector.Integration.Web;
using SimpleInjector.Integration.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace NetromApp.App_Start
{
    public class SimpleInjectorProfile
    {
        private static Container _container = new Container();

        public static void Init()
        {
            // Create the container as usual.
            _container.Options.DefaultScopedLifestyle = new WebRequestLifestyle();

            // Register your types, for instance:
            RegisterDependency();

           
            // This is an extension method from the integration package.
            _container.RegisterMvcControllers(Assembly.GetExecutingAssembly());

            _container.Verify();

            DependencyResolver.SetResolver(new SimpleInjectorDependencyResolver(_container));
        }

        private static void RegisterDependency()
        {

            #region Services
            _container.Register<IPostService>(() => new PostService(NetromContext.Create()), Lifestyle.Scoped);
            _container.Register<IJokeService>(() => new JokeService(NetromContext.Create()), Lifestyle.Scoped);
            _container.Register<IUserStore<ApplicationUser>>(() => new UserStore<ApplicationUser>(),  Lifestyle.Scoped);
            _container.Register<IImageService>(() => new ImageService(), Lifestyle.Singleton);

            #endregion

            #region model
            #endregion

            #region business model
            #endregion

            #region view model
            #endregion

        }
    }
}