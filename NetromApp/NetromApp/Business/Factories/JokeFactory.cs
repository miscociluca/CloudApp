using NetromApp.Business.Data.Interfaces;
using NetromApp.Business.Entities;
using NetromApp.Business.Factories.Foundation;
using NetromApp.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NetromApp.Business.Factories
{
    public class JokeFactory : IDataFactory<Joke, IJoke>
    {
        public JokeFactory()
        {
        }
        public IJoke CopyFrom(Joke daObject)
        {
            return daObject != null
            ? new JokeBm
            {
                Id = daObject.Id,
                Gluma = daObject.Gluma,
                Titlu = daObject.Titlu,
                LastUpdated = daObject.LastUpdated,
                IdUser=daObject.IdUser,
                Voturi=daObject.Voturi
            } : null;
        }

        public Joke CopyTo(IJoke entity)
        {
            return new Joke
            {
                Id = entity.Id,
                Gluma = entity.Gluma,
                Titlu = entity.Titlu,
                LastUpdated = entity.LastUpdated,
                IdUser = entity.IdUser,
                Voturi = entity.Voturi
            };
        }
    }
}