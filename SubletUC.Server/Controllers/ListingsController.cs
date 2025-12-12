using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SubletUC.Data;
using SubletUC.Objects;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace SubletUC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListingsController : ControllerBase
    {
        private readonly SubletUCContext _context;
        private readonly IWebHostEnvironment _env;

        public ListingsController(SubletUCContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/Listings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Listing>>> GetListing()
        {
            return await _context.Listing.Where(l => !l.Deleted).ToListAsync();
        }

        // GET: api/Listings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Listing>> GetListing(int id)
        {
            var listing = await _context.Listing.FindAsync(id);

            if (listing == null || listing.Deleted)
            {
                return NotFound();
            }

            return listing;
        }

        // PUT: api/Listings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListing(int id, Listing listing)
        {
            if (listing == null || id != listing.ListingId)
            {
                return BadRequest();
            }

            // Ensure the entity exists
            if (!ListingExists(id))
                return NotFound();

            _context.Entry(listing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListingExists(id))
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

        // POST: api/Listings
        [HttpPost]
        public async Task<ActionResult<Listing>> PostListing(PostListingDto dto)
        {
            if (dto == null)
                return BadRequest();

            // Map DTO to Listing
            var listing = new Listing();

            // ListingType
            if (!string.IsNullOrWhiteSpace(dto.ListingType) && Enum.TryParse<ListingType>(dto.ListingType, true, out var lt))
                listing.ListingType = lt;

            listing.Address = dto.Address;
            listing.AddressLine2 = dto.AddressLine2 ?? string.Empty;
            listing.City = dto.City;
            listing.State = dto.State;
            listing.ZipCode = dto.ZipCode;
            listing.Country = string.IsNullOrWhiteSpace(dto.Country) ? "United States" : dto.Country;
            listing.Rent = dto.Rent;
            listing.StartAvailability = dto.StartAvailability;
            listing.EndAvailability = dto.EndAvailability;
            listing.SemesterAvailability = dto.SemesterAvailability;
            listing.Bedrooms = dto.Bedrooms;
            listing.Bathrooms = dto.Bathrooms;
            listing.Description = dto.Description;
            listing.WaterIncludedInRent = dto.WaterIncludedInRent;
            listing.GasIncludedInRent = dto.GasIncludedInRent;
            listing.InternetIncludedInRent = dto.InternetIncludedInRent;
            listing.TrashIncludedInRent = dto.TrashIncludedInRent;
            listing.ElectricIncludedInRent = dto.ElectricIncludedInRent;
            listing.AverageUtilitiesCost = dto.AverageUtilitiesCost;
            listing.OwnerId = dto.OwnerId;

            // For required nullable int/bool fields, ensure defaults when dto omits values
            listing.SharedRoom = dto.SharedRoom ?? false;
            listing.SharedRoommates = dto.SharedRoommates ?? 0;
            listing.Furnished = dto.Furnished ?? false;
            listing.AnimalsAllowed = dto.AnimalsAllowed ?? 0;
            listing.WasherDryer = dto.WasherDryer ?? 0;
            listing.Parking = dto.Parking ?? 0;

            listing.DistanceFromCampus = dto.DistanceFromCampus; // decimal (may be 0)

            // Photos: store all base64 strings as JSON in Photos column
            if (dto.Photos != null && dto.Photos.Length > 0)
            {
                // Persist the array of base64 strings as JSON
                listing.Photos = JsonSerializer.Serialize(dto.Photos);

                // Do not set PhotoData column anymore — we rely on the Photos JSON array for all images
                listing.PhotoData = null;
            }
            else
            {
                listing.Photos = null;
                listing.PhotoData = null;
            }

            listing.RoommateNumber = dto.RoommateNumber ?? 0;
            listing.ContactMethod = dto.ContactMethod;
            listing.Contact = dto.Contact;
            listing.ContactName = dto.ContactName;

            if (!string.IsNullOrWhiteSpace(dto.PreferredGender) && Enum.TryParse<Gender>(dto.PreferredGender.Replace("-", ""), true, out var pg))
                listing.PreferredGender = pg;

            listing.Deleted = false;

            _context.Listing.Add(listing);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetListing), new { id = listing.ListingId }, listing);
        }

        // DELETE: api/Listings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListing(int id)
        {
            var listing = await _context.Listing.FindAsync(id);
            if (listing == null)
            {
                return NotFound();
            }
            listing.Deleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ListingExists(int id)
        {
            return _context.Listing.Any(e => e.ListingId == id && !e.Deleted);
        }
    }
}
