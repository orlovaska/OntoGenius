namespace OntoApi.Models.Properties
{
    public class AddPropertyRequest
    {
        public string Name { get; set; }
        public int DomainClassId { get; set; }
        public int RangeClassId { get; set; }
        public int OntologyId { get; set; }
        public int ParentPropertyId { get; set; }
    }
}