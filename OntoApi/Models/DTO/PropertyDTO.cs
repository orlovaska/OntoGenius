using Microsoft.EntityFrameworkCore.Metadata;
using OntoDAL.Models;

namespace OntoApi.Models.DTO
{
    public class PropertyDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int OntologyId { get; set; }
        public int? ParentPropertyId { get; set; }
        public int DomainClassId { get; set; }
        public int RangeClassId { get; set; }

        public static explicit operator PropertyDTO(OntologyPropertyModel propertyModel)
        {
            return new PropertyDTO
            {
                Id = propertyModel.Id,
                Name = propertyModel.Name,
                ParentPropertyId = propertyModel.ParentPropertyId,
                DomainClassId = propertyModel.DomainClassId,
                RangeClassId = propertyModel.RangeClassId,
                OntologyId = propertyModel.OntologyId
            };
        }
    }
}
