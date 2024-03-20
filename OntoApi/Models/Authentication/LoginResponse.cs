using OntoApi.Models.DTO;
using OntoDAL.Models;

namespace OntoApi.Models.Authentication
{
    public class LoginResponse
    {
        public string AccessToken { get; set; }
        //public DateTime Expiration { get; set; }
        public string RefreshToken { get; set; }
        public UserDto User { get; set; }
    }
}
