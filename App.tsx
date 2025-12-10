import React, { useState } from 'react';
import { Home, Map, Hotel, Car, MessageCircle, Menu, X } from 'lucide-react';
import { AppView } from './types';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Hotels from './components/Hotels';
import Cars from './components/Cars';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Hero onChangeView={setCurrentView} />;
      case AppView.DESTINATIONS:
        return <Destinations />;
      case AppView.HOTELS:
        return <Hotels />;
      case AppView.CARS:
        return <Cars />;
      case AppView.CHAT:
        return <ChatInterface />;
      default:
        return <Hero onChangeView={setCurrentView} />;
    }
  };

  const NavLink = ({ view, icon: Icon, label }: { view: AppView; icon: any; label: string }) => (
    <button
      onClick={() => handleNavClick(view)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
        currentView === view 
          ? 'bg-emerald-100 text-emerald-700 font-bold' 
          : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => handleNavClick(AppView.HOME)}
          >
            <img 
              src="https://i.imgur.com/IzaOxlI.png" 
              alt="Bright Road Logo" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
            />
            <span className="text-xl font-bold text-gray-800 tracking-tight">Bright Road</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink view={AppView.HOME} icon={Home} label="Home" />
            <NavLink view={AppView.DESTINATIONS} icon={Map} label="Destinations" />
            <NavLink view={AppView.HOTELS} icon={Hotel} label="Hotels" />
            <NavLink view={AppView.CARS} icon={Car} label="Rentals" />
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <button
               onClick={() => handleNavClick(AppView.CHAT)}
               className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all shadow-md transform hover:scale-105 active:scale-95 ${
                currentView === AppView.CHAT
                  ? 'bg-red-600 text-white font-bold'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
               }`}
            >
              <MessageCircle size={18} />
              AI Assistant
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-lg p-4 flex flex-col gap-2">
            <button onClick={() => handleNavClick(AppView.HOME)} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-gray-700">
              <Home size={20} /> Home
            </button>
            <button onClick={() => handleNavClick(AppView.DESTINATIONS)} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-gray-700">
              <Map size={20} /> Destinations
            </button>
            <button onClick={() => handleNavClick(AppView.HOTELS)} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-gray-700">
              <Hotel size={20} /> Hotels
            </button>
            <button onClick={() => handleNavClick(AppView.CARS)} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-gray-700">
              <Car size={20} /> Car Rentals
            </button>
            <button onClick={() => handleNavClick(AppView.CHAT)} className="flex items-center gap-3 p-3 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-100 mt-2">
              <MessageCircle size={20} /> AI Assistant
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto md:px-4 md:py-6">
        {renderView()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img 
              src="https://i.imgur.com/IzaOxlI.png" 
              alt="Bright Road Logo" 
              className="w-8 h-8 rounded-full object-cover border border-gray-600"
            />
            <span className="text-white font-bold">Bright Road</span>
          </div>
          <p className="text-sm text-center md:text-right">© 2024 Bright Road Tourism. Explore Oman with us.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;