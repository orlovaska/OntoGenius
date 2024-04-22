using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OntoDAL.Models
{
    /// <summary>
    /// Представляет объект онтологии.
    /// </summary>
    public class OntologyModel
    {
        /// <summary>
        /// Идентификатор.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Идентификатор пользователя, создавшего объект.
        /// </summary>
        public int OwnerUserId { get; set; }

        /// <summary>
        /// Ссылка на пользователя, создавшего онтологию.
        /// </summary>
        public UserModel OwnerUser { get; set; }

        /// <summary>
        /// Название объекта.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Описание объекта.
        /// </summary>
        public string Description { get; set; }

        ///// <summary>
        ///// Список разрешений пользователей на данный объект.
        ///// </summary>
        //public List<UserOntologyPermission> UserOntologyPermissions { get; set; }

        /// <summary>
        /// Список классов.
        /// </summary>
        public List<OntologyClassModel> OntologyClasses { get; set; }

        public OntologyModel(int ownerUserId, string name, string description)
        {
            OwnerUserId = ownerUserId;
            Name = name;
            Description = description;

        }
    }

}
