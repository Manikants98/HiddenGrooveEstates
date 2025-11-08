export interface Lot {
  id: string;
  lotNumber: string;
  size: number; // sq ft
  price: number; // USD
  available: boolean;
}

export interface PropertyImage {
  id: string;
  url: string;
  thumbnail: string;
  alt: string;
}

export interface PropertyDetails {
  id: string;
  title: string;
  subType: string;
  type: string;
  status: string;
  propertyTax: number;
  hoaFee: number;
  county: string;
  subdivision: string;
  schools: string[];
  utilities: string[];
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  yearBuilt?: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  lotSize?: number;
  features?: string[];
  amenities?: string[];
}

export interface PropertyListing {
  id: string;
  property: PropertyDetails;
  lots: Lot[];
  images: PropertyImage[];
}
