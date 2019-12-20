using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;

namespace NetromApp.Common.Helpers
{
    public static class HttpGetOperation
    {
        private static readonly string url1 = System.Configuration.ConfigurationManager.AppSettings["HttpGetOperation"];
        private static readonly string url2 = System.Configuration.ConfigurationManager.AppSettings["HttpGetAllOperation"];
        public static async Task<HttpResponseMessage> Get(string path)
        {
            string uri = url1 + path + ".jpg ";
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(uri);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.Timeout = TimeSpan.FromMinutes(10);
            HttpResponseMessage message = await client.GetAsync(uri);
            return message;
        }
        public static async Task<HttpResponseMessage> GetAll()
        {
            string uri = url2;
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(uri);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.Timeout = TimeSpan.FromMinutes(10);
            HttpResponseMessage message = await client.GetAsync(uri);
            return message;
        }
    }
}