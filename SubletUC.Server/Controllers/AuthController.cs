using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SubletUC.Data;
using SubletUC.Objects;
using System.Security.Claims;

namespace SubletUC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SubletUCContext _context;

        public AuthController(SubletUCContext context)
        {
            _context = context;
        }

        // GET: api/Auth/Me
        // This endpoint gets the currently logged-in user's details from the database
        [HttpGet("Me")]
        [Authorize] // 1. Ensures only logged-in users can access this
        public async Task<ActionResult<User>> GetCurrentUser()
        {
            // 2. Identify the user from the HttpContext Claims
            // Depending on how you log them in, the ID might be in NameIdentifier or Email
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userEmailClaim = User.FindFirstValue(ClaimTypes.Email);

            // If we can't find identity claims, something is wrong with auth configuration
            if (string.IsNullOrEmpty(userIdClaim) && string.IsNullOrEmpty(userEmailClaim))
            {
                return BadRequest("User identity could not be determined.");
            }

            User? currentUser = null;

            // 3. Query the database
            // Scenario A: If you stored the integer ID in the claims
            if (int.TryParse(userIdClaim, out int userId))
            {
                currentUser = await _context.User.FindAsync(userId);
            }
            // Scenario B: If you utilize Email to identify users
            else if (!string.IsNullOrEmpty(userEmailClaim))
            {
                // Assuming your User object has an 'Email' property
                // You might need to change 'u.Email' to whatever property holds the unique identifier
                currentUser = await _context.User
                    .FirstOrDefaultAsync(u => u.Email == userEmailClaim);
            }

            if (currentUser == null)
            {
                return NotFound("User profile not found in database.");
            }

            return Ok(currentUser);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromForm] string email, [FromForm] string password)
        {
            // 1. Validate User against DB
            // WARNING: In production, hash your passwords! Do not store/compare plain text.
            var user = await _context.User
                .FirstOrDefaultAsync(u => u.Email == email && u.Password == password);

            if (user == null)
            {
                return Redirect("/login?error=Invalid credentials");
            }

            // 2. Create User Claims
            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.FirstName ?? "User")
        };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties { IsPersistent = true };

            // 3. Sign In (This creates the encrypted cookie)
            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            // 4. Redirect to Home
            return Redirect("/");
        }
    }
}