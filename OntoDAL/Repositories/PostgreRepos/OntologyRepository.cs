using Microsoft.EntityFrameworkCore;
using OntoDAL.DataAccess;
using OntoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace OntoDAL.Repositories.PostgreRepos
{
    public class OntologyRepository : IDbRepository<OntologyModel>
    {
        private readonly DataContext dbContext;

        public OntologyRepository(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IQueryable<OntologyModel> Get(Expression<Func<OntologyModel, bool>> selector)
        {
            return dbContext.Ontologies.Where(selector);
        }

        public IQueryable<OntologyModel> Get(int entityId)
        {
            return dbContext.Ontologies.Where(e => e.Id == entityId);
        }

        public IQueryable<OntologyModel> GetAll()
        {
            return dbContext.Ontologies;
        }

        public async Task<int> Add(OntologyModel newEntity)
        {
            dbContext.Ontologies.Add(newEntity);
            await dbContext.SaveChangesAsync();
            return newEntity.Id;
        }

        public async Task AddRange(IEnumerable<OntologyModel> newEntities)
        {
            dbContext.Ontologies.AddRange(newEntities);
            await dbContext.SaveChangesAsync();
        }

        public async Task Delete(int entityId)
        {
            var entityToDelete = await dbContext.Ontologies.FindAsync(entityId);
            if (entityToDelete != null)
            {
                dbContext.Ontologies.Remove(entityToDelete);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task Update(OntologyModel entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        public async Task UpdateRange(IEnumerable<OntologyModel> entities)
        {
            foreach (var entity in entities)
            {
                dbContext.Entry(entity).State = EntityState.Modified;
            }
            await dbContext.SaveChangesAsync();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await dbContext.SaveChangesAsync();
        }
    }

}
