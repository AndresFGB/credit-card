namespace CreditCardApi.Services
{
    public class GeneratorService
    {
        private readonly Random _random = new();
        private readonly int[] _availableLimits = { 1000, 2000, 3000, 5000, 8000, 10000, 15000, 20000 };
        public string GenerateCardType()
        {
            string[] types = { "Visa", "MasterCard", "American Express", "Discover" };
            return types[_random.Next(types.Length)];
        }
        public string GenerateLast4()
        {
            return _random.Next(1000, 9999).ToString();
        }

        public decimal GenerateCreditLimit()
        {
            return _availableLimits[_random.Next(_availableLimits.Length)];
        }

        public decimal GenerateInitialBalance(decimal creditLimit)
        {
            return Math.Round(
      (decimal)_random.NextDouble() * creditLimit,
      3
  );
        }
    }
}
