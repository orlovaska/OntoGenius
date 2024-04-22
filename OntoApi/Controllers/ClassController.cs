using Microsoft.AspNetCore.Mvc;
using OntoApi.Models.Authentication;
using OntoApi.Models.Classes;
using OntoApi.Models.Classes.Requests;
using OntoApi.Models.Classes.Responses;
using OntoApi.Models.DTO;
using OntoApi.Models.Ontologies;
using OntoDAL.Models;
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
        public async Task<IActionResult> GetByOntologyId([FromQuery] int id)
        {
            var classes = new OntologyService().GetClassesByOntologyId(id);
            var classDTOs = classes.Select(o => (ClassDTO)o).ToArray();
            var result = new GetByOntologyIdResponse
            {
                Classes = classDTOs
            };
            return Ok((result));
        }

        [HttpPost("addClass")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AddClassResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddClass([FromBody] AddClassRequest cls)
        {
            OntologyClassModel ontologyClass = new OntologyClassModel(cls.OntologyId, cls.Name, cls.ParentClassId, "");
            if (cls == null)
            {
                return BadRequest();
            }

            int addedClassId = await new OntologyService().AddClass(ontologyClass);

            return Ok(new AddClassResponse()
            {
                AddedClassId = addedClassId,
            });
        }

        [HttpDelete("deleteClass")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult DeleteClass([FromQuery] int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            new OntologyService().DeleteClassRecursively(id);

            return Ok();
        }

        [HttpPut("updateClass")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult UpdateClass([FromBody] UpdateClassRequest request)
        {
            if (request == null || request.Id < 0)
            {
                return BadRequest();
            }
            OntologyClassModel ontologyClass = new OntologyClassModel(request.Id, request.OntologyId, request.Name, request.ParentClassId, "");
            new OntologyService().UpdateClass(ontologyClass);

            return Ok();
        }

    }
}

