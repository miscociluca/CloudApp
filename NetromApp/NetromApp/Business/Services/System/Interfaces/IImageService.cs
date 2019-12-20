using NetromApp.Business.Data.Interfaces;
using NetromApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetromApp.Business.Services.System.Interfaces
{
    public interface IImageService
    {
        Task<List<ImageModel>> GetAllImages();
        Task<bool> PostImage(List<ImageModel> sampleData);
        Task<List<ImageModel>> GetImage(string id);
        Task<bool> DeleteImage(string id);
    }
}
