using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols;
using PostsWebApi.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PostsWebApi.Services
{
    public class ImagesService : IImagesService
    {
        public static List<string> keys;
        private Dictionary<string, byte[]> images;
        private readonly IAmazonS3 _client;
        private AppSettings AppSettings { get; set; }

        public ImagesService(IAmazonS3 client, IOptions<AppSettings> settings)
        {
            AppSettings = settings.Value;
            _client = new AmazonS3Client(AppSettings.AccessKeyId, AppSettings.SecretAccessKeyId, Amazon.RegionEndpoint.EUCentral1); ;
        }

        public void AddItem(ImageModel largeImageModel, ImageModel smallImageModel)
        {
            Stream stream1 = new MemoryStream(largeImageModel.Content);
            Stream stream2 = new MemoryStream(smallImageModel.Content);
            try
            {
                var fileTransferUtility = new TransferUtility(AppSettings.AccessKeyId, AppSettings.SecretAccessKeyId, Amazon.RegionEndpoint.EUCentral1);
                fileTransferUtility.Upload(stream2, AppSettings.SmallImageBucket, smallImageModel.Title);//upload thumbnail
                fileTransferUtility.Upload(stream1, AppSettings.LargeImageBucket, largeImageModel.Title);//upload large image
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public Dictionary<string, byte[]> GetItems()
        {
            images = new Dictionary<string, byte[]>();
            GetImages();
            if (images.Count > 0)
            {
                return images;
            }
            return null;
        }
        public Dictionary<string, byte[]> GetItem(string pictureKey)
        {
            images = new Dictionary<string, byte[]>();
            GetImage(pictureKey);
            if (images.Count > 0)
            {
                return images;
            }
            return null;
        }
        public bool RemoveItem(string pictureKey)
        {
            try
            {
                DeleteObjectNonVersionedBucketAsync(pictureKey).Wait();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public void GetImages()
        {
            keys = new List<string>();
            ListingObjectsAsync().Wait();
            if (keys.Count > 0)
            {
                try
                {
                    foreach (string item in keys)
                    {
                        var request = new GetObjectRequest
                        {
                            BucketName = AppSettings.SmallImageBucket,
                            Key = item
                        };
                        GetResponseFromAWSAsync(request, item).Wait();
                    }
                }
                catch (Exception ex)
                {

                }
            }

        }

        private void GetImage(string pictureKey)
        {
            try
            {
                var request = new GetObjectRequest
                {
                    BucketName = AppSettings.LargeImageBucket,
                    Key = pictureKey
                };
                GetResponseFromAWSAsync(request, pictureKey).Wait();
            }
            catch (Exception)
            {
                throw;
            }
        }
        private  async Task DeleteObjectNonVersionedBucketAsync(string keyName)
        {
            try
            {
                var deleteLargeImage = new DeleteObjectRequest
                {
                    BucketName = AppSettings.LargeImageBucket,
                    Key = keyName
                };
                var deleteSmallImage = new DeleteObjectRequest
                {
                    BucketName = AppSettings.SmallImageBucket,
                    Key = keyName
                };
                await _client.DeleteObjectAsync(deleteSmallImage);
                await _client.DeleteObjectAsync(deleteLargeImage);
            }
            catch (AmazonS3Exception e)
            {
                throw e;
            }
        }
        private async Task ListingObjectsAsync()
        {
            try
            {
                ListObjectsV2Request request = new ListObjectsV2Request
                {
                    BucketName = AppSettings.LargeImageBucket,
                    MaxKeys = 250
                };
                ListObjectsV2Response response;
                do
                {
                    response = await _client.ListObjectsV2Async(request);

                    // Process the response.
                    keys.Clear();
                    var obj = response.S3Objects.OrderByDescending(x => x.LastModified);
                    foreach (S3Object entry in obj)
                    {
                        keys.Add(entry.Key);
                    }
                    request.ContinuationToken = response.NextContinuationToken;
                } while (response.IsTruncated);
            }
            catch (AmazonS3Exception amazonS3Exception)
            {

            }
        }

        public async Task GetResponseFromAWSAsync(GetObjectRequest request,string item)
        {
            byte[] responseBody;
            using (var response = await _client.GetObjectAsync(request))
            using (var responseStream = response.ResponseStream)
            using (MemoryStream ms = new MemoryStream())
            {
                responseStream.CopyTo(ms);
                responseBody = ms.ToArray();
                images.Add(item, responseBody);
            }
        }

    }
}
