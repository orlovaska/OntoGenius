using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OntoApi.Models.Authentication;
using OntoApi.Models.DTO;
using OntoApi.Models.Ontologies;
using OntoDomain.Services;
using System.IdentityModel.Tokens.Jwt;

namespace OntoApi.Controllers
{
    [Route("api/ontology")]
    [ApiController]
    public class OntologyController : Controller
    {
        [HttpGet("getAll")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LoginResponse))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll()
        {
            return Ok();
        }


        //[Authorize]
        [HttpGet("getByUserId")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetByUserIdResponse))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByUserId([FromQuery] int id)
        {
            var ontologies = new OntologyService().GetOntologiesByUserId(id);
            var ontologyDTOs = ontologies.Select(o => (OntologyDTO)o).ToArray();
            var result = new GetByUserIdResponse
            {
                Ontologies = ontologyDTOs
            };
            return Ok((result));

            //return Ok("Возврат ответа");

        }
    }
}
