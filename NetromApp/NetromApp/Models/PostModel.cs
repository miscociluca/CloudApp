using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NetromApp.Models
{
    public class PostModel
    {
        public int Id { get; set; }
        public byte[] Imagine { get; set; }
        public bool HasLike { get; set; }
        public HttpPostedFileBase Image { get; set; }
        public string IdUser { get; set; }
        public string Titlu { get; set; }
        public DateTime? LastUpdated { get; set; }
        public  UsersModel User { get; set; }
        public ICollection<CommentsModel> Comments { get; set; }
        public ICollection<LikeModel> Likes { get; set; }
    }
}