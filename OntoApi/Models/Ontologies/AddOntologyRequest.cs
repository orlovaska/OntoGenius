namespace OntoApi.Models.Ontologies
{
    public class AddOntologyRequest
    {
        public int OwnerUserId { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
    }
}
