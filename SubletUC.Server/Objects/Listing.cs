using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SubletUC.Objects
{
    public enum ListingType {
        Apartment,
        House,
        Duplex,
    }

    public class Listing {
        [Key]
        public int ListingId { get; set; }

        // ListingType is an enum; MaxLength is invalid for non-string types — removed earlier.
        public ListingType ListingType { get; set; }
        [Required]

        public string? Address { get; set; }

        public string? AddressLine2 { get; set; }
        [Required]

        public string? City { get; set; }

        [Required]
        public string? State { get; set; }

        [Required]
        public string? ZipCode { get; set; }

        [Required]
        public string? Country { get; set; }

        [Required]
        public decimal Rent { get; set; }

        // StartAvailability is a DateTime; MaxLength doesn't apply to DateTime so remove the attribute.
        [Required]
        public DateTime? StartAvailability { get; set; }
        [Required]
        public DateTime? EndAvailability { get; set; }
        public string? SemesterAvailability { get; set; }
        [Required]
        public int Bedrooms { get; set; }

        [Required]
        public int Bathrooms { get; set; }

        [MaxLength(1000)]
        public string? Description { get; set; }

        [Required]
        public bool WaterIncludedInRent { get; set; }
        [Required]
        public bool GasIncludedInRent { get; set; }
        [Required]
        public bool InternetIncludedInRent { get; set; }
        [Required]
        public bool TrashIncludedInRent { get; set; }
        [Required]
        public bool ElectricIncludedInRent { get; set; }
        [Required]
        public decimal AverageUtilitiesCost { get; set; }

        [Required]
        public bool? SharedRoom { get; set; }
        public int? SharedRoommates { get; set; }

        [Required]
        public bool? Furnished { get; set; }

        [Required]
        public int? AnimalsAllowed { get; set; }

        [Required]
        public int? WasherDryer { get; set; }

        [Required]
        public int? Parking { get; set; }

        [Required]
        public decimal DistanceFromCampus { get; set; }

        // Persisted in the DB as a JSON array of base64 strings (legacy)
        [Column(TypeName = "nvarchar(max)")]
        public string? Photos { get; set; }

        // Persisted photo bytes for the primary image. Stored directly in DB as varbinary(max).
        [Column(TypeName = "varbinary(max)")]
        public byte[]? PhotoData { get; set; }

        // Transient property used by the upload component and the UI
        [NotMapped]
        public byte[][]? PhotoBytes { get; set; }

        [Required]
        public int? RoommateNumber { get; set; }

        public Gender? PreferredGender { get; set; }

        public string? ContactMethod { get; set; }

        [Required]
        public string? Contact { get; set; }

        [Required]
        public string? ContactName { get; set; }

        public bool Deleted { get; set; }

        // Explicit FK to owner (User). Makes EF create no shadow FK.
        public int? OwnerId { get; set; }

        [ForeignKey(nameof(OwnerId))]
        public User? Owner { get; set; }

        // Users who bookmarked this listing (many-to-many)
        public ICollection<User>? BookmarkedBy { get; set; } = new List<User>();

        // Helper display properties mapping numeric codes to readable values
        [NotMapped]
        public string AnimalsAllowedText
        {
            get
            {
                if (!AnimalsAllowed.HasValue) return "Unknown";
                return AnimalsAllowed.Value switch
                {
                    0 => "Pet Friendly",
                    1 => "Cats Only",
                    2 => "Dogs Only",
                    3 => "Other",
                    4 => "No Pets",
                    _ => "Unknown",
                };
            }
        }

        [NotMapped]
        public string WasherDryerText
        {
            get
            {
                if (!WasherDryer.HasValue) return "Unknown";
                return WasherDryer.Value switch
                {
                    0 => "None",
                    1 => "In Unit",
                    2 => "Shared",
                    _ => "Unknown",
                };
            }
        }

        [NotMapped]
        public string ParkingText
        {
            get
            {
                if (!Parking.HasValue) return "Unknown";
                return Parking.Value switch
                {
                    0 => "Street Parking",
                    1 => "Driveway",
                    2 => "Garage",
                    3 => "Lot",
                    _ => "Unknown",
                };
            }
        }

        [NotMapped]
        public string BathroomsText
        {
            get => BathroomsTextForCode(this.Bathrooms);
        }

        public static string BathroomsTextForCode(int? code)
        {
            if (!code.HasValue) return "N/A";
            return code.Value switch
            {
                1 => "1",
                2 => "1.5",
                3 => "2",
                4 => "2.5",
                5 => "3+",
                _ => "N/A",
            };
        }

        [NotMapped]
        public string BedroomsText
        {
            get => BedroomsTextForCode(this.Bedrooms);
        }

        public static string BedroomsTextForCode(int? code)
        {
            if (!code.HasValue) return "N/A";
            return code.Value switch
            {
                1 => "1",
                2 => "2",
                3 => "3",
                4 => "4+",
                _ => "N/A",
            };
        }
    }
}