using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OntoDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OntoDAL.DataAccess
{
    public class DataContext : IdentityDbContext<UserModel, RoleModel, int>
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

        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            //TODO убрать напрямую указанную строку подключения
            optionsBuilder.UseNpgsql("Server=localhost;Port=5432;Database=OntoGenius;User Id=postgres;Password=1234");
        }

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }

        //public DbSet<T> DbSet<T>() where T : class
        //{
        //    return Set<T>();
        //}

        //public new IQueryable<T> Query<T>() where T : class
        //{
        //    return Set<T>();
        //}
    }
}
