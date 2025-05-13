import React from 'react';
import { Play, Plus, Heart } from 'lucide-react';
import { Video } from '../types';
import { usePlayer } from '../context/PlayerContext';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { playTrack, addToQueue, toggleFavorite, state } = usePlayer();
  const isFavorite = state.favorites.some(item => item.id === video.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="group bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-700 hover:scale-[1.02]">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button 
            onClick={() => playTrack(video)} 
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 mr-2 transform hover:scale-110 transition-all duration-300"
          >
            <Play size={18} />
          </button>
          <button 
            onClick={() => addToQueue(video)} 
            className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 mr-2 transform hover:scale-110 transition-all duration-300"
          >
            <Plus size={18} />
          </button>
          <button 
            onClick={() => toggleFavorite(video)} 
            className={`${isFavorite ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-800 hover:bg-gray-700'} text-white rounded-full p-3 transform hover:scale-110 transition-all duration-300`}
          >
            <Heart size={18} fill={isFavorite ? 'white' : 'none'} />
          </button>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-white font-medium line-clamp-2 mb-1 text-sm">{video.title}</h3>
        <p className="text-gray-400 text-xs">{video.channelTitle}</p>
        <p className="text-gray-500 text-xs mt-1">{formatDate(video.publishedAt)}</p>
      </div>
    </div>
  );
};

export default VideoCard;