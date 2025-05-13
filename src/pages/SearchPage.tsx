import React, { useState, useEffect } from 'react';
import { searchVideos } from '../api/youtube';
import VideoCard from '../components/VideoCard';
import SearchBar from '../components/SearchBar';
import { Video } from '../types';

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    try {
      const results = await searchVideos(query);
      setSearchResults(results);
      
      // Update search history
      if (query && !searchHistory.includes(query)) {
        const updatedHistory = [query, ...searchHistory].slice(0, 5);
        setSearchHistory(updatedHistory);
      }
    } catch (error) {
      console.error('Error searching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryClick = (query: string) => {
    handleSearch(query);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {!searchQuery && searchHistory.length > 0 && (
        <div className="mb-8">
          <h3 className="text-white text-lg font-medium mb-3">Recent Searches</h3>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((query, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(query)}
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm transition-colors"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {searchQuery && (
        <div>
          <h2 className="text-white text-xl font-bold mb-4">
            {isLoading ? 'Searching...' : `Results for "${searchQuery}"`}
          </h2>
          
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
            <>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {searchResults.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">No results found for "{searchQuery}"</p>
                  <p className="text-gray-500 text-sm mt-2">Try different keywords or check your spelling</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {!searchQuery && (
        <div className="text-center py-16">
          <h2 className="text-white text-xl font-bold mb-2">Search for your favorite music</h2>
          <p className="text-gray-400 mb-8">Find songs, artists, or albums</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;