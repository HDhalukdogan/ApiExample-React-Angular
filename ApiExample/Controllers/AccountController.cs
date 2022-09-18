using ApiExample.Data;
using ApiExample.DTOs;
using ApiExample.EmailSenderService;
using ApiExample.Entities;
using ApiExample.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiExample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<User> userManager, TokenService tokenService, RoleManager<Role> roleManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _roleManager = roleManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Name, Email = registerDto.Email };

            IdentityResult result = await _userManager.CreateAsync(user, registerDto.Password);

            await _userManager.AddToRoleAsync(user, "member");

            //if (result.Succeeded)
            //{
            //    string confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            //    string link = Url.Action("ConfirmEmail", "Home", new
            //    {
            //        userId = user.Id,
            //        token = confirmationToken
            //    }, protocol: HttpContext.Request.Scheme

            //    );

            //    EmailHelper.EmailConfirmationSendEmail(link, user.Email);

            //}
            //else
            //{
            //    //throw exception
            //}

            return StatusCode(201);
        }
        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);


            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
            };
        }

        //[HttpPost]
        //public IActionResult ResetPassword(string email, string newPassword)
        //{

        //    User user = _userManager.FindByEmailAsync(email).Result;

        //    if (user != null)

        //    {
        //        string passwordResetToken = _userManager.GeneratePasswordResetTokenAsync(user).Result;

        //        string passwordResetLink = Url.Action("ResetPasswordConfirm", "Home", new
        //        {
        //            userId = user.Id,
        //            token = passwordResetToken
        //        }, HttpContext.Request.Scheme);

        //        //  www.bıdıbıdı.com/Home/ResetPasswordConfirm?userId=sdjfsjf&token=dfjkdjfdjf

        //        EmailHelper.PasswordResetSendEmail(passwordResetLink, user.Email);


        //    }
        //    else
        //    {
        //        //throw error
        //    }
        //    return Ok();

        //}

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Name);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();



            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }

        [HttpGet("getAllUser")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersAsync()
        {
            return await _userManager.Users.ToListAsync();

        }

        [HttpPost("create-role")]
        public async Task<IActionResult> CreateRole(string roleName)
        {

            await _roleManager.CreateAsync(new Role { Name = roleName });
            return Ok(_roleManager.Roles.ToList());


        }

        [HttpGet("users-with-roles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .OrderBy(u => u.UserName)
                .Select(u => new
                {
                    u.Id,
                    Username = u.UserName,
                    Roles = u.UserRoles.Select(r => r.Role.Name).ToList()
                })
                .ToListAsync();

            return Ok(users);
        }

        [HttpPost("edit-roles/{username}")]
        public async Task<IActionResult> EditRoles(string username, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(",").ToArray();

            var user = await _userManager.FindByNameAsync(username);

            if (user == null) return NotFound("Could not find user");

            var userRoles = await _userManager.GetRolesAsync(user);

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded) return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded) return BadRequest("Failed to remove from roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }

    }
}
