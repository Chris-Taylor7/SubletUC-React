export enum ListingType {
  Apartment = 'Apartment',
  House = 'House',
  Duplex = 'Duplex',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  NonBinary = 'NonBinary',
  Other = 'Other',
}

export interface User {
  userId: number;
  fullName?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Should not expose in frontend typically, but keeping for object parity
  isActive: boolean;
  profilePicture?: string; // base64 or url
  gender?: Gender;
  bookmarkedListingIds: number[];
  createdListingIds: number[];
}

export interface Listing {
  listingId: number;
  listingType: ListingType;
  address?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  rent: number;
  startAvailability?: string; // ISO Date
  endAvailability?: string; // ISO Date
  semesterAvailability?: string;
  bedrooms: number;
  bathrooms: number;
  description?: string;
  
  // Utilities
  waterIncludedInRent: boolean;
  gasIncludedInRent: boolean;
  internetIncludedInRent: boolean;
  trashIncludedInRent: boolean;
  electricIncludedInRent: boolean;
  averageUtilitiesCost: number;

  sharedRoom?: boolean;
  sharedRoommates?: number;
  furnished?: boolean;
  animalsAllowed?: number; // 0=Pet Friendly, 1=Cats, 2=Dogs, 3=Other, 4=No Pets
  washerDryer?: number; // 0=None, 1=In Unit, 2=Shared
  parking?: number; // 0=Street, 1=Driveway, 2=Garage, 3=Lot
  distanceFromCampus: number;

  photos?: string[]; // Array of URLs or Base64
  roommateNumber?: number;
  preferredGender?: Gender;
  contactMethod?: string;
  contact?: string;
  contactName?: string;
  
  ownerId?: number;
  bookmarkedByIds?: number[];

  // Helper text
  animalsAllowedText?: string;
  washerDryerText?: string;
  parkingText?: string;
}

// Helper functions for display text
export const getAnimalsAllowedText = (code?: number): string => {
  if (code === undefined) return "Unknown";
  switch (code) {
      case 0: return "Pet Friendly";
      case 1: return "Cats Only";
      case 2: return "Dogs Only";
      case 3: return "Other";
      case 4: return "No Pets";
      default: return "Unknown";
  }
};

export const getWasherDryerText = (code?: number): string => {
  if (code === undefined) return "Unknown";
  switch (code) {
      case 0: return "None";
      case 1: return "In Unit";
      case 2: return "Shared";
      default: return "Unknown";
  }
};

export const getParkingText = (code?: number): string => {
  if (code === undefined) return "Unknown";
  switch (code) {
      case 0: return "Street Parking";
      case 1: return "Driveway";
      case 2: return "Garage";
      case 3: return "Lot";
      default: return "Unknown";
  }
};