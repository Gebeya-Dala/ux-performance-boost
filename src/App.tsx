import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { PropertyGrid } from './components/PropertyGrid';
import { MortgageCalculator } from './components/MortgageCalculator';
import { Footer } from './components/Footer';
import { CarouselItem, Property } from './types';
import { Toaster } from 'sonner';

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bccf7319-e171-4304-b674-35d414f9c49c/hero-carousel-1-dfaec8a6-1772022636906.webp',
    title: 'Modern Luxury Penthouse',
    subtitle: 'Experience unparalleled city living with breathtaking sunset views.',
    link: '#',
  },
  {
    id: 2,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bccf7319-e171-4304-b674-35d414f9c49c/hero-carousel-2-c6e63498-1772022636584.webp',
    title: 'Contemporary Family Home',
    subtitle: 'Bright daylight and beautiful gardens for the perfect family life.',
    link: '#',
  },
  {
    id: 3,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bccf7319-e171-4304-b674-35d414f9c49c/hero-carousel-3-2d555af0-1772022638497.webp',
    title: 'Minimalist Coastal Villa',
    subtitle: 'A serene atmosphere overlooking the deep blue ocean.',
    link: '#',
  },
];

const properties: Property[] = [
  {
    id: '1',
    title: 'The Sky Loft',
    price: 3200000,
    location: 'Manhattan, New York',
    beds: 3,
    baths: 2,
    sqft: 2400,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bccf7319-e171-4304-b674-35d414f9c49c/hero-carousel-1-dfaec8a6-1772022636906.webp',
    type: 'Penthouse',
    status: 'For Sale',
  },
  {
    id: '2',
    title: 'Azure Coast Villa',
    price: 5500000,
    location: 'Malibu, California',
    beds: 5,
    baths: 4.5,
    sqft: 5200,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bccf7319-e171-4304-b674-35d414f9c49c/hero-carousel-3-2d555af0-1772022638497.webp',
    type: 'Villa',
    status: 'For Sale',
  },
  {
    id: '3',
    title: 'Mountain Retreat',
    price: 1800000,
    location: 'Aspen, Colorado',
    beds: 4,
    baths: 3,
    sqft: 3100,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bccf7319-e171-4304-b674-35d414f9c49c/residential-property-2-cd2a39c4-1772022640271.webp',
    type: 'Cabin',
    status: 'For Sale',
  },
  {
    id: '4',
    title: 'The Glass Office',
    price: 12000000,
    location: 'Chicago, Illinois',
    beds: 0,
    baths: 12,
    sqft: 15000,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bccf7319-e171-4304-b674-35d414f9c49c/commercial-property-1-649d94d5-1772022637858.webp',
    type: 'Commercial',
    status: 'For Sale',
  },
  {
    id: '5',
    title: 'Garden Estates',
    price: 4500,
    location: 'Austin, Texas',
    beds: 4,
    baths: 3,
    sqft: 2800,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bccf7319-e171-4304-b674-35d414f9c49c/hero-carousel-2-c6e63498-1772022636584.webp',
    type: 'Residential',
    status: 'For Rent',
  },
  {
    id: '6',
    title: 'Modern Culinary Studio',
    price: 2500000,
    location: 'San Francisco, CA',
    beds: 2,
    baths: 2,
    sqft: 1800,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bccf7319-e171-4304-b674-35d414f9c49c/interior-detail-1-b61215a6-1772022646087.webp',
    type: 'Residential',
    status: 'For Sale',
  },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" richColors />
      <Navbar />
      <HeroCarousel items={carouselItems} />
      <main>
        <PropertyGrid properties={properties} />
        <MortgageCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default App;