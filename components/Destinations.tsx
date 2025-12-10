import React, { useState } from 'react';
import { MapPin, Info, X, Search, Filter } from 'lucide-react';
import { DESTINATIONS } from '../constants';
import { Destination } from '../types';

const allHighlights = Array.from(new Set(DESTINATIONS.flatMap(d => d.highlights)));

const Destinations: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  const filteredDestinations = DESTINATIONS.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dest.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHighlight = activeHighlight ? dest.highlights.includes(activeHighlight) : true;
    return matchesSearch && matchesHighlight;
  });

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-emerald-800">Discover Oman</h2>
        
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search places or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center text-gray-500 mr-2">
           <Filter size={18} />
        </div>
        <button
          onClick={() => setActiveHighlight(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            activeHighlight === null 
              ? 'bg-emerald-600 text-white shadow-md' 
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-emerald-50'
          }`}
        >
          All
        </button>
        {allHighlights.map(highlight => (
          <button
            key={highlight}
            onClick={() => setActiveHighlight(activeHighlight === highlight ? null : highlight)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeHighlight === highlight 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-emerald-50'
            }`}
          >
            {highlight}
          </button>
        ))}
      </div>
      
      {filteredDestinations.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
           <p className="text-lg">No destinations found matching your criteria.</p>
           <button 
             onClick={() => {setSearchTerm(''); setActiveHighlight(null);}}
             className="mt-2 text-emerald-600 font-medium hover:underline"
           >
             Clear filters
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow flex flex-col h-full animate-fade-in">
              <div className="relative h-48">
                <img 
                  src={dest.imageUrl} 
                  alt={dest.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-md text-xs font-bold text-emerald-800 shadow-sm flex items-center">
                  <MapPin size={12} className="mr-1" /> {dest.location}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{dest.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{dest.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {dest.highlights.map((highlight, idx) => (
                    <span key={idx} className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium">
                      {highlight}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => setSelectedDestination(dest)}
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Info size={18} /> View Details & Map
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Details/Map */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-fade-in-up">
            <button 
              onClick={() => setSelectedDestination(null)}
              className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors z-10"
            >
              <X size={24} />
            </button>
            
            <img 
              src={selectedDestination.imageUrl} 
              alt={selectedDestination.name} 
              className="w-full h-64 object-cover"
            />
            
            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedDestination.name}</h2>
              <div className="flex items-center text-emerald-600 mb-6">
                <MapPin size={20} className="mr-1" />
                <span className="font-medium">{selectedDestination.location}</span>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {selectedDestination.description}
              </p>

              <div className="bg-gray-100 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-gray-700">Interactive Map View</h4>
                  <span className="text-xs text-gray-500">Live coordinates unavailable in preview</span>
                </div>
                {/* Mock Map UI */}
                <div className="relative w-full h-48 bg-emerald-100 rounded-lg overflow-hidden border border-emerald-200 flex items-center justify-center group cursor-pointer">
                   <div className="absolute inset-0 opacity-40 bg-[url('https://picsum.photos/seed/maptexture/800/400')] bg-cover filter grayscale"></div>
                   <div className="relative z-10 flex flex-col items-center">
                     <MapPin size={40} className="text-red-600 drop-shadow-lg mb-2 animate-bounce" />
                     <span className="bg-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        {selectedDestination.location}
                     </span>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-emerald-50 p-4 rounded-lg text-center">
                    <span className="block text-2xl font-bold text-emerald-700 mb-1">4.8</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Visitor Rating</span>
                 </div>
                 <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <span className="block text-2xl font-bold text-orange-600 mb-1">High</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Popularity</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;