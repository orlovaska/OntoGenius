using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace OntoDAL.Models
{
    /// <summary>
    /// Представляет пользователя системы.
    /// </summary>
    public class UserModel: IdentityUser<int>
    {
        ///// <summary>
        ///// Идентификатор пользователя.
        ///// </summary>
        //public int Id { get; set; }

        ///// <summary>
        ///// Логин.
        ///// </summary>
        //public string Username { get; set; }

        ///// <summary>
        ///// Хэш пароля.
        ///// </summary>
        //public string PasswordHash { get; set; }

        ///// <summary>
        ///// Электронная почта.
        ///// </summary>
        //public string Email { get; set; }

        ///// <summary>
        ///// Список ролей пользователя.
        ///// </summary>
        //public List<UserRoleModel> UserRoles { get; set; }

        /// <summary>
        /// Рефреш токен пользователя.
        /// </summary>
        public string? RefreshToken { get; set; }

        /// <summary>
        /// Время истечения срока действия RefreshToken.
        /// </summary>
        public DateTime RefreshTokenExpiry { get; set; }
    }
}
