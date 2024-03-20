using OntoDAL.Models;

namespace OntoApi.Models.DTO
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }


        public static explicit operator UserDto(UserModel user)
        {
            return new UserDto
            {
                Username = user.UserName,
                Email = user.Email,
                Id = user.Id.ToString()
            };
        }
    }
}
