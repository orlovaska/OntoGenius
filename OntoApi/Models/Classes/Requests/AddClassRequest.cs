namespace OntoApi.Models.Classes.Requests
{
    public class AddClassRequest
    {
        public string Name { get; set; }
        public int ParentClassId { get; set; }
        public int OntologyId { get; set; }
    }
}
