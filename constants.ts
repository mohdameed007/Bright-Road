import { Destination, Hotel, Car } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Sultan Qaboos Grand Mosque',
    description: 'A masterpiece of modern Islamic architecture, featuring one of the world\'s largest handmade Persian rugs and a massive Swarovski crystal chandelier.',
    location: 'Muscat',
    imageUrl: 'https://res.cloudinary.com/take-memories/images/f_auto,dpr_auto,q_auto,w_2000,c_fill,h_1200/cc/hnzgwns1jq6gnhmszgdn/sultan-qaboos-grand-mosque-oman',
    highlights: ['Architecture', 'Culture', 'History']
  },
  {
    id: '2',
    name: 'Wadi Shab',
    description: 'A breathtaking canyon with emerald green water pools, caves, and waterfalls. A hiking paradise for adventure seekers.',
    location: 'Tiwi',
    imageUrl: 'https://solopassport.com/wp-content/uploads/2023/04/Wadi-Shab.jpeg',
    highlights: ['Nature', 'Hiking', 'Swimming']
  },
  {
    id: '3',
    name: 'Wahiba Sands',
    description: 'Experience the magic of the desert with endless rolling red dunes. Perfect for dune bashing, camel rides, and stargazing.',
    location: 'Sharqiya',
    imageUrl: 'https://www.barcelo.com/guia-turismo/wp-content/uploads/2024/06/wahiba-sands-2.jpg',
    highlights: ['Desert', 'Adventure', 'Camping']
  },
  {
    id: '4',
    name: 'Jebel Shams',
    description: 'Known as the "Mountain of Sun", it is the highest mountain in Oman, offering spectacular views of the "Grand Canyon of Arabia".',
    location: 'Al Hamra',
    imageUrl: 'https://halaarabia.com/wp-content/uploads/2024/02/Jebel-Shams-1-1.webp',
    highlights: ['Mountains', 'Views', 'Hiking']
  },
  {
    id: '5',
    name: 'Salalah',
    description: 'A tropical paradise famous for its Khareef (monsoon) season, transforming the landscape into a lush green haven.',
    location: 'Dhofar',
    imageUrl: 'https://www.gokitetours.com/wp-content/uploads/2025/02/Top-10-Amazing-Places-to-Visit-in-Salalah-Oman.webp',
    highlights: ['Nature', 'Beaches', 'Monsoon']
  }
];

export const HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Al Bustan Palace',
    price: 350,
    rating: 5.0,
    location: 'Muscat',
    imageUrl: 'https://i.pinimg.com/736x/7c/be/b2/7cbeb2f7a92742b10c0e0c1f029d3bfc.jpg',
    amenities: ['Private Beach', 'Spa', 'Fine Dining']
  },
  {
    id: '2',
    name: 'Anantara Al Jabal Al Akhdar',
    price: 450,
    rating: 4.9,
    location: 'Nizwa',
    imageUrl: 'https://omanmagazine.com/wp-content/uploads/2021/02/Anantara-Al-Jabal-Al-Akhdar-Resort-The-Royal-Edge_Dining-by-Design-1920x1080.jpg',
    amenities: ['Mountain View', 'Infinity Pool', 'Luxury']
  },
  {
    id: '3',
    name: 'Desert Nights Camp',
    price: 200,
    rating: 4.7,
    location: 'Wahiba Sands',
    imageUrl: 'https://cdn.mahlatini.com/_1200x630_crop_center-center_82_none/Desert-Nights-Camp.jpg?mtime=1719933297',
    amenities: ['Desert Experience', 'Camel Rides', 'Bedouin Style']
  },
  {
    id: '4',
    name: 'Salalah Rotana Resort',
    price: 180,
    rating: 4.5,
    location: 'Salalah',
    imageUrl: 'https://images.trvl-media.com/lodging/7000000/6980000/6974300/6974251/b4677d81.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill',
    amenities: ['Beachfront', 'Family Friendly', 'Pools']
  }
];

export const CARS: Car[] = [
  {
    id: '1',
    name: 'Toyota Land Cruiser',
    type: '4x4 SUV',
    pricePerDay: 80,
    // White Land Cruiser LC300
    imageUrl: 'https://dhihk6wcjzylk.cloudfront.net/carprices/media/catalog/682ee6c3b1893Toyota_Land_Cruiser_front.webp',
    features: ['Off-road capable', '7 Seats', 'GPS']
  },
  {
    id: '2',
    name: 'Nissan Patrol',
    type: 'Luxury SUV',
    pricePerDay: 95,
    // Black Nissan Patrol
    imageUrl: 'https://friendscarrental.com/frontend/image/nissan-patrol-se-2025-1735114313808.jpg',
    features: ['Luxury Interior', 'V8 Engine', 'All-terrain']
  },
  {
    id: '3',
    name: 'Hyundai Tucson',
    type: 'Crossover',
    pricePerDay: 45,
    // Blue Hyundai Tucson
    imageUrl: 'https://www.topgear.com/sites/default/files/2024/12/hyundai-tucson-ultimate-17.jpg',
    features: ['Economic', 'Compact', 'City Friendly']
  },
  {
    id: '4',
    name: 'Mercedes-Benz SLK 350',
    type: 'Convertible',
    pricePerDay: 130,
    // Grey SLK 350
    imageUrl: 'https://media.evo.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1556259046/evo/images/dir_558/car_photo_279261.jpg',
    features: ['Sport', 'Convertible', 'Luxury']
  }
];