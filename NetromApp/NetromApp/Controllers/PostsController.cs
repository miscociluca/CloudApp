using AutoMapper;
using NetromApp.Business.Data.Interfaces;
using NetromApp.Business.Services.System.Interfaces;
using NetromApp.Models;
using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace NetromApp.Controllers
{
    [Authorize]
    [OutputCache(Duration = 3600, VaryByParam = "none", Location = OutputCacheLocation.Client, NoStore = true)]
    public class PostsController : BaseController
    {
        #region C'tor
        public PostsController(IPostService postService)
        {
            _postService = postService;
        }
        #endregion

        #region Actions
       
        public ActionResult Index()
        {
            return View("~/Views/Posts/PostsView.cshtml");
        }
        [HttpGet]
        [Route("GetImage/{id}")]
        public ActionResult GetImage(int id)
        {
            byte[] Imagine = _postService.GetById(id).Imagine;
            if (Imagine != null && Imagine.Length>0)
            {
                var image = File(Imagine, "image/png");
                return image;
            }
            return Json(new
            {
                status = "NO_IMAGE",
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        [Route("GetNoImage/{imageSizeName}")]
        public ActionResult GetNoImageSmall(string imageSizeName)
        {
          
             var image = new System.Drawing.Bitmap("~/img/no_image.png");

            if (image != null)
            {
                using (var stream = new MemoryStream())
                {
                    image.Save(stream, ImageFormat.Png);
                    var file = File(stream.ToArray(), "image/png");
                    return file;
                }
            }

            return Json(new
            {
                status = "NO_IMAGE",
            }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        [Route("GetAllPosts")]
        public JsonResult GetAllPosts()
        {
            return Json(new
            {
                status = "OK",
                data = _postService.GetAll()
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("AddPost")]
        public ActionResult AddPost(PostModel postViewModel)
        {

            IPost postAddedModel = _postService.Add(Mapper.Map<IPost>(postViewModel));

            if (postAddedModel != null)
            {
                return Json(new
                {
                    status = "OK",
                    data = Mapper.Map<PostModel>(postAddedModel)
                }, JsonRequestBehavior.AllowGet);
            }

            return Json(new
            {
                status = "ERROR",
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("UpdatePost")]
        public ActionResult UpdatePost(PostModel postViewModel)
        {
            IPost postUpdated = _postService.Update(Mapper.Map<IPost>(postViewModel));

            if (postUpdated != null)
            {
                return Json(new
                {
                    status = "OK",
                    data = Mapper.Map<PostModel>(postUpdated)
                }, JsonRequestBehavior.AllowGet);
            }

            return Json(new
            {
                status = "ERROR",
            }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        [Route("DeletePost")]
        public ActionResult DeletePost(PostModel postViewModel)
        {
            bool wasDeleted = _postService.Delete(Mapper.Map<IPost>(postViewModel));

            if (wasDeleted)
            {
                return Json(new
                {
                    status = "OK"
                }, JsonRequestBehavior.AllowGet);
            }

            return Json(new
            {
                status = "ERROR",
            }, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}
