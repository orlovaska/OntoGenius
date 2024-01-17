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
    public class UserRepository : IDbRepository<UserModel>
    {
        private readonly DataContext dbContext;

        public UserRepository(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IQueryable<UserModel> Get(Expression<Func<UserModel, bool>> selector)
        {
            return dbContext.Users.Where(selector);
        }

        public IQueryable<UserModel> Get(int entityId)
        {
            return dbContext.Users.Where(e => e.Id == entityId);
        }

        public IQueryable<UserModel> GetAll()
        {
            return dbContext.Users;
        }

        public async Task<int> Add(UserModel newEntity)
        {
            dbContext.Users.Add(newEntity);
            await dbContext.SaveChangesAsync();
            return newEntity.Id;
        }

        public async Task AddRange(IEnumerable<UserModel> newEntities)
        {
            dbContext.Users.AddRange(newEntities);
            await dbContext.SaveChangesAsync();
        }

        public async Task Delete(int entityId)
        {
            var entityToDelete = await dbContext.Users.FindAsync(entityId);
            if (entityToDelete != null)
            {
                dbContext.Users.Remove(entityToDelete);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task Update(UserModel entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
        }

        public async Task UpdateRange(IEnumerable<UserModel> entities)
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
