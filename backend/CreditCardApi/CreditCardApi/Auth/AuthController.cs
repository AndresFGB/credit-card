using CreditCardApi.Data;
using CreditCardApi.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CreditCardApi.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] string username)
        {
            if(string.IsNullOrWhiteSpace(username))
                return BadRequest("Nombre de usaurio es requerido ");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                user = new User { Username = username };
            _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

            return Ok(new
            {
                userId = user.Id,
                username = user.Username
            });
        }

    }
}
