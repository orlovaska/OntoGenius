using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OntoDAL.Models
{
    /// <summary>
    /// Представляет экземпляр класса онтологии.
    /// </summary>
    internal class OntologyClassInstance
    {
        /// <summary>
        /// Идентификатор.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Идентификатор класса онтологии, к которому принадлежит экземпляр.
        /// </summary>
        public int ClassId { get; set; }

        /// <summary>
        /// Ссылка на класс онтологии, к которому принадлежит экземпляр.
        /// </summary>
        public OntologyClass Class { get; set; }

        /// <summary>
        /// Название.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Описание.
        /// </summary>
        public string Description { get; set; }
    }
}
