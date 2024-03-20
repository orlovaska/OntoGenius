using OntoDAL.Models;

namespace OntoApi.Models.DTO
{
    public class ClassDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentClassId { get; set; } 


        public static explicit operator ClassDTO(OntologyClassModel classModel)
        {
            return new ClassDTO
            {
                Name = classModel.Name,
                //OwnerUsername = ontology.OwnerUser.UserName,
                ParentClassId = classModel.ParentClassId,
                Id = classModel.Id
            };
        }
    }
}

