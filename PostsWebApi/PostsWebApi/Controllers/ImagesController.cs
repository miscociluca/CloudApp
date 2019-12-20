using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PostsWebApi.Models;
using PostsWebApi.Services;

namespace PostsWebApi.Controllers
{
    [Route("v1/Images")]
    public class ImagesController : Controller
    {
        private readonly IImagesService _imagesListService;

        public ImagesController(IImagesService imageListService)
        {
            _imagesListService = imageListService;
        }

        [HttpGet]
        [Route("GetImages")]
        public IActionResult GetImagesList()
        {
            var result = _imagesListService.GetItems();
            return Ok(result);
        }
        [HttpGet]
        [Route("GetImage/{pictureKey}")]
        public IActionResult GetImage(string pictureKey)
        {
            var result = _imagesListService.GetItem(pictureKey);
            return Ok(result);
        }
        [HttpPost]
        [Route("AddImage")]
        public IActionResult AddToImagesList([FromBody] List<ImageModel>Models)
        {
            _imagesListService.AddItem(Models[0], Models[1]);
            return Ok();
        }

        [HttpDelete]
        [Route("DeleteImage/{pictureKey}")]
        public IActionResult DeleteFromImagesList(string pictureKey)
        {
            bool result=_imagesListService.RemoveItem(pictureKey);
            if (result)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}