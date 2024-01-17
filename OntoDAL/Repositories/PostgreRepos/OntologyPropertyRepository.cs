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
    public class OntologyPropertyRepository : IDbRepository<OntologyPropertyModel>
    {
        private readonly DataContext dbContext;

        public OntologyPropertyRepository(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IQueryable<OntologyPropertyModel> Get(Expression<Func<OntologyPropertyModel, bool>> selector)
        {
            return dbContext.OntologyProperties.Where(selector);
        }

        public IQueryable<OntologyPropertyModel> Get(int entityId)
        {
            return dbContext.OntologyProperties.Where(e => e.Id == entityId);
        }

        public IQueryable<OntologyPropertyModel> GetAll()
        {
            return dbContext.OntologyProperties;
        }

        public async Task<int> Add(OntologyPropertyModel newEntity)
        {
            dbContext.OntologyProperties.Add(newEntity);
            await dbContext.SaveChangesAsync();
            return newEntity.Id;
        }

        public async Task AddRange(IEnumerable<OntologyPropertyModel> newEntities)
        {
            dbContext.OntologyProperties.AddRange(newEntities);
            await dbContext.SaveChangesAsync();
        }

        public async Task Delete(int entityId)
        {
            var entityToDelete = await dbContext.OntologyProperties.FindAsync(entityId);
            if (entityToDelete != null)
            {
                dbContext.OntologyProperties.Remove(entityToDelete);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task Update(OntologyPropertyModel entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        public async Task UpdateRange(IEnumerable<OntologyPropertyModel> entities)
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
