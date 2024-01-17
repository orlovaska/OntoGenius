using Microsoft.EntityFrameworkCore;
using OntoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OntoDAL.DataAccess
{
    public class DataContext : DbContext
    {
        public DbSet<OntologyClassInstanceModel> OntologyClassInstances { get; set; }
        public DbSet<OntologyClassModel> OntologyClasses { get; set; }
        public DbSet<OntologyModel> Ontologies { get; set; }
        public DbSet<OntologyPropertyModel> OntologyProperties { get; set; }
        public DbSet<PrivilegeModel> Privileges { get; set; }
        public DbSet<RoleModel> Roles { get; set; }
        public DbSet<RolePrivilegeModel> RolePrivileges { get; set; }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<UserRoleModel> UserRoles { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }

        public DbSet<T> DbSet<T>() where T : class
        {
            return Set<T>();
        }

        public new IQueryable<T> Query<T>() where T : class
        {
            return Set<T>();
        }
    }
}
