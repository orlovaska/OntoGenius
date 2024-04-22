using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OntoApi.Models.Authentication;
using OntoApi.Models.Classes.Requests;
using OntoApi.Models.Classes.Responses;
using OntoApi.Models.Classes;
using OntoApi.Models.DTO;
using OntoApi.Models.Ontologies;
using OntoDAL.Models;
using OntoDomain.Services;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using OntoApi.Models.Properties;

namespace OntoApi.Controllers
{
    [Route("api/property")]
    [ApiController]
    public class PropertyController : Controller
    {
        [HttpGet("getPropertiesByOntologyId")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetPropertiesByOntologyId))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByOntologyId([FromQuery] int id)
        {
            var properties = new OntologyService().GetPropertiesByOntologyId(id);
            var propertyDTOs = properties.Select(o => (PropertyDTO)o).ToArray();
            var result = new GetPropertiesByOntologyId
            {
                Properties = propertyDTOs
            };
            return Ok(result);
        }

        [HttpPost("addProperty")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(AddPropertyResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddProperty([FromBody] AddPropertyRequest cls)
        {
            OntologyPropertyModel ontologyProperty = new OntologyPropertyModel(cls.OntologyId, cls.Name, cls.DomainClassId,cls.RangeClassId, "", cls.ParentPropertyId);
            if (cls == null)
            {
                return BadRequest();
            }

            int addedPropertyId = await new OntologyService().AddProperty(ontologyProperty);

            return Ok(new AddPropertyResponse()
            {
                AddedPropertyId = addedPropertyId,
            });
        }

        [HttpDelete("deleteProperty")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult DeleteProperty([FromQuery] int id)
        {
            if (id < 0)
            {
                return BadRequest();
            }

            new OntologyService().DeletePropertyRecursively(id);

            return Ok();
        }

        [HttpPut("updateProperty")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult UpdateProperty([FromBody] UpdatePropertyRequest request)
        {
            if (request == null || request.Id <= 0)
            {
                return BadRequest();
            }
            OntologyPropertyModel ontologyProperty = new OntologyPropertyModel(request.Id, request.OntologyId, request.Name, request.DomainClassId, request.RangeClassId, "", request.ParentPropertyId);
            new OntologyService().UpdateProperty(ontologyProperty);

            return Ok();
        }
    }
}

