import { Video } from '../types';

const API_KEY = 'AIzaSyAtbLHWb0BYTX_HcYyPiVGgWfQcL_0PQjA';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const searchVideos = async (query: string): Promise<Video[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&maxResults=20&q=${encodeURIComponent(
        query
      )}&type=video&videoCategoryId=10&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    const data = await response.json();
    
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};

export const getPopularMusicVideos = async (): Promise<Video[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet&chart=mostPopular&videoCategoryId=10&maxResults=20&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch popular videos');
    }

    const data = await response.json();
    
    return data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error('Error fetching popular videos:', error);
    return [];
  }
};

export const getRelatedVideos = async (videoId: string): Promise<Video[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=10&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch related videos');
    }

    const data = await response.json();
    
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error('Error fetching related videos:', error);
    return [];
  }
};