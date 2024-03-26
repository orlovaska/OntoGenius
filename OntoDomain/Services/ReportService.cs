using OntoDAL.Models;
using OntoDAL.Repositories;
using OntoDAL.Repositories.PostgreRepos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OntoDomain.Services
{
    public class ReportService
    {

        public OntologyReportGenerator reportGenerator;
        public ReportService() {
            reportGenerator = new OntologyReportGenerator();
        }

        public byte[] GetOntologyReport(OntologyModel ontology)
        {
            byte[] fileContents = reportGenerator.GenerateOntologyReport(ontology);

            return fileContents;
        }
    }
}
