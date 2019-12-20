using AutoMapper;
using NetromApp.Business.Data.Interfaces;
using System.Collections.Generic;
using NetromApp.Models;

namespace NetromApp
{
    public static class MappingProfile
    {
        public static void Config()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMissingTypeMaps = true;
                // create map
                cfg.CreateMap<PostModel, IPost>();
                cfg.CreateMap<IPost, PostModel>();
                cfg.CreateMap<JokesViewModel, IJoke>();
                cfg.CreateMap<IJoke, JokesViewModel>();

            });
            Mapper.AssertConfigurationIsValid();
        }
    }
}