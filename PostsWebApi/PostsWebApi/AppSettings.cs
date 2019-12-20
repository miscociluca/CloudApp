using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostsWebApi
{
    public class AppSettings
    {
        public string AccessKeyId { get; set; }
        public string SecretAccessKeyId { get; set; }
        public string LargeImageBucket { get; set; }
        public string SmallImageBucket { get; set; }
    }
}
