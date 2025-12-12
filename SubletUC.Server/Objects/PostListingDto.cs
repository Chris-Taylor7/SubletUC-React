using System;
using System.Collections.Generic;

namespace SubletUC.Objects
{
    public class PostListingDto
    {
        public string? ListingType { get; set; }
        public string? Address { get; set; }
        public string? AddressLine2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public string? Country { get; set; }
        public decimal Rent { get; set; }
        public DateTime? StartAvailability { get; set; }
        public DateTime? EndAvailability { get; set; }
        public string? SemesterAvailability { get; set; }
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public string? Description { get; set; }
        public bool WaterIncludedInRent { get; set; }
        public bool GasIncludedInRent { get; set; }
        public bool InternetIncludedInRent { get; set; }
        public bool TrashIncludedInRent { get; set; }
        public bool ElectricIncludedInRent { get; set; }
        public decimal AverageUtilitiesCost { get; set; }
        public bool? SharedRoom { get; set; }
        public int? SharedRoommates { get; set; }
        public bool? Furnished { get; set; }
        public int? AnimalsAllowed { get; set; }
        public int? WasherDryer { get; set; }
        public int? Parking { get; set; }
        public decimal DistanceFromCampus { get; set; }
        // Photos as array of base64 strings (optional)
        public string[]? Photos { get; set; }
        public int? RoommateNumber { get; set; }
        public string? PreferredGender { get; set; }
        public string? ContactMethod { get; set; }
        public string? Contact { get; set; }
        public string? ContactName { get; set; }
        public int? OwnerId { get; set; }
    }
}