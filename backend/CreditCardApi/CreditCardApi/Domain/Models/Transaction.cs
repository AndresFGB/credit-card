using System.Text.Json.Serialization;

namespace CreditCardApi.Domain.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CreditCardId { get; set; }

        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public User ? User { get; set; } = null;
        [JsonIgnore]
        public CreditCard? CreditCard { get; set; } 
    }
}
