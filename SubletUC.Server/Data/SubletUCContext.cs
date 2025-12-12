using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SubletUC.Objects;

namespace SubletUC.Data
{
    public class SubletUCContext : DbContext
    {
        public SubletUCContext (DbContextOptions<SubletUCContext> options)
            : base(options)
        {
        }

        public DbSet<Listing> Listing { get; set; } = default!;
        public DbSet<User> User { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Listing -> Owner (User) one-to-many
            modelBuilder.Entity<Listing>()
                .HasOne(l => l.Owner)
                .WithMany(u => u.Listings)
                .HasForeignKey(l => l.OwnerId)
                .OnDelete(DeleteBehavior.SetNull); // choose behavior you prefer

            // Configure many-to-many join table for bookmarks
            modelBuilder.Entity<User>()
        .HasMany(u => u.Bookmarked)
        .WithMany(l => l.BookmarkedBy)
        .UsingEntity<Dictionary<string, object>>(
            "UserBookmarkedListing",
            j => j.HasOne<Listing>().WithMany().HasForeignKey("ListingId"),
            j => j.HasOne<User>().WithMany().HasForeignKey("UserId"),
            j =>
            {
                j.HasKey("UserId", "ListingId");
                j.ToTable("UserBookmarkedListing");
            });
        }
    }
}
