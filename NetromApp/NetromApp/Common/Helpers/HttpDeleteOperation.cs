using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;

namespace NetromApp.Common.Helpers
{
    public static class HttpDeleteOperation
    {
        private static readonly string url= System.Configuration.ConfigurationManager.AppSettings["HttpDeleteOperation"];
        public static async Task<HttpResponseMessage> Delete(string id)
        {
            string uri = url + id + ".jpg ";
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(uri);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.Timeout = TimeSpan.FromMinutes(10);
            HttpResponseMessage message = await client.DeleteAsync(uri);
            return message;
        }
    }
}