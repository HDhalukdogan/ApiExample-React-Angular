using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ApiExample.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ApiExample.Data
{
    public class ApiExampleContext : IdentityDbContext<User, Role, int>
    {
        public ApiExampleContext (DbContextOptions<ApiExampleContext> options)
            : base(options)
        {
        }

        public DbSet<ApiExample.Entities.SampleEntity> SampleEntity { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //builder.Entity<User>()
            //    .HasOne(a => a.Address)
            //    .WithOne()
            //    .HasForeignKey<UserAddress>(a => a.Id)
            //    .OnDelete(DeleteBehavior.Cascade);

            //builder.Entity<Role>()
            //    .HasData(
            //        new Role { Id = 1, Name = "Member", NormalizedName = "MEMBER" },
            //        new Role { Id = 2, Name = "Admin", NormalizedName = "ADMIN" }
            //    );
        }
    }
}
