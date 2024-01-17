using Microsoft.EntityFrameworkCore;
using OntoDAL.DataAccess;
using OntoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace OntoDAL.Repositories
{
    public class UserRoleRepository : IDbRepository<UserRoleModel>
    {
        private readonly DataContext dbContext;

        public UserRoleRepository(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IQueryable<UserRoleModel> Get(Expression<Func<UserRoleModel, bool>> selector)
        {
            return dbContext.UserRoles.Where(selector);
        }

        public IQueryable<UserRoleModel> Get(int entityId)
        {
            return dbContext.UserRoles.Where(e => e.Id == entityId);
        }

        public IQueryable<UserRoleModel> GetAll()
        {
            return dbContext.UserRoles;
        }

        public async Task<int> Add(UserRoleModel newEntity)
        {
            dbContext.UserRoles.Add(newEntity);
            await dbContext.SaveChangesAsync();
            return newEntity.Id;
        }

        public async Task AddRange(IEnumerable<UserRoleModel> newEntities)
        {
            dbContext.UserRoles.AddRange(newEntities);
            await dbContext.SaveChangesAsync();
        }

        public async Task Delete(int entityId)
        {
            var entityToDelete = await dbContext.UserRoles.FindAsync(entityId);
            if (entityToDelete != null)
            {
                dbContext.UserRoles.Remove(entityToDelete);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task Update(UserRoleModel entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        public async Task UpdateRange(IEnumerable<UserRoleModel> entities)
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
