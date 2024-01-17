using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OntoDAL.Models
{
    /// <summary>
    /// Представляет пользователя системы.
    /// </summary>
    public class UserModel
    {
        /// <summary>
        /// Идентификатор пользователя.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Логин.
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Хэш пароля.
        /// </summary>
        public string PasswordHash { get; set; }

        /// <summary>
        /// Электронная почта.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Список ролей пользователя.
        /// </summary>
        public List<UserRoleModel> UserRoles { get; set; }
    }
}
