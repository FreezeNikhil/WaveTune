import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { PlayerState, Video } from '../types';

type PlayerAction = 
  | { type: 'SET_TRACK'; payload: Video }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'ADD_TO_QUEUE'; payload: Video }
  | { type: 'REMOVE_FROM_QUEUE'; payload: string }
  | { type: 'ADD_TO_HISTORY'; payload: Video }
  | { type: 'TOGGLE_FAVORITE'; payload: Video }
  | { type: 'NEXT_TRACK' }
  | { type: 'PREVIOUS_TRACK' }
  | { type: 'CLEAR_QUEUE' };

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  queue: [],
  history: [],
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const playerReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
  switch (action.type) {
    case 'SET_TRACK':
      return {
        ...state,
        currentTrack: action.payload,
        isPlaying: true,
        history: [action.payload, ...state.history.filter(item => item.id !== action.payload.id)].slice(0, 50)
      };
    case 'PLAY':
      return { ...state, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'ADD_TO_QUEUE':
      return { 
        ...state, 
        queue: [...state.queue, action.payload] 
      };
    case 'REMOVE_FROM_QUEUE':
      return { 
        ...state, 
        queue: state.queue.filter(item => item.id !== action.payload) 
      };
    case 'ADD_TO_HISTORY':
      return { 
        ...state, 
        history: [action.payload, ...state.history.filter(item => item.id !== action.payload.id)].slice(0, 50) 
      };
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.some(item => item.id === action.payload.id);
      const updatedFavorites = isFavorite
        ? state.favorites.filter(item => item.id !== action.payload.id)
        : [...state.favorites, action.payload];
      return { ...state, favorites: updatedFavorites };
    case 'NEXT_TRACK':
      if (state.queue.length === 0) return state;
      const nextTrack = state.queue[0];
      return {
        ...state,
        currentTrack: nextTrack,
        isPlaying: true,
        queue: state.queue.slice(1),
        history: [nextTrack, ...state.history].slice(0, 50)
      };
    case 'PREVIOUS_TRACK':
      if (state.history.length <= 1) return state;
      const prevTrack = state.history[1];
      return {
        ...state,
        currentTrack: prevTrack,
        isPlaying: true,
        history: state.history.slice(1)
      };
    case 'CLEAR_QUEUE':
      return { ...state, queue: [] };
    default:
      return state;
  }
};

interface PlayerContextType {
  state: PlayerState;
  playTrack: (video: Video) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  addToQueue: (video: Video) => void;
  removeFromQueue: (id: string) => void;
  toggleFavorite: (video: Video) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  clearQueue: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  const playTrack = (video: Video) => {
    dispatch({ type: 'SET_TRACK', payload: video });
  };

  const togglePlay = () => {
    if (state.isPlaying) {
      dispatch({ type: 'PAUSE' });
    } else {
      dispatch({ type: 'PLAY' });
    }
  };

  const setVolume = (volume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
  };

  const addToQueue = (video: Video) => {
    dispatch({ type: 'ADD_TO_QUEUE', payload: video });
  };

  const removeFromQueue = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_QUEUE', payload: id });
  };

  const toggleFavorite = (video: Video) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: video });
  };

  const nextTrack = () => {
    dispatch({ type: 'NEXT_TRACK' });
  };

  const previousTrack = () => {
    dispatch({ type: 'PREVIOUS_TRACK' });
  };

  const clearQueue = () => {
    dispatch({ type: 'CLEAR_QUEUE' });
  };

  return (
    <PlayerContext.Provider
      value={{
        state,
        playTrack,
        togglePlay,
        setVolume,
        addToQueue,
        removeFromQueue,
        toggleFavorite,
        nextTrack,
        previousTrack,
        clearQueue
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};