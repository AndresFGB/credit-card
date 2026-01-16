using CreditCardApi.Data;
using CreditCardApi.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Security.Cryptography;


namespace CreditCardApi.Auth
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
    private string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }
        private readonly AppDbContext _context;
        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if(string.IsNullOrWhiteSpace(request.Username))
                return BadRequest("Nombre de usaurio es requerido ");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
            {
                user = new User { Username = request.Username, PasswordHash = HashPassword(request.Password) };
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
