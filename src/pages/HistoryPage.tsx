import React from 'react';
import VideoCard from '../components/VideoCard';
import { usePlayer } from '../context/PlayerContext';
import { History, Trash2 } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const { state } = usePlayer();
  const { history } = state;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <History className="text-blue-500 mr-3" size={28} />
          <h1 className="text-white text-2xl font-bold">Recently Played</h1>
        </div>
        
        {history.length > 0 && (
          <button className="flex items-center text-gray-400 hover:text-white transition-colors text-sm">
            <Trash2 size={16} className="mr-1" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {history.map((video, index) => (
            <VideoCard key={`${video.id}-${index}`} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-800 bg-opacity-30 rounded-xl">
          <History className="mx-auto text-gray-600 mb-4" size={64} />
          <h2 className="text-white text-xl font-bold mb-2">No listening history</h2>
          <p className="text-gray-400 mb-6">Start playing some music to see your history</p>
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

export default HistoryPage;