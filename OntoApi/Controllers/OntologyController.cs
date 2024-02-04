using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OntoApi.Authentication;
using System.IdentityModel.Tokens.Jwt;

namespace OntoApi.Controllers
{
    [Route("api/ontology")]
    [ApiController]
    public class OntologyController : Controller
    {
        [HttpPost("getAll")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LoginResponse))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll([FromBody] LoginModel model)
        {
            return Ok();
        }
    }
}
