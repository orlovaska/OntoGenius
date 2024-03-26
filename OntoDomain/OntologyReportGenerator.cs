using OntoDAL.DataAccess;
using OntoDAL.Models;
using OntoDAL.Repositories.PostgreRepos;
using OntoDAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using System.Security.Claims;

namespace OntoDomain
{
    public class OntologyReportGenerator
    {

        public IDbRepository<OntologyPropertyModel> propertyRepository;
        public IDbRepository<OntologyClassModel> classRepository;

        public OntologyReportGenerator()
        {
            propertyRepository = new OntologyPropertyRepository(new DataContext());
            classRepository = new OntologyClassRepository(new DataContext());
        }


        public byte[] GenerateOntologyReport(OntologyModel ontology)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                XDocument xmlDocument = new XDocument(
                    new XDeclaration("1.0", "utf-8", "yes"),
                    new XElement("OntologyReport",
                        new XElement("Ontology",
                            new XElement("Name", ontology.Name),
                            new XElement("Description", ontology.Description),
                            new XElement("Classes", GetClassesXml(classRepository.Get(a => a.OntologyId == ontology.Id))),
                            new XElement("Properties", GetPropertiesXml(propertyRepository.Get(a => a.OntologyId == ontology.Id)))
                        )
                    )
                );

                // Сохраняем XML-документ в поток MemoryStream
                xmlDocument.Save(memoryStream);

                // Возвращаем массив байтов из MemoryStream
                return memoryStream.ToArray();
            }
        }

        private XElement GetPropertiesXml(IQueryable<OntologyPropertyModel> properties)
        {
            XElement propertiesXml = new XElement("Properties");
            foreach (var property in properties)
            {
                XElement propertyXml = new XElement("Property",
                    new XElement("Name", property.Name),
                    new XElement("Description", property.Description),
                    new XElement("DomainClass",
                        new XElement("Id", property.DomainClassId),
                        new XElement("Name", property.DomainClass?.Name)
                    ),
                    new XElement("RangeClass",
                        new XElement("Id", property.RangeClassId),
                        new XElement("Name", property.RangeClass?.Name)
                    )
                // Добавьте другие свойства свойства, если необходимо
                );

                propertiesXml.Add(propertyXml);
            }

            return propertiesXml;
        }


        private XElement GetClassesXml(IQueryable<OntologyClassModel> classes)
        {
            XElement classesXml = new XElement("Classes");
            foreach (var cls in classes)
            {
                XElement classXml = new XElement("Class",
                    new XElement("Name", cls.Name),
                    new XElement("Description", cls.Description)
                // Добавьте другие свойства класса, если необходимо
                );

                classesXml.Add(classXml);
            }

            return classesXml;
        }
    }
}
