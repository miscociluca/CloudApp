using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Net.Http;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using NetromApp.Models;
using System.Net;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using NetromApp.Business.Services.System.Interfaces;
using NetromApp.Common.Helpers;

namespace NetromApp.Controllers
{
    public class PhotoController : Controller
    {
        private readonly IImageService _service;

        public PhotoController(IImageService service)
        {
            _service = service;
        }
        public ActionResult Index()
        {
            return View();
        }
        public async Task<ActionResult> InsertFromFile(ImageFromFile model)
        {
            if (model.Image == null)
            {
                return RedirectToAction("GetImages", "Home");
            }
            HttpPostedFileBase file = model.Image;
            var image = PostedFileHelper.ProcessPostedFile(file);
            var response=await _service.PostImage(image);
            if (response)
            {
                return Json(new {  status = "OK",}, JsonRequestBehavior.AllowGet);
            }
            else
                return Json(new { status = "ERROR", }, JsonRequestBehavior.AllowGet);

        }
        public async Task<ActionResult> Capture()
        {
            var files = Request.Files;
            if (files == null || files[0].ContentLength == 0)
            {
                return RedirectToAction("GetImages", "Home");
            }
            else
            {
                HttpPostedFileBase file = files[0];
                var image = PostedFileHelper.ProcessPostedFile(file);
                var response = await _service.PostImage(image);
                if (response)
                {
                    return Json(new { status = "OK", }, JsonRequestBehavior.AllowGet);
                }
                else
                    return Json(new { status = "ERROR", }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
