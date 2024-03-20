using OntoDAL.Models;

namespace OntoApi.Models.DTO
{
    public class OntologyDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string OwnerUsername { get; set; }


        public static explicit operator OntologyDTO(OntologyModel ontology)
        {
            return new OntologyDTO
            {
                Name = ontology.Name,
                //OwnerUsername = ontology.OwnerUser.UserName,
                OwnerUsername = "orlyasha",
                Id = ontology.Id
            };
        }
    }
}
