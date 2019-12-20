using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;

namespace NetromApp.Common.Helpers
{
    public class ImageHelper
    {
            public static Image ScaleImage(Image image, int maxWidth, int maxHeight)
            {
                var ratioX = (double)maxWidth / image.Width;
                var ratioY = (double)maxHeight / image.Height;
                var ratio = Math.Min(ratioX, ratioY);

                var newWidth = (int)(image.Width * ratio);
                var newHeight = (int)(image.Height * ratio);

                var newImage = new Bitmap(newWidth, newHeight);

                using (var graphics = Graphics.FromImage(newImage))
                    graphics.DrawImage(image, 0, 0, newWidth, newHeight);

                return newImage;
            }

            public static byte[] GetBytesFromImage(string imageFile)
            {
                MemoryStream ms = new MemoryStream();
                Image img = Image.FromFile(imageFile);
                img.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);

                return ms.ToArray();
            }

            public static byte[] GetByteArray(Image image)
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    image.Save(ms, ImageFormat.Png);
                    return ms.ToArray();
                }
            }

            public static Image ByteArrayToImage(byte[] byteArray)
            {
                MemoryStream ms = new MemoryStream(byteArray);
                Image returnImage = Image.FromStream(ms);
                return returnImage;
            }

            public static string GetBase64FromImage(String imageFile)
            {
                using (Image image = Image.FromFile(imageFile))
                {
                    using (MemoryStream m = new MemoryStream())
                    {
                        image.Save(m, image.RawFormat);
                        byte[] imageBytes = m.ToArray();

                        // Convert byte[] to Base64 String
                        string base64String = Convert.ToBase64String(imageBytes);
                        return base64String;
                    }
                }
            }

            public static Image DrawText(string text, Font font, Color textColor, Color backColor)
            {
                //first, create a dummy bitmap just to get a graphics object
                Image img = new Bitmap(1, 1);
                Graphics drawing = Graphics.FromImage(img);
                int width = 150;
                int height = 150;

                //measure the string to see how big the image needs to be
                SizeF textSize = drawing.MeasureString(text, font);
                float widthF = textSize.Width;
                float heightF = textSize.Height;

                //free up the dummy image and old graphics object
                img.Dispose();
                drawing.Dispose();

                //create a new image of the right size
                img = new Bitmap(width, height);

                drawing = Graphics.FromImage(img);

                //paint the background
                drawing.Clear(backColor);

                //create a brush for the text
                Brush textBrush = new SolidBrush(textColor);

                drawing.DrawString(text, font, textBrush, (width - widthF) / 2, (height - heightF) / 2);
                drawing.Save();

                textBrush.Dispose();
                drawing.Dispose();

                return img;
            }
        }
    }
