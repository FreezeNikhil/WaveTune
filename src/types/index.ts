export interface Video {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  publishedAt: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Video[];
  createdAt: string;
}

export interface PlayerState {
  currentTrack: Video | null;
  isPlaying: boolean;
  volume: number;
  queue: Video[];
  history: Video[];
  favorites: Video[];
}