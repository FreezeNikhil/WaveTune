import React from 'react';
import VideoCard from '../components/VideoCard';
import { usePlayer } from '../context/PlayerContext';
import { Heart } from 'lucide-react';

const FavoritesPage: React.FC = () => {
  const { state } = usePlayer();
  const { favorites } = state;

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Heart className="text-pink-500 mr-3" size={28} />
        <h1 className="text-white text-2xl font-bold">Your Favorites</h1>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {favorites.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-800 bg-opacity-30 rounded-xl">
          <Heart className="mx-auto text-gray-600 mb-4" size={64} />
          <h2 className="text-white text-xl font-bold mb-2">No favorites yet</h2>
          <p className="text-gray-400 mb-6">Start adding songs you love to your favorites</p>
          <a 
            href="/" 
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-colors"
          >
            Discover Music
          </a>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;