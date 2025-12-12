using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SubletUC.Data;
using SubletUC.Objects;

namespace SubletUC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly SubletUCContext _context;

        public UsersController(SubletUCContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // Soft-delete: mark user inactive
            user.IsActive = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.UserId == id);
        }

        // POST: api/Users/toggle-bookmark/5/1
        [HttpPost("toggle-bookmark/{listingId}/{userId}")]
        public async Task<IActionResult> ToggleBookmark(int listingId, int userId)
        {
            // 1. Get the user and include their bookmarks
            // We use Include so EF Core loads the relationship data
            var user = await _context.User
                .Include(u => u.Bookmarked)
                .FirstOrDefaultAsync(u => u.UserId == userId);

            if (user == null) return NotFound("User not found");

            // 2. Get the listing
            var listing = await _context.Listing.FindAsync(listingId);
            if (listing == null) return NotFound("Listing not found");

            // 3. Ensure the list is initialized (defensive coding)
            if (user.Bookmarked == null) user.Bookmarked = new List<Listing>();

            // 4. Check if relationship exists
            var existingBookmark = user.Bookmarked.FirstOrDefault(b => b.ListingId == listingId);

            if (existingBookmark != null)
            {
                // REMOVE bookmark
                user.Bookmarked.Remove(existingBookmark);
            }
            else
            {
                // ADD bookmark
                user.Bookmarked.Add(listing);
            }

            // 5. Save changes
            await _context.SaveChangesAsync();

            // Return the new status (true if we just added it, false if we just removed it)
            return Ok(existingBookmark == null);
        }
    }
}
