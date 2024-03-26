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
    public class OntologyClassRepository : IDbRepository<OntologyClassModel>
    {
        private readonly DataContext dbContext;

        public OntologyClassRepository(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IQueryable<OntologyClassModel> Get(Expression<Func<OntologyClassModel, bool>> selector)
        {
            return dbContext.OntologyClasses.Where(selector);
        }

        public IQueryable<OntologyClassModel> Get(int entityId)
        {
            return dbContext.OntologyClasses.Where(e => e.Id == entityId);
        }

        public IQueryable<OntologyClassModel> GetAll()
        {
            return dbContext.OntologyClasses;
        }

        public async Task<int> Add(OntologyClassModel newEntity)
        {
            dbContext.OntologyClasses.Add(newEntity);
            await dbContext.SaveChangesAsync();
            return newEntity.Id;
        }

        public async Task AddRange(IEnumerable<OntologyClassModel> newEntities)
        {
            dbContext.OntologyClasses.AddRange(newEntities);
            await dbContext.SaveChangesAsync();
        }

        public async Task Delete(int entityId)
        {
            var entityToDelete = await dbContext.OntologyClasses.FindAsync(entityId);
            if (entityToDelete != null)
            {
                dbContext.OntologyClasses.Remove(entityToDelete);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteRange(IEnumerable<int> entitiesIds)
        {
            var entitiesToDelete = await dbContext.OntologyClasses.Where(e => entitiesIds.Contains(e.Id)).ToListAsync();
            if (entitiesToDelete != null && entitiesToDelete.Any())
            {
                dbContext.OntologyClasses.RemoveRange(entitiesToDelete);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task Update(OntologyClassModel entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        public async Task UpdateRange(IEnumerable<OntologyClassModel> entities)
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
