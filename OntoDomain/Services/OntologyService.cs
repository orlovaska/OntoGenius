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
        public IDbRepository<OntologyClassInstanceModel> instanceRepository;
        public IDbRepository<OntologyPropertyModel> propertyRepository;
        public IDbRepository<OntologyClassModel> classRepository;


        public OntologyService() {
            ontologyRepository = new OntologyRepository(new DataContext());
            classRepository = new OntologyClassRepository(new DataContext());
            propertyRepository = new OntologyPropertyRepository(new DataContext());
            instanceRepository = new OntologyClassInstanceRepository(new DataContext());
        }

        public OntologyModel GetOntologiesById(int id)
        {
            return ontologyRepository.Get(a => a.Id == id).First();
        }
        public IQueryable<OntologyModel> GetOntologiesByUserId(int userId)
        {
            Console.WriteLine(ontologyRepository.Get(a => a.OwnerUserId == userId));
            return ontologyRepository.Get(a => a.OwnerUserId == userId);
        }
        public async Task<int> AddOntology(OntologyModel model)
        {
            int addedOntologyId = await ontologyRepository.Add(model);
            int id = await classRepository.Add(new OntologyClassModel(model.Id, "RootClass", null, "Корневой класс, созданный автоматически"));
            propertyRepository.Add(new OntologyPropertyModel(model.Id, "RootProperty", id, id, "Корневое свойство, созданное автоматически", null));
            return addedOntologyId;
        }
        public void DeleteOntology(int ontologyId)
        {
            var properties = propertyRepository.Get(a => a.OntologyId == ontologyId);
            var classes = classRepository.Get(a => a.OntologyId == ontologyId);
            var classesIds = classes.Select(a => a.Id).ToArray();

            var instances = instanceRepository.Get(a => classesIds.Contains(a.ClassId));

            propertyRepository.DeleteRange(properties.Select(property => property.Id));
            instanceRepository.DeleteRange(instances.Select(instance => instance.Id));
            classRepository.DeleteRange(classesIds);

            ontologyRepository.Delete(ontologyId);
         
        }

        public IQueryable<OntologyClassModel> GetClassesByOntologyId(int ontologyId)
        {
            return classRepository.Get(a => a.OntologyId == ontologyId);
        }
        public void DeleteClassRecursively(int id)
        {
            var deletedClasses = new List<int> { id };

            OntologyClassModel deletedClass = classRepository.Get(a => a.Id == id).FirstOrDefault();
            if (deletedClass == null)
            {
                return;
            }
            var allClasses = classRepository.Get(a => a.OntologyId == deletedClass.OntologyId).ToList();

            var classesToDelete = new List<int> { id };

            while (classesToDelete.Any())
            {
                var currentId = classesToDelete.First();
                classesToDelete.RemoveAt(0);

                var childClasses = allClasses.Where(a => a.ParentClassId == currentId).Select(a => a.Id);
                classesToDelete.AddRange(childClasses);
                deletedClasses.AddRange(childClasses);
            }

            classRepository.DeleteRange(deletedClasses);
        }
        public async Task<int> AddClass(OntologyClassModel ontologyClass)
        {
            int addedClassId = await classRepository.Add(ontologyClass);
            return addedClassId;
        }
        public void UpdateClass(OntologyClassModel ontologyClass)
        {
            classRepository.Update(ontologyClass);
        }


        public IQueryable<OntologyPropertyModel> GetPropertiesByOntologyId(int ontologyId)
        {
            //return propertyRepository.GetAll();
            return propertyRepository.Get(a => a.OntologyId == ontologyId);
        }
        public void DeletePropertyRecursively(int id)
        {
            var deletedClasses = new List<int> { id };

            OntologyPropertyModel deletedOntology = propertyRepository.Get(a => a.Id == id).FirstOrDefault();
            var allClasses = propertyRepository.Get(a => a.OntologyId == deletedOntology.OntologyId).ToList();

            var classesToDelete = new List<int> { id };

            while (classesToDelete.Any())
            {
                var currentId = classesToDelete.First();
                classesToDelete.RemoveAt(0);

                var childClasses = allClasses.Where(a => a.ParentPropertyId == currentId).Select(a => a.Id);
                classesToDelete.AddRange(childClasses);
                deletedClasses.AddRange(childClasses);
            }

            propertyRepository.DeleteRange(deletedClasses);
        }

        public async Task<int> AddProperty(OntologyPropertyModel property)
        {
            int addedPropertyId = await propertyRepository.Add(property);
            return addedPropertyId;
        }
        public void UpdateProperty(OntologyPropertyModel property)
        {
            propertyRepository.Update(property);
        }


        public void AddInstance(OntologyClassInstanceModel instance)
        {
            instanceRepository.Add(instance);
        }
        public void DeleteInstance(int id)
        {
            instanceRepository.Delete(id);
        }
        public void UpdateInstance(OntologyClassInstanceModel instance)
        {
            instanceRepository.Update(instance);
        }

    }
}
