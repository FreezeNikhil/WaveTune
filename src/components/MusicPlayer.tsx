import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, ListMusic } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { Video } from '../types';

const MusicPlayer: React.FC = () => {
  const { 
    state, 
    togglePlay, 
    setVolume, 
    nextTrack, 
    previousTrack, 
    toggleFavorite 
  } = usePlayer();
  
  const { currentTrack, isPlaying, volume, favorites } = state;
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const previousVolume = useRef(volume);
  const audioRef = useRef<HTMLIFrameElement>(null);
  const intervalRef = useRef<number | null>(null);

  const isFavorite = currentTrack 
    ? favorites.some((item: Video) => item.id === currentTrack.id)
    : false;

  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setProgress(prev => (prev + 1) % 100);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume.current);
    } else {
      previousVolume.current = volume;
      setVolume(0);
    }
    setIsMuted(!isMuted);
  };

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900 bg-opacity-90 backdrop-blur-md border-t border-gray-800 hidden sm:flex items-center justify-center text-gray-400 text-sm">
        <p>No track selected</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 backdrop-blur-md border-t border-gray-800 z-10">
      <div className="relative h-1 w-full bg-gray-700">
        <div 
          className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex flex-col md:flex-row items-center px-4 py-3">
        <div className="flex items-center w-full md:w-1/3">
          <img 
            src={currentTrack.thumbnailUrl} 
            alt={currentTrack.title}
            className="h-10 w-10 rounded object-cover mr-3"
          />
          <div className="truncate">
            <p className="text-white text-sm font-medium truncate">{currentTrack.title}</p>
            <p className="text-gray-400 text-xs truncate">{currentTrack.channelTitle}</p>
          </div>
        </div>

        <div className="flex flex-col items-center w-full md:w-1/3 my-3 md:my-0">
          <div className="flex items-center space-x-6">
            <button 
              onClick={previousTrack}
              className="text-gray-400 hover:text-white transition"
            >
              <SkipBack size={20} />
            </button>
            <button 
              onClick={togglePlay}
              className="bg-white rounded-full p-2 text-black hover:bg-gray-200 transition"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button 
              onClick={nextTrack}
              className="text-gray-400 hover:text-white transition"
            >
              <SkipForward size={20} />
            </button>
          </div>
          <div className="flex items-center space-x-2 mt-2 text-xs text-gray-400">
            <span>{formatTime(progress * duration / 100)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-end w-full md:w-1/3 space-x-4">
          <button 
            onClick={() => toggleFavorite(currentTrack)}
            className={`hover:scale-110 transition ${isFavorite ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
          >
            <Heart size={20} fill={isFavorite ? '#ec4899' : 'none'} />
          </button>
          <button 
            onClick={() => setShowQueue(!showQueue)}
            className="text-gray-400 hover:text-white hover:scale-110 transition"
          >
            <ListMusic size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white transition">
              {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Hidden YouTube iframe for audio */}
      <div className="hidden">
        <iframe
          ref={audioRef}
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${currentTrack.id}?autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`}
          title="YouTube Music Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
    </div>
  );
};

export default MusicPlayer;