# 🎵 WaveTune - Music Streaming Platform

WaveTune is a modern, responsive, and fast music streaming web application built using **React + TypeScript**, leveraging the **YouTube Data API v3** to fetch and play full-length tracks from YouTube in a polished player interface.

## 🚀 Features

- 🔍 **Mood-based song recommendations** (e.g., Bhangra, Chill, Romantic)
- 🎧 **Full song playback via YouTube Data API**
- ⏭️ Music player with **Next**, **Previous**, and **Auto-play**
- 🎵 Spotify-style **UI/UX** with dynamic theming
- 🎹 Queue-based track management system
- 🎯 Smart search for artists, tracks, and albums
- 📱 Fully responsive (desktop & mobile)

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, React Router
- **API**: YouTube Data API v3
- **Audio Playback**: YouTube iframe player integration
- **State Management**: React Context + useReducer
- **Deployment**: Vercel / Netlify / GitHub Pages

## 🔐 YouTube API Setup

1. Go to [Google Developer Console](https://console.developers.google.com/)
2. Create a project → Enable **YouTube Data API v3**
3. Generate an API Key
4. Add your key to `.env`:
   ```env
   REACT_APP_YOUTUBE_API_KEY=your_api_key_here
📦 Installation
bash
Copy
Edit
git clone https://github.com/YourUsername/WaveTune.git
cd WaveTune
npm install
▶️ Running Locally
bash
Copy
Edit
npm run dev   # or npm start
📁 Project Structure
bash
Copy
Edit
WaveTune/
├── public/
├── src/
│   ├── components/       # Player, Queue, MoodSelector, SearchBar, etc.
│   ├── pages/            # Home, NowPlaying, Browse
│   ├── context/          # Global state (current track, queue)
│   ├── services/         # API logic for YouTube integration
│   ├── utils/            # Helper functions
│   └── App.tsx
├── .env
└── README.md
🔍 Sample API Usage
Example YouTube API fetch:

ts
Copy
Edit
const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=lofi&key=${API_KEY}`);
✅ To-Do
 Mood-based song filtering

 Next / Prev track playback logic

 Save user playlists

 User login with OAuth

 Dark mode

📸 UI Preview
Insert screenshots or a Loom/GIF demo here

📝 License
This project is licensed under the MIT License.

Built with ❤️ using React, TypeScript,
