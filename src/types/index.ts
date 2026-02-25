export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  type: 'Residential' | 'Commercial' | 'Cabin' | 'Villa' | 'Penthouse';
  status: 'For Sale' | 'For Rent';
}

export interface CarouselItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  link: string;
}