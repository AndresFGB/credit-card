using CreditCardApi.Data;
using CreditCardApi.Domain.Models;
using CreditCardApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CreditCardApi.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CreditCardsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly GeneratorService _generator;

        public CreditCardsController(AppDbContext context, GeneratorService generator)
        {
            _context = context;
            _generator = generator;
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

            if (string.IsNullOrWhiteSpace(card.Type) || card.Type == "AUTO" )
                card.Type = _generator.GenerateCardType();

            if (string.IsNullOrWhiteSpace(card.Last4) || card.Last4 == "0000" )
                card.Last4 = _generator.GenerateLast4();

            if (card.CreditLimit <= 0)
                card.CreditLimit = _generator.GenerateCreditLimit();

            if (card.Balance <= 0)
                card.Balance = _generator.GenerateInitialBalance(card.CreditLimit);

            _context.CreditCards.Add(card);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetByUserId),
                new { userId = card.UserId },
                card
            );
        }

        //PUT
        [HttpPut("user/{userId}/{id}")]
        public async Task<IActionResult> UpdateById(int userId, int id, CreditCard updatedCard)
        {
            var existingCard = await _context.CreditCards
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (existingCard == null)
                return NotFound();

            if (!string.IsNullOrWhiteSpace(updatedCard.Last4) &&
       updatedCard.Last4.Length == 4 &&
       updatedCard.Last4.All(char.IsDigit))
            {
                existingCard.Last4 = updatedCard.Last4;
            }

            if (!string.IsNullOrWhiteSpace(updatedCard.Type))
            {
                existingCard.Type = updatedCard.Type;
            }
            if (updatedCard.CreditLimit > 0)
            {
                existingCard.CreditLimit = updatedCard.CreditLimit;

                if (existingCard.Balance > existingCard.CreditLimit)
                    existingCard.Balance = existingCard.CreditLimit;
            }

            await _context.SaveChangesAsync();
            return Ok(existingCard);
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
