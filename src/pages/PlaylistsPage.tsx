import React, { useState } from 'react';
import { ListMusic, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data - in a real app, this would come from a database or API
const mockPlaylists = [
  { id: '1', name: 'My Favorite Songs', trackCount: 12, thumbnailUrl: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg' },
  { id: '2', name: 'Workout Mix', trackCount: 8, thumbnailUrl: 'https://images.pexels.com/photos/1103965/pexels-photo-1103965.jpeg' },
  { id: '3', name: 'Chill Vibes', trackCount: 15, thumbnailUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg' },
];

const PlaylistsPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  
  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save this to a database
    console.log('Creating playlist:', newPlaylistName);
    setNewPlaylistName('');
    setShowCreateModal(false);
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ListMusic className="text-green-500 mr-3" size={28} />
          <h1 className="text-white text-2xl font-bold">Your Playlists</h1>
        </div>
        
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors"
        >
          <PlusCircle size={18} className="mr-2" />
          <span>Create Playlist</span>
        </button>
      </div>

      {mockPlaylists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mockPlaylists.map((playlist) => (
            <Link 
              key={playlist.id} 
              to={`/playlist/${playlist.id}`}
              className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-700 hover:scale-[1.02]"
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={playlist.thumbnailUrl} 
                  alt={playlist.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold truncate">{playlist.name}</h3>
                  <p className="text-gray-300 text-sm">{playlist.trackCount} tracks</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-800 bg-opacity-30 rounded-xl">
          <ListMusic className="mx-auto text-gray-600 mb-4" size={64} />
          <h2 className="text-white text-xl font-bold mb-2">No playlists yet</h2>
          <p className="text-gray-400 mb-6">Create your first playlist to organize your music</p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-colors"
          >
            Create Playlist
          </button>
        </div>
      )}
      
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg w-full max-w-md p-6 animate-fade-in">
            <h2 className="text-white text-xl font-bold mb-4">Create New Playlist</h2>
            <form onSubmit={handleCreatePlaylist}>
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Playlist name"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newPlaylistName.trim()}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    newPlaylistName.trim()
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistsPage;