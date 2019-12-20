using NetromApp.Business.Services.System.Interfaces;
using NetromApp.Models;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using NetromApp.Common.Helpers;

namespace NetromApp.Business.Services.System
{
    public class ImageService : IImageService
    {
        public ImageService()
        {

        }
        public async Task<List<ImageModel>> GetAllImages()
        {
            List<ImageModel> result = new List<ImageModel>();
            var message = await HttpGetOperation.GetAll();
            if (message.IsSuccessStatusCode)
            {
                string results = message.Content.ReadAsStringAsync().Result;
                var imgs = JsonConvert.DeserializeObject<Dictionary<string, byte[]>>(results);
                foreach (var item in imgs)
                {
                    ImageModel imageModel = new ImageModel();
                    imageModel.Content = item.Value;
                    imageModel.Title = item.Key.Substring(0, item.Key.IndexOf("."));
                    result.Add(imageModel);
                }
            }
            return result;
        }
        public async Task<bool> PostImage(List<ImageModel> sampleData)
        {
            var message = await HttpPostOperation.Post(sampleData);
            bool postedSuccessfully = false;
            if (message.IsSuccessStatusCode)
            {
                postedSuccessfully = true;
            }
            return postedSuccessfully;
        }
        public async Task<List<ImageModel>> GetImage(string id)
        {
            List<ImageModel> result = new List<ImageModel>();
            var message = await HttpGetOperation.Get(id);
            if (message.IsSuccessStatusCode)
            {
                string results = message.Content.ReadAsStringAsync().Result;
                var imgs = JsonConvert.DeserializeObject<Dictionary<string, byte[]>>(results);
                foreach (var item in imgs)
                {
                    ImageModel imageModel = new ImageModel();
                    imageModel.Content = item.Value;
                    imageModel.Title = item.Key.Substring(0, item.Key.IndexOf("."));
                    result.Add(imageModel);
                }
            }
            return result;
        }
        public async Task<bool> DeleteImage(string id)
        {
            var message = await HttpDeleteOperation.Delete(id);
            bool success = false;
            if (message.IsSuccessStatusCode)
            {
                success = true;
            }
            return success;
        }
    }
}