using Microsoft.AspNetCore.Mvc;
using OntoApi.Models.DTO;
using OntoApi.Models.Ontologies;
using OntoDAL.Models;
using OntoDomain.Services;
using System.Linq;
using System.Threading.Tasks;

namespace OntoApi.Controllers
{
    [Route("api/instance")]
    [ApiController]
    public class ClassInstanceController : Controller
    {
        [HttpPost("addInstance")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddInstance([FromBody] OntologyClassInstanceModel instance)
        {
            if (instance == null)
            {
                return BadRequest();
            }

            new OntologyService().AddInstance(instance);

            return Ok();
        }

        [HttpDelete("deleteInstance")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult DeleteInstance([FromQuery] int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            new OntologyService().DeleteInstance(id);

            return Ok();
        }

        [HttpPut("updateInstance")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult UpdateInstance([FromBody] OntologyClassInstanceModel instance)
        {
            if (instance == null || instance.Id <= 0)
            {
                return BadRequest();
            }

            new OntologyService().UpdateInstance(instance);

            return Ok();
        }
    }
}
