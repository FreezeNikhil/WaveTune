import React from 'react';
import { Home, Search, ListMusic, Heart, History, Disc, PlusCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
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
    <aside className="hidden md:flex flex-col bg-gray-900 w-60 p-5 h-screen sticky top-0 overflow-y-auto">
      <div className="flex items-center mb-8">
        <Disc className="text-purple-500 mr-2" size={28} />
        <h1 className="text-white text-xl font-bold">WaveTune</h1>
      </div>
      
      <nav className="space-y-2">
        <p className="text-gray-500 uppercase text-xs font-medium mb-2 mt-6">Menu</p>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              isActive(item.path) 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="mt-8">
        <p className="text-gray-500 uppercase text-xs font-medium mb-2">Your Playlists</p>
        <button className="flex items-center text-gray-400 hover:text-white w-full px-3 py-2 rounded-lg transition-colors hover:bg-gray-800">
          <PlusCircle size={20} />
          <span className="ml-3">Create Playlist</span>
        </button>
        
        <div className="mt-4 space-y-1">
          {/* Example playlists - these would be dynamic in the actual app */}
          <Link to="/playlist/1" className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <span className="truncate">My Favorite Songs</span>
          </Link>
          <Link to="/playlist/2" className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <span className="truncate">Workout Mix</span>
          </Link>
          <Link to="/playlist/3" className="flex items-center px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <span className="truncate">Chill Vibes</span>
          </Link>
        </div>
      </div>
      
      <div className="mt-auto pt-6 border-t border-gray-800">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-white mb-2">Enjoy ad-free music</p>
          <p className="text-xs text-gray-400 mb-3">Get WaveTune Premium</p>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md text-sm font-medium transition-colors">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;