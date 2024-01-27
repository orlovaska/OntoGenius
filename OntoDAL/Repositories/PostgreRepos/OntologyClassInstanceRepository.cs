using Microsoft.EntityFrameworkCore;
using OntoDAL.DataAccess;
using OntoDAL.Models;
using OntoDAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

public class OntologyClassInstanceRepository : IDbRepository<OntologyClassInstanceModel>
{
    private readonly DataContext dbContext;

    public OntologyClassInstanceRepository(DataContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public IQueryable<OntologyClassInstanceModel> Get(Expression<Func<OntologyClassInstanceModel, bool>> selector)
    {
        return dbContext.OntologyClassInstances.Where(selector);
    }

    public IQueryable<OntologyClassInstanceModel> Get(int entityId)
    {
        return dbContext.OntologyClassInstances.Where(e => e.Id == entityId);
    }

    public IQueryable<OntologyClassInstanceModel> GetAll()
    {
        return dbContext.OntologyClassInstances;
    }

    public async Task<int> Add(OntologyClassInstanceModel newEntity)
    {
        dbContext.OntologyClassInstances.Add(newEntity);
        await dbContext.SaveChangesAsync();
        return newEntity.Id;
    }

    public async Task AddRange(IEnumerable<OntologyClassInstanceModel> newEntities)
    {
        dbContext.OntologyClassInstances.AddRange(newEntities);
        await dbContext.SaveChangesAsync();
    }

    public async Task Delete(int entityId)
    {
        var entityToDelete = await dbContext.OntologyClassInstances.FindAsync(entityId);
        if (entityToDelete != null)
        {
            dbContext.OntologyClassInstances.Remove(entityToDelete);
            await dbContext.SaveChangesAsync();
        }
    }

    public async Task Update(OntologyClassInstanceModel entity)
    {
        dbContext.Entry(entity).State = EntityState.Modified;
        await dbContext.SaveChangesAsync();
    }

    public async Task UpdateRange(IEnumerable<OntologyClassInstanceModel> entities)
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
