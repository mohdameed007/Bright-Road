import React, { useState } from 'react';
import { Gauge, Fuel, Settings, CalendarCheck, Search, Filter } from 'lucide-react';
import { CARS } from '../constants';

const carTypes = ['All', ...Array.from(new Set(CARS.map(c => c.type)))];

const Cars: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState('All');

  const handleRent = (carName: string) => {
    alert(`Reservation request for ${carName} initiated! We will contact you shortly.`);
  };

  const filteredCars = CARS.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeType === 'All' ? true : car.type === activeType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-emerald-800">Drive Your Adventure</h2>
        
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search cars..."
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
        {carTypes.map(type => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeType === type
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-emerald-50'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      
      {filteredCars.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
           <p className="text-lg">No vehicles found matching your criteria.</p>
           <button 
             onClick={() => {setSearchTerm(''); setActiveType('All');}}
             className="mt-2 text-emerald-600 font-medium hover:underline"
           >
             Clear filters
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full animate-fade-in">
              <div className="p-6 pb-0">
                 <h3 className="text-2xl font-bold text-gray-800">{car.name}</h3>
                 <p className="text-gray-500 text-sm mb-4">{car.type}</p>
              </div>
              
              <div className="h-56 w-full flex-shrink-0 flex items-center justify-center bg-gray-100">
                 <img 
                  src={car.imageUrl} 
                  alt={car.name} 
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                     <div className="flex flex-col">
                       <span className="text-3xl font-bold text-emerald-600">${car.pricePerDay}</span>
                       <span className="text-xs text-gray-400">per day</span>
                     </div>
                     <button 
                        onClick={() => handleRent(car.name)}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold shadow-md transform active:scale-95 transition-all flex items-center gap-2"
                     >
                        <CalendarCheck size={18} /> Rent
                     </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t pt-4">
                     <div className="flex flex-col items-center justify-center p-2">
                        <Gauge size={20} className="text-gray-400 mb-1" />
                        <span className="text-[10px] text-gray-500 font-medium">Unlimited</span>
                     </div>
                     <div className="flex flex-col items-center justify-center p-2 border-l border-gray-100">
                        <Settings size={20} className="text-gray-400 mb-1" />
                        <span className="text-[10px] text-gray-500 font-medium">Automatic</span>
                     </div>
                     <div className="flex flex-col items-center justify-center p-2 border-l border-gray-100">
                        <Fuel size={20} className="text-gray-400 mb-1" />
                        <span className="text-[10px] text-gray-500 font-medium">Petrol</span>
                     </div>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                   {car.features.map((f, i) => (
                      <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-sm border border-gray-200">
                        {f}
                      </span>
                   ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cars;