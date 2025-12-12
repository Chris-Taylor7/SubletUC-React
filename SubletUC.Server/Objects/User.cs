using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SubletUC.Objects
{
    public enum Gender {
        Male,
        Female,
        NonBinary,
        Other,
    }

    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string? FullName { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(254)]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public bool IsActive { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        // Persisted in the DB as a JSON array of base64 strings (legacy)
        [Column(TypeName = "nvarchar(max)")]
        public string? ProfilePicture { get; set; }
        // Persisted photo bytes for the primary image. Stored directly in DB as varbinary(max).
        [Column(TypeName = "varbinary(max)")]
        public byte[]? PhotoData { get; set; }
        // Transient property used by the upload component and the UI
        [NotMapped]
        public byte[][]? PhotoBytes { get; set; }
        public Gender Gender { get; set; }
        public ICollection<Listing>? Listings { get; set; } = new List<Listing>();
        public ICollection<Listing>? Bookmarked { get; set; } = new List<Listing>();
    }
}