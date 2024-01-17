using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OntoDAL.Models
{
    /// <summary>
    /// Представляет класс в онтологии.
    /// </summary>
    public class OntologyClassModel
    {
        /// <summary>
        /// Идентификатор.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Уникальный идентификатор онтологии, к которой относится данный класс.
        /// </summary>
        public int OntologyId { get; set; }

        /// <summary>
        /// Ссылка на объект онтологии.
        /// </summary>
        public OntologyModel Ontology { get; set; }

        /// <summary>
        /// Название.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Уникальный идентификатор родительского класса.
        /// </summary>
        public int? ParentClassId { get; set; }

        /// <summary>
        /// Ссылка на родительский класс.
        /// </summary>
        public OntologyClass? ParentClass { get; set; }

        /// <summary>
        /// Описание.
        /// </summary>
        public string Description { get; set; }
    }
}
