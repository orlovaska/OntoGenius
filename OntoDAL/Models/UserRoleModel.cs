using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OntoDAL.Models
{
    /// <summary>
    /// Представляет связь между пользователем и ролью.
    /// </summary>
    public class UserRoleModel
    {
        /// <summary>
        /// Идентификатор.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Идентификатор пользователя.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Идентификатор роли.
        /// </summary>
        public int RoleId { get; set; }

        /// <summary>
        /// Пользователь, с которым связана данная роль.
        /// </summary>
        public UserModel User { get; set; }

        /// <summary>
        /// Роль, с которой связан данный пользователь.
        /// </summary>
        public RoleModel Role { get; set; }
    }
}
