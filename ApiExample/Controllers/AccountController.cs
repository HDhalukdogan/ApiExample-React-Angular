using ApiExample.Data;
using ApiExample.DTOs;
using ApiExample.Entities;
using ApiExample.Services;
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
        private readonly TokenService _tokenService;

        public AccountController(UserManager<User> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(string name, string email, string password)
        {
            var user = new User { UserName = name, Email = email };

            //await _userManager.AddToRoleAsync(user, "Member");

            await _userManager.CreateAsync(user, password);

            return StatusCode(201);
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(string name, string password)
        {
            var user = await _userManager.FindByNameAsync(name);
            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
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


    }
}
