using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace ApiExample.Entities
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
