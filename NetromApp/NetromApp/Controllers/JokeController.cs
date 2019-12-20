using AutoMapper;
using NetromApp.Business.Data.Interfaces;
using NetromApp.Business.Services.System.Interfaces;
using NetromApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace NetromApp.Controllers
{
    [Authorize]
    [OutputCache(Duration = 3600, VaryByParam = "none", Location = OutputCacheLocation.Client, NoStore = true)]
    public class JokeController : BaseController
    {
        #region C'tor
        public JokeController(IJokeService jokeService)
        {
            _jokeService = jokeService;
        }
        #endregion

        #region Actions

        public ActionResult Index()
        {
            return View("~/Views/Jokes/Joke.cshtml");
        }
        [HttpGet]
        [Route("GetJoke/{id}")]
        public ActionResult GetJoke(int id)
        {
            var Joke = _jokeService.GetById(id);
            return Json(new
            {
                status = "OK",
                data = Joke
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        [Route("GetAllJokes")]
        public JsonResult GetAllJokes()
        {
            return Json(new
            {
                status = "OK",
                data = _jokeService.GetAll()
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("AddJoke")]
        public ActionResult AddJoke(JokesViewModel jokeViewModel)
        {

            IJoke jokeAddedModel = _jokeService.Add(Mapper.Map<IJoke>(jokeViewModel));

            if (jokeAddedModel != null)
            {
                return Json(new
                {
                    status = "OK",
                    data = Mapper.Map<JokesViewModel>(jokeAddedModel)
                }, JsonRequestBehavior.AllowGet);
            }

            return Json(new
            {
                status = "ERROR",
            }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [Route("UpdateJoke")]
        public ActionResult UpdateJoke(JokesViewModel jokeViewModel)
        {
            IJoke jokeUpdated = _jokeService.Update(Mapper.Map<IJoke>(jokeViewModel));

            if (jokeUpdated != null)
            {
                return Json(new
                {
                    status = "OK",
                    data = Mapper.Map<JokesViewModel>(jokeUpdated)
                }, JsonRequestBehavior.AllowGet);
            }

            return Json(new
            {
                status = "ERROR",
            }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        [Route("DeleteJoke")]
        public ActionResult DeleteJoke(JokesViewModel jokeViewModel)
        {
            bool wasDeleted = _jokeService.Delete(Mapper.Map<IJoke>(jokeViewModel));

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
