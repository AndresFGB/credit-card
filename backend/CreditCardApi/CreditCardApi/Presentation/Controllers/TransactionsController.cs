using CreditCardApi.Data;
using CreditCardApi.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CreditCardApi.Presentation.Controllers
{
    [ApiController] 
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionsController(AppDbContext context)
        {
            _context = context;
        }

        //GET
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var transactions = await _context.Transactions
                .Where(t => t.UserId == userId)
                .ToListAsync();

            return Ok(transactions);
        }

        //POST
        [HttpPost("user/{userId}")]
        public async Task<IActionResult> Create(int userId, Transaction transaction)
        {
            if (transaction.Amount <= 0)
                return BadRequest("El monto debe ser mayor a cero");

            var card = await _context.CreditCards
                .FirstOrDefaultAsync(c =>
                    c.Id == transaction.CreditCardId &&
                    c.UserId == userId);

            if (card == null)
                return BadRequest("Tarjeta no válida para el usuario");

            if (card.Balance < transaction.Amount)
                return BadRequest("Fondos insuficientes");

            card.Balance -= transaction.Amount;

            transaction.UserId = userId;
            transaction.CreatedAt = DateTime.UtcNow;

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(transaction);
        }


    }
}
