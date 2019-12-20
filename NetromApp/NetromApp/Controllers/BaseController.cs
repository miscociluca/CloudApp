using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using NetromApp.Business.Services.System.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NetromApp.Controllers
{
    public class BaseController : Controller
    {
            #region public property
            public string CurrentUserRole
            {
                get
                {
                    return System.Web.Security.Roles.GetRolesForUser().Single();
                }
            }
            protected string GetCurrentUserId
            {
                get
                {
                    return User.Identity.GetUserId();
                }
            }

            #endregion

            #region Protected Members
            protected IPostService _postService;
            protected IJokeService _jokeService;


            protected ApplicationUserManager _userManager;
            protected ApplicationSignInManager _signInManager;
            #endregion

            #region C'tor
            public BaseController()
            {
            }

            #endregion

            #region Override Methods
            //protected override IAsyncResult BeginExecuteCore(AsyncCallback callback, object state)
            //{
            //    SetCurrentCultureOnCurrentThread();

            //    return base.BeginExecuteCore(callback, state);
            //}

            //protected override void OnActionExecuting(ActionExecutingContext filterContext)
            //{

            //    var currentUser = UserManager.FindById(GetCurrentUserId);
            //    if (currentUser != null)
            //    {
            //        AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            //        filterContext.Result = new RedirectResult(Url.Action("Login", "Account"));
            //    }

            //}
            #endregion

            #region Public Methods

            public ApplicationUserManager UserManager
            {
                get
                {
                    return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
                }
                private set
                {
                    _userManager = value;
                }
            }
            public ApplicationSignInManager SignInManager
            {
                get
                {
                    return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
                }
                private set
                {
                    _signInManager = value;
                }
            }
            #endregion

            #region Private Methods

            #endregion

            #region Protected Methods
            protected IAuthenticationManager AuthenticationManager
            {
                get
                {
                    return HttpContext.GetOwinContext().Authentication;
                }
            }
            #endregion
        
    }
}