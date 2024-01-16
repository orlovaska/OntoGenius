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
    internal class OntologyPropertyModel
    {
        /// <summary>
        /// Идентификатор.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Ссылка на объект онтологии.
        /// </summary>
        public OntologyModel Ontology { get; set; }

        /// <summary>
        /// Название свойства.
        /// </summary>
        public string Name { get; set; }

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
        public OntologyClass DomainClass { get; set; }

        /// <summary>
        /// Ссылка на объект класса-цели.
        /// </summary>
        public OntologyClass RangeClass { get; set; }

        /// <summary>
        /// Описание.
        /// </summary>
        public string Description { get; set; }
    }
}
