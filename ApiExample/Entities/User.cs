using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace ApiExample.Entities
{
    public class User: IdentityUser<int>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
