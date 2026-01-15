using CreditCardApi.Data;
using CreditCardApi.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CreditCardApi.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CreditCardsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CreditCardsController(AppDbContext context)
        {
            _context = context;
        }

        //GET: api/CreditCards
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var creditCards = await _context.CreditCards
         .Where(c => c.UserId == userId)
         .ToListAsync();

            return Ok(creditCards);
        }

        //POST
        [HttpPost]
        public async  Task<IActionResult> Create(CreditCard card)
        {
            if (card.UserId <= 0)
                return BadRequest("UserId requerido");

            _context.CreditCards.Add(card);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetByUserId),
                new { userId = card.UserId }, card);
        }

        //PUT
        [HttpPut("user/{userId}/{id}")]
        public async Task<IActionResult> UpdateById(int userId, int id, CreditCard updatedCard)
        {
            var existingCard = await _context.CreditCards
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (existingCard == null)
                return NotFound();

            existingCard.Type = updatedCard.Type;
            existingCard.Last4 = updatedCard.Last4;
            existingCard.CreditLimit = updatedCard.CreditLimit;
            existingCard.Balance = updatedCard.Balance;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        //DELETE 
        [HttpDelete("user/{userId}/{id}")]

        public async Task<IActionResult> DeleteById(int userId, int id)
        {
            var card = await _context.CreditCards
        .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (card == null)
                return NotFound();

            _context.CreditCards.Remove(card);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
