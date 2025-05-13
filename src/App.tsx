import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import MobileNav from './components/MobileNav';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';
import HistoryPage from './pages/HistoryPage';
import PlaylistsPage from './pages/PlaylistsPage';

function App() {
  return (
    <PlayerProvider>
      <Router>
        <div className="flex bg-gray-900 text-white min-h-screen">
          <Sidebar />
          <div className="flex-1 md:ml-60">
            <MobileNav />
            <main className="pb-32 md:pb-20">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/playlists" element={<PlaylistsPage />} />
                {/* Add other routes as needed */}
              </Routes>
            </main>
          </div>
          <MusicPlayer />
        </div>
      </Router>
    </PlayerProvider>
  );
}

export default App;