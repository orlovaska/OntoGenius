using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OntoApi.Models.Authentication;
using OntoApi.Models.DTO;
using OntoApi.Models.Ontologies;
using OntoDAL.Models;
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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetOntologiesByUserIdResponse))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetByUserId([FromQuery] int id)
        {
            var ontologies = new OntologyService().GetOntologiesByUserId(id);
            var ontologyDTOs = ontologies.Select(o => (OntologyDTO)o).ToArray();
            var result = new GetOntologiesByUserIdResponse
            {
                Ontologies = ontologyDTOs
            };
            return Ok((result));
        }


        [HttpGet("downloadReport")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(DownloadReportResponse))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DownloadReport([FromQuery] int ontologyId)
        {
            var ontology = new OntologyService().GetOntologiesById(ontologyId);

            if (ontology == null)
            {
                return NotFound();
            }

            // Генерируем отчет
            byte[] reportData = new ReportService().GetOntologyReport(ontology);
            string fileName = $"OntologyReport_{ontologyId}.xml";

            //TODO убрать
            var filePath = @"C:\Users\User\Downloads\ontology_report.xml";
            System.IO.File.WriteAllBytes(filePath, reportData);

            var response = new DownloadReportResponse
            {
                ReportData = reportData,
                FileName = fileName
                
            };

            return Ok(response);

            // TODO - не факт, что будет работать
            //return File(response.ReportData, "application/octet-stream", "ontology_report.xml");

        }


        //// Метод добавления онтологии
        //[HttpPost("add")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status401Unauthorized)]
        //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
        //public async Task<IActionResult> AddOntology([FromBody] OntologyDTO ontologyDTO)
        //{
        //    // Преобразование DTO в модель
        //    var ontologyModel = (OntologyModel)ontologyDTO;

        //    // Вызов сервиса для добавления онтологии
        //    var addedOntology = new OntologyService().AddOntology(ontologyModel);

        //    // Преобразование добавленной онтологии в DTO
        //    var addedOntologyDTO = (OntologyDTO)addedOntology;

        //    // Формирование ответа
        //    var response = new AddOntologyResponse
        //    {
        //        AddedOntology = addedOntologyDTO
        //    };

        //    return Ok(response);
        //}

        // Метод удаления онтологии
        [HttpDelete("delete/{ontologyId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteOntology(int ontologyId)
        {
            // Вызов сервиса для удаления онтологии
            new OntologyService().DeleteOntology(ontologyId);

            return Ok();

        }
    }
}
