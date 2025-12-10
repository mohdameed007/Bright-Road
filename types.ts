export enum AppView {
  HOME = 'HOME',
  DESTINATIONS = 'DESTINATIONS',
  HOTELS = 'HOTELS',
  CARS = 'CARS',
  CHAT = 'CHAT'
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  highlights: string[];
}

export interface Hotel {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  imageUrl: string;
  amenities: string[];
}

export interface Car {
  id: string;
  name: string;
  type: string;
  pricePerDay: number;
  imageUrl: string;
  features: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}