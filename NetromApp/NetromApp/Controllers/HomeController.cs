using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNetCore.Mvc;
using NetromApp.Business.Services.System.Interfaces;

namespace NetromApp.Controllers
{

    public class HomeController : Controller
    {
        private readonly IImageService _service;

        public HomeController(IImageService service)
        {
            _service = service;
        }
        [HttpGet]
        public async Task<ActionResult> GetImages()
        {
            ViewBag.Title = "Photo Album";
            var Images = await _service.GetAllImages();
            return View("Index", "_Layout", Images);
        }
        [HttpGet]
        [Route("GetImage/{id}")]
        public async Task<ActionResult> GetImage(string id)
        {
            var Image = await _service.GetImage(id);
            if (Image[0].Content != null && Image[0].Content.Length > 0)
            {
                var image = File(Image[0].Content, "image/jpg");
                return (image);
            }
            else
                return Json(new
                {
                    status = "Error",
                }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        [Route("DeleteImage/{id}")]
        public async Task<ActionResult> DeleteSingleTest(string id)
        {
           var success=await _service.DeleteImage(id);
            if (success)
            {
                return Json(new
                {
                    status = "OK",
                }, JsonRequestBehavior.AllowGet);
            }
            return Json(new
            {
                status = "Error",
            }, JsonRequestBehavior.AllowGet);
        }
    }
}