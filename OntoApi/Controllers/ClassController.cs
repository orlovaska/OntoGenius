using Microsoft.AspNetCore.Mvc;
using OntoApi.Models.Authentication;
using OntoApi.Models.Classes;
using OntoApi.Models.DTO;
using OntoApi.Models.Ontologies;
using OntoDomain.Services;

namespace OntoApi.Controllers
{
    [Route("api/class")]
    [ApiController]
    public class ClassController : Controller
    {
        [HttpGet("getByOntologyId")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetByOntologyIdResponse))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> getByOntologyId([FromQuery] int id)
        {
            var classes = new OntologyService().GetClassesByOntologyId(id);
            var classDTOs = classes.Select(o => (ClassDTO)o).ToArray();
            var result = new GetByOntologyIdResponse
            {
                Classes = classDTOs
            };
            return Ok((result));
        }
    }
}

