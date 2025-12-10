import React from 'react';
import { ArrowRight, Map, Hotel, Car, MessageCircle } from 'lucide-react';
import { AppView } from '../types';

interface HeroProps {
  onChangeView: (view: AppView) => void;
}

const Hero: React.FC<HeroProps> = ({ onChangeView }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] bg-emerald-50">
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <img 
          src="https://picsum.photos/seed/omanlandscape/1920/1080" 
          alt="Oman Landscape" 
          className="absolute inset-0 w-full h-full object-cover filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent flex flex-col justify-end p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Welcome to Bright Road</h1>
          <p className="text-lg md:text-xl max-w-2xl drop-shadow-sm mb-6">
            Discover the jewel of Arabia. Explore ancient forts, endless deserts, and pristine coastlines with your all-in-one travel companion.
          </p>
          <button 
            onClick={() => onChangeView(AppView.CHAT)}
            className="w-fit flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition-all shadow-lg transform hover:scale-105"
          >
            Plan My Trip with AI <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            onClick={() => onChangeView(AppView.DESTINATIONS)}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border-b-4 border-emerald-500 group"
          >
            <div className="bg-emerald-100 p-3 rounded-full w-fit mb-4 group-hover:bg-emerald-200 transition-colors">
              <Map className="text-emerald-700" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Explore Destinations</h3>
            <p className="text-gray-600 text-sm">Find hidden gems and popular tourist spots across the Sultanate.</p>
          </div>

          <div 
            onClick={() => onChangeView(AppView.HOTELS)}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border-b-4 border-emerald-500 group"
          >
            <div className="bg-emerald-100 p-3 rounded-full w-fit mb-4 group-hover:bg-emerald-200 transition-colors">
              <Hotel className="text-emerald-700" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Book Stays</h3>
            <p className="text-gray-600 text-sm">Luxury resorts, cozy desert camps, and city hotels at best rates.</p>
          </div>

          <div 
            onClick={() => onChangeView(AppView.CARS)}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border-b-4 border-emerald-500 group"
          >
            <div className="bg-emerald-100 p-3 rounded-full w-fit mb-4 group-hover:bg-emerald-200 transition-colors">
              <Car className="text-emerald-700" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Rent a Car</h3>
            <p className="text-gray-600 text-sm">Reliable 4x4s for wadi bashing or sedans for city cruising.</p>
          </div>

          <div 
            onClick={() => onChangeView(AppView.CHAT)}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border-b-4 border-emerald-500 group"
          >
            <div className="bg-emerald-100 p-3 rounded-full w-fit mb-4 group-hover:bg-emerald-200 transition-colors">
              <MessageCircle className="text-emerald-700" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">AI Assistant</h3>
            <p className="text-gray-600 text-sm">24/7 support for itineraries, questions, and booking guidance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;