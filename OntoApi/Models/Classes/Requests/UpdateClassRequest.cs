namespace OntoApi.Models.Classes.Requests
{
    public class UpdateClassRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentClassId { get; set; }
        public int OntologyId { get; set; }
    }
}
