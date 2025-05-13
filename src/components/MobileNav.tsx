import React, { useState } from 'react';
import { Home, Search, ListMusic, Heart, History, Menu, X, Disc } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/search', icon: <Search size={20} />, label: 'Search' },
    { path: '/playlists', icon: <ListMusic size={20} />, label: 'Playlists' },
    { path: '/favorites', icon: <Heart size={20} />, label: 'Favorites' },
    { path: '/history', icon: <History size={20} />, label: 'History' },
  ];
  
  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center">
          <Disc className="text-purple-500 mr-2" size={24} />
          <h1 className="text-white text-lg font-bold">WaveTune</h1>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-900 pt-16">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 py-3 rounded-lg transition-colors ${
                  isActive(item.path) 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-800 mt-4">
              <p className="text-gray-500 uppercase text-xs font-medium mb-2 px-3">Your Playlists</p>
              <Link 
                to="/playlist/1" 
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <span>My Favorite Songs</span>
              </Link>
              <Link 
                to="/playlist/2"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <span>Workout Mix</span>
              </Link>
              <Link 
                to="/playlist/3"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <span>Chill Vibes</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
      
      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 bg-gray-900 border-t border-gray-800 z-10">
        <div className="grid grid-cols-5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-3 ${
                isActive(item.path) 
                  ? 'text-purple-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileNav;