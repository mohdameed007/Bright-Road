import React, { useState } from 'react';
import { Star, CheckCircle, CreditCard, Search, Filter } from 'lucide-react';
import { HOTELS } from '../constants';

const Hotels: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filters = ['All', 'Under $250', 'Luxury', 'Top Rated'];

  const handleBook = (hotelName: string) => {
    alert(`Booking request for ${hotelName} sent! Check your email for confirmation.`);
  };

  const filteredHotels = HOTELS.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (activeFilter === 'Under $250') matchesFilter = hotel.price < 250;
    else if (activeFilter === 'Luxury') matchesFilter = hotel.price >= 300;
    else if (activeFilter === 'Top Rated') matchesFilter = hotel.rating >= 4.8;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-emerald-800">Stay in Comfort</h2>
        
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search hotels or locations..."
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
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-emerald-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {filteredHotels.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
           <p className="text-lg">No hotels found matching your criteria.</p>
           <button 
             onClick={() => {setSearchTerm(''); setActiveFilter('All');}}
             className="mt-2 text-emerald-600 font-medium hover:underline"
           >
             Clear filters
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {filteredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-shadow animate-fade-in">
              <div className="w-full md:w-2/5 h-48 md:h-auto relative">
                <img 
                  src={hotel.imageUrl} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded flex items-center shadow-sm">
                  <Star size={12} className="mr-1 fill-yellow-900" /> {hotel.rating}
                </div>
              </div>
              
              <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded text-sm">${hotel.price}<span className="text-xs font-normal text-gray-500">/night</span></span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{hotel.location}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity, idx) => (
                      <span key={idx} className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                        <CheckCircle size={10} className="mr-1 text-emerald-500" /> {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={() => handleBook(hotel.name)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard size={18} /> Book Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hotels;