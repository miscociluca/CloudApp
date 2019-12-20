using NetromApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace NetromApp.Common.Helpers
{
    public static class HttpPostOperation
    {
        private static readonly string url = System.Configuration.ConfigurationManager.AppSettings["HttpPostOperation"];
        public static async Task<HttpResponseMessage> Post(List<ImageModel> sampleData)
        {
            string uri =url;
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(uri);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.Timeout = TimeSpan.FromMinutes(10);
            HttpContent content = new StringContent(JsonConvert.SerializeObject(sampleData), Encoding.UTF8, "application/json");
            HttpResponseMessage message = await client.PostAsync(uri, content);
            return message;
        }
    }
}