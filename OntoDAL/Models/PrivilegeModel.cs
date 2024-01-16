using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OntoDAL.Models
{
    /// <summary>
    /// Модель привилегии.
    /// </summary>
    internal class PrivilegeModel
    {
        /// <summary>
        /// Уникальный идентификатор привилегии.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Название.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Описание.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Список связей между ролью и данной привилегией.
        /// </summary>
        public List<RolePrivilegeModel> RolePrivileges { get; set; }
    }
}
