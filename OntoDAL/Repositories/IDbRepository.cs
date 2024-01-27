using System.Linq.Expressions;

namespace OntoDAL.Repositories
{
    public interface IDbRepository<T>
    {
        IQueryable<T> Get(Expression<Func<T, bool>> selector);
        IQueryable<T> Get(int entityId);
        IQueryable<T> GetAll();

        Task<int> Add(T newEntity);
        Task AddRange(IEnumerable<T> newEntities);

        Task Delete(int entityId);

        //Task Remove(T entity);
        //Task RemoveRange(IEnumerable<T> entities);

        Task Update(T entity);
        Task UpdateRange(IEnumerable<T> entities);

        Task<int> SaveChangesAsync();
    }
}
