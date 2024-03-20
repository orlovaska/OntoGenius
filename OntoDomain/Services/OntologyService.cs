using OntoDAL.Repositories;
using OntoDAL.Repositories.PostgreRepos;
using OntoDAL.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OntoDAL.Models;

namespace OntoDomain.Services
{
    public class OntologyService
    {
        public IDbRepository<OntologyModel> ontologyRepository;
        public IDbRepository<OntologyClassModel> classRepository;

        public OntologyService() {
            ontologyRepository = new OntologyRepository(new DataContext());
            classRepository = new OntologyClassRepository(new DataContext());

            Console.WriteLine(new DataContext().Ontologies);
        }


        public IQueryable<OntologyModel> GetOntologiesByUserId(int userId)
        {
            Console.WriteLine(ontologyRepository.Get(a => a.OwnerUserId == userId));
            return ontologyRepository.Get(a => a.OwnerUserId == userId);
        }


        public IQueryable<OntologyClassModel> GetClassesByOntologyId(int ontologyId)
        {
            return classRepository.Get(a => a.OntologyId == ontologyId);
        }
    }
}
