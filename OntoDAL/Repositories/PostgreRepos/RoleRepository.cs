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
    public class RoleRepository : IDbRepository<RoleModel>
    {
        private readonly DataContext dbContext;

        public RoleRepository(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IQueryable<RoleModel> Get(Expression<Func<RoleModel, bool>> selector)
        {
            return dbContext.Roles.Where(selector);
        }

        public IQueryable<RoleModel> Get(int entityId)
        {
            return dbContext.Roles.Where(e => e.Id == entityId);
        }

        public IQueryable<RoleModel> GetAll()
        {
            return dbContext.Roles;
        }

        public async Task<int> Add(RoleModel newEntity)
        {
            dbContext.Roles.Add(newEntity);
            await dbContext.SaveChangesAsync();
            return newEntity.Id;
        }

        public async Task AddRange(IEnumerable<RoleModel> newEntities)
        {
            dbContext.Roles.AddRange(newEntities);
            await dbContext.SaveChangesAsync();
        }

        public async Task Delete(int entityId)
        {
            var entityToDelete = await dbContext.Roles.FindAsync(entityId);
            if (entityToDelete != null)
            {
                dbContext.Roles.Remove(entityToDelete);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task Update(RoleModel entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        public async Task UpdateRange(IEnumerable<RoleModel> entities)
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
