using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OntoDAL.Models
{
    /// <summary>
    /// Представляет роль пользователя.
    /// </summary>
    public class RoleModel: IdentityRole<int>
    {
        ///// <summary>
        ///// Идентификатор.
        ///// </summary>
        //public int Id { get; set; }

        ///// <summary>
        ///// Название.
        ///// </summary>
        //public string Name { get; set; }

        ///// <summary>
        ///// Описание.
        ///// </summary>
        //public string Description { get; set; }

        /// <summary>
        /// Список связей между ролью и данной привилегией.
        /// </summary>
        public List<RolePrivilegeModel> RolePrivileges { get; set; }

        /// <summary>
        /// Список пользователей, имеющих данную роль.
        /// </summary>
        public List<UserRoleModel> UserRoles { get; set; }
    }
}
