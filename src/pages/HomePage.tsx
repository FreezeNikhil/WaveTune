import React, { useState, useEffect } from 'react';
import { getPopularMusicVideos } from '../api/youtube';
import VideoCard from '../components/VideoCard';
import { Video } from '../types';
import { usePlayer } from '../context/PlayerContext';

const HomePage: React.FC = () => {
  const [trendingVideos, setTrendingVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = usePlayer();
  const { history } = state;

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      try {
        const videos = await getPopularMusicVideos();
        setTrendingVideos(videos);
      } catch (error) {
        console.error('Error fetching trending videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingVideos();
  }, []);

  return (
    <div className="p-6">
      {history.length > 0 && (
        <section className="mb-8">
          <h2 className="text-white text-xl font-bold mb-4">Recently Played</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {history.slice(0, 5).map((video) => (
              <VideoCard key={video.id + '-history'} video={video} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-white text-xl font-bold mb-4">Trending Music</h2>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-700 animate-pulse" />
                <div className="p-3">
                  <div className="h-4 bg-gray-700 rounded animate-pulse mb-2" />
                  <div className="h-3 bg-gray-700 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {trendingVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;