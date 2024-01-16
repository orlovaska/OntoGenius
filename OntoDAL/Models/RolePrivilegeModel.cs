using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OntoDAL.Models
{
    /// <summary>
    /// Представляет связь между ролью и привилегией.
    /// </summary>
    internal class RolePrivilegeModel
    {
        /// <summary>
        /// Идентификатор.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Идентификатор роли.
        /// </summary>
        public int RoleId { get; set; }

        /// <summary>
        /// Идентификатор привилегии.
        /// </summary>
        public int PrivilegeId { get; set; }

        /// <summary>
        /// Роль, с которой связана данная привилегия.
        /// </summary>
        public RoleModel Role { get; set; }

        /// <summary>
        /// Привилегия, с которой связяна данная роль.
        /// </summary>
        public PrivilegeModel Privilege { get; set; }
    }
}
