using PostsWebApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PostsWebApi.Services
{
    public interface IImagesService
    {
        Dictionary<string, byte[]> GetItems();
        Dictionary<string, byte[]> GetItem(string pictureKey);
        void AddItem(ImageModel largeModel, ImageModel smallModel);
        bool RemoveItem(string pictureKey);
    }
}