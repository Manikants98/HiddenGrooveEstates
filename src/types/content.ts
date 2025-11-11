export interface SliderConfig {
  images: string[];
  autoAdvanceInterval: number;
}

export interface Lot {
  id: string;
  lotNumber: string;
  size: number;
  price: number;
  available: boolean;
  propertyDetail?: PropertyDetails;
}

export interface PropertyDetails {
  subType: string;
  type: string;
  status: string;
  propertyTax: number;
  hoaFee: number;
  county: string;
  subdivision: string;
  livingArea?: string;
  fencing?: string;
  utilities?: string;
  sewer?: string;
  irrigation?: string;
  hoaAmenities?: string;
  communityFeatures?: string;
  elementarySchool?: string;
  highSchool?: string;
  middleSchoolDistrict?: string;
  elementarySchoolDistrict?: string;
  middleSchool?: string;
  highSchoolDistrict?: string;
  apn?: string;
  roadFrontage?: string;
  roadSurface?: string;
  possibleUse?: string;
  topography?: string;
  hoa?: string;
}

export interface GoldenBox {
  title: string;
  subtitle: string;
  description: string;
}

export interface RequestTourContent {
  title: string;
  description: string;
  submitButtonText: string;
}

export interface CustomHomeBuilderContent {
  title: string;
  paragraph1: string;
  paragraph2: string;
  formPlaceholders: {
    fullName: string;
    email: string;
    phone: string;
    message: string;
  };
  submitButtonText: string;
}

export interface HomeContent {
  slider: SliderConfig;
  lots: Lot[];
  property: PropertyDetails;
  goldenBox: GoldenBox;
  streetImage: string;
  lotLayoutImage: string;
  aerialViewImage: string;
  requestTour: RequestTourContent;
  customHomeBuilder: CustomHomeBuilderContent;
}

export interface AboutUsContent {
  title: string;
  subtitle: string;
  profileImage: string;
  name: string;
  tagline: string;
  history: {
    title: string;
    paragraphs: string[];
  };
}

export interface OfficeInfo {
  address: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  emailSales: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
}

export interface ContactUsContent {
  title: string;
  highlightedTitle: string;
  description: string;
  features: string[];
  office: OfficeInfo;
}

export interface HeaderContent {
  logo: string;
  tagline: {
    line1: string;
    line2: string;
    line3: string;
  };
}

export interface FooterContent {
  copyright: string;
  links: {
    privacy: string;
    terms: string;
    contact: string;
  };
}

export interface WebsiteContent {
  home: HomeContent;
  aboutUs: AboutUsContent;
  contactUs: ContactUsContent;
  header: HeaderContent;
  footer: FooterContent;
}
