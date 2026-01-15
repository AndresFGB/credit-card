using CreditCardApi.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace CreditCardApi.Data
{
    public class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users => Set<User>();
        public DbSet<CreditCard> CreditCards => Set<CreditCard>();
        public DbSet<Transaction> Transactions => Set<Transaction>();
    }
}
