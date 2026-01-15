using System.ComponentModel.DataAnnotations;

namespace CreditCardApi.Domain.Models
{
    public class CreditCard
    {

        public int Id { get; set; }
        public int UserId { get; set; }

        [Required]
        public string Type { get; set; }
        [Required]
        [StringLength(4, MinimumLength = 4)]
        public string Last4 { get; set; }

        [Range (0, double.MaxValue,ErrorMessage = "El valor del crédito debe ser mayor a cero(0)")]
        public decimal CreditLimit { get; set; }
        public decimal Balance { get; set; }


        public User? User { get; set; }
    }
}
