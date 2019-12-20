using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace NetromApp.Common.Helpers
{
    public class FileHelper
    {
       

            public static byte[] ImageStringToByteArray(Stream stream)
            {
                using (MemoryStream target = new MemoryStream())
                {
                    Image sourceimage = Image.FromStream(stream);
                    using (var newImage = ImageHelper.ScaleImage(sourceimage, 700, 700))
                    {
                        newImage.Save(target, sourceimage.RawFormat);
                    }
                    return target.ToArray();
                }
            }

            public static byte[] StreamToByteArray(Stream stream)
            {
                using (stream)
                {
                    using (MemoryStream memStream = new MemoryStream())
                    {
                        stream.CopyTo(memStream);
                        return memStream.ToArray();
                    }
                }
            }

            public static byte[] FileToByteArray(HttpPostedFileBase file)
            {
                byte[] fileBytes = null;
                if (file != null)
                {
                    using (var binaryReader = new BinaryReader(file.InputStream))
                    {
                        fileBytes = binaryReader.ReadBytes(file.ContentLength);
                    }
                }

                return fileBytes;
            }
        }
}