using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OntoDAL.Models
{
    /// <summary>
    /// Представляет свойство онтологии.
    /// </summary>
    public class OntologyPropertyModel
    {
        /// <summary>
        /// Идентификатор.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Уникальный идентификатор онтологии, к которой относится данное свойство.
        /// </summary>
        public int OntologyId { get; set; }

        /// <summary>
        /// Ссылка на объект онтологии.
        /// </summary>
        public OntologyModel Ontology { get; set; }

        /// <summary>
        /// Название свойства.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Уникальный идентификатор родительского класса.
        /// </summary>
        public int? ParentPropertyId { get; set; }

        /// <summary>
        /// Ссылка на родительский класс.
        /// </summary>
        public OntologyPropertyModel? ParentProperty { get; set; }

        /// <summary>
        /// Идентификатор класса-источника.
        /// </summary>
        public int DomainClassId { get; set; }

        /// <summary>
        /// Идентификатор класса-цели.
        /// </summary>
        public int RangeClassId { get; set; }

        /// <summary>
        /// Ссылка на объект класса-источника.
        /// </summary>
        public OntologyClassModel DomainClass { get; set; }

        /// <summary>
        /// Ссылка на объект класса-цели.
        /// </summary>
        public OntologyClassModel RangeClass { get; set; }

        /// <summary>
        /// Описание.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Конструктор для класса OntologyPropertyModel.
        /// </summary>
        /// <param name="id">Идентификатор.</param>
        /// <param name="ontologyId">Уникальный идентификатор онтологии.</param>
        /// <param name="name">Название свойства.</param>
        /// <param name="domainClassId">Идентификатор класса-источника.</param>
        /// <param name="rangeClassId">Идентификатор класса-цели.</param>
        /// <param name="description">Описание.</param>
        public OntologyPropertyModel(int ontologyId, string name, int domainClassId, int rangeClassId, string description, int? parentPropertyId)
        {
            OntologyId = ontologyId;
            ParentPropertyId = parentPropertyId;
            Name = name;
            DomainClassId = domainClassId;
            RangeClassId = rangeClassId;
            Description = description;
        }

        public OntologyPropertyModel(int id, int ontologyId, string name, int domainClassId, int rangeClassId, string description, int? parentPropertyId)
        {
            Id = id;
            OntologyId = ontologyId;
            ParentPropertyId = parentPropertyId;
            Name = name;
            DomainClassId = domainClassId;
            RangeClassId = rangeClassId;
            Description = description;
        }
    }
}
