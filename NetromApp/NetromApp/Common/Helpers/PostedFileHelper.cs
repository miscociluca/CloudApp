using NetromApp.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace NetromApp.Common.Helpers
{

    public static class PostedFileHelper
    {
        public static List<ImageModel> ProcessPostedFile(HttpPostedFileBase file)
        {
            List<ImageModel> result = new List<ImageModel>();
            try
            {
                if (file.ContentLength > 0)
                {
                    // Getting Filename
                    var fileName = file.FileName;
                    // Unique filename "Guid"
                    var myUniqueFileName = Convert.ToString(Guid.NewGuid());
                    // Getting Extension
                    var fileExtension = Path.GetExtension(fileName);
                    // Concating filename + fileExtension (unique filename)
                    var newFileName = string.Concat(myUniqueFileName, fileExtension);

                    MemoryStream target = new MemoryStream();
                    file.InputStream.CopyTo(target);
                    Image originalSize = Image.FromStream(target);
                    Image smallSize = PhotoHelper.ResizeImage(originalSize, 250, 250);//thumbnail
                    MemoryStream target2 = new MemoryStream();
                    using (target2)
                    {
                        smallSize.Save(target2, ImageFormat.Jpeg);
                    }
                    byte[] data1 = target.ToArray();
                    byte[] data2 = target2.ToArray();

                    result.Add(new ImageModel { Title = newFileName, Content = data1 });
                    result.Add(new ImageModel { Title = newFileName, Content = data2 });
                }
                return result;
            }
            catch (Exception)
            {
                return null;
            }

        }
    }
}