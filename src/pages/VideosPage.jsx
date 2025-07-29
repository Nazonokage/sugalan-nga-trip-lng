// src/pages/VideosPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hexBg from '../assets/hexellence-1920x1080.png';
import Navbar from '../components/Navbar';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(false); // Changed to false for demo
  const [expandedVideo, setExpandedVideo] = useState(null);
  const navigate = useNavigate();

  const tabs = [
    { id: 'All', name: 'All Events', icon: '📺' },
    { id: 'Sports', name: 'Sports', icon: '⚽' },
    { id: 'Esports', name: 'E-Sports', icon: '🎮' },
    { id: 'Cockfighting', name: 'Cockfighting', icon: '🐓' },
    { id: 'Promotions', name: 'Promotions', icon: '🎁' },
  ];

  useEffect(() => {
    // Load videos from JSON database
    const loadVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch('/database/videos.json');
        const videosData = await response.json();
        setVideos(videosData);
      } catch (error) {
        console.error('Error loading videos:', error);
        // Fallback to mock data if JSON fails
        const mockVideos = Array(4).fill().map((_, i) => ({
          id: `mock${i + 1}`,
          title: ['Football Match', 'Cockfight Event', 'Esports Tournament', 'Boxing Match'][i % 4],
          genre: ['Sports', 'Cockfighting', 'Esports', 'Sports'][i % 4],
          views: Math.floor(Math.random() * 10000),
          isLive: i % 3 === 0,
          file: `video${i % 4 + 1}.mp4`,
          duration: '5:00',
          uploadDate: '2025-07-29',
          description: 'Mock video data'
        }));
        setVideos(mockVideos);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const filteredVideos = activeTab === 'All' 
    ? videos 
    : videos.filter(video => video.genre === activeTab);

  const toggleExpandVideo = (id) => {
    setExpandedVideo(expandedVideo === id ? null : id);
  };

  return (
    <div 
      className="min-h-screen bg-zinc-900 text-white font-sans relative overflow-hidden flex"
      style={{
        backgroundImage: `url(${hexBg})`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
      }}
    >
      <Navbar tabs={['Sportsbook', 'Live now', 'Casino', 'Promotions']} />

      {/* MAIN CONTENT - Adjusted padding-top for fixed navbar */}
      <div className="flex-1 pt-28 pb-8 pl-8 pr-4 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-orange-400 text-xl">Loading videos...</div>
          </div>
        ) : (
          /* Video Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map(video => (
              <VideoCard 
                key={video.id}
                video={video}
                isExpanded={expandedVideo === video.id}
                onExpand={() => toggleExpandVideo(video.id)}
                onVideoClick={() => navigate(`/streaming/${video.id}`)}
              />
            ))}
          </div>
        )}
      </div>

      {/* SIDEBAR - Also adjusted for fixed navbar */}
      <div className="w-72 pt-28 pr-8 pb-8 pl-4 border-l border-gray-700 hidden lg:block bg-gradient-to-b from-zinc-800/90 to-zinc-900/90 sticky top-0 h-screen z-40">
        <div className="sticky top-28">
          <h3 className="text-lg font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
            CATEGORIES
          </h3>
          <div className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500/30 to-orange-600/20 text-orange-400 font-semibold border border-orange-500/30'
                    : 'text-gray-300 hover:bg-zinc-700/50 hover:text-white'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Quick Betting Stats */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              LIVE BETS
            </h3>
            <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-gray-700 rounded-lg p-4 shadow-lg">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Active Bets:</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Total Wagered:</span>
                <span className="font-semibold">₱1,245,678</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Biggest Win:</span>
                <span className="font-semibold text-green-400">₱89,450</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hexagon Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Hexagon key={i} index={i} />
        ))}
      </div>
    </div>
  );
};

const VideoCard = ({ video, isExpanded, onExpand, onVideoClick }) => {
  const [odds, setOdds] = useState([
    { id: 1, name: 'Home Win', value: (Math.random() * 3 + 1).toFixed(2) },
    { id: 2, name: 'Draw', value: (Math.random() * 4 + 2).toFixed(2) },
    { id: 3, name: 'Away Win', value: (Math.random() * 3 + 1).toFixed(2) },
  ]);

  const matchDetails = {
    'Football Match': {
      teams: ['Team A', 'Team B'],
      time: '15:00',
      venue: 'Stadium'
    },
    'Cockfight Event': {
      teams: ['Rooster A', 'Rooster B'],
      time: '20:00',
      venue: 'Cockpit Arena'
    },
    'Esports Tournament': {
      teams: ['Team X', 'Team Y'],
      time: '18:30',
      venue: 'Online'
    },
    'Boxing Match': {
      teams: ['Fighter 1', 'Fighter 2'],
      time: '22:00',
      venue: 'MGM Grand'
    }
  };

  const details = matchDetails[video.title] || { teams: ['Team A', 'Team B'], time: '--:--', venue: 'Unknown' };

  return (
    <div className={`bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-gray-700 rounded-md overflow-hidden transition-all duration-300 ${
      isExpanded ? 'ring-2 ring-orange-500' : 'hover:ring-1 hover:ring-orange-400'
    }`}>
      {/* Video Thumbnail - Now shows actual video preview */}
      <div 
        className="relative bg-black w-full aspect-video flex items-center justify-center cursor-pointer group"
        onClick={onVideoClick}
      >
        <video 
          className="w-full h-full object-cover"
          poster={`/videos/${video.file}`}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        >
          <source src={`/videos/${video.file}`} type="video/mp4" />
        </video>
        {/* Fallback if video fails to load */}
        <div className="absolute inset-0 items-center justify-center text-gray-500 text-lg hidden">
          Video Preview
        </div>
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-orange-500/80 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        {video.isLive && (
          <div className="absolute top-2 left-2 bg-red-600 px-2 py-1 rounded text-xs font-bold flex items-center animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
            LIVE
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
          {video.views.toLocaleString()} views
        </div>
        <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs">
          {video.duration}
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 cursor-pointer hover:text-orange-400 transition" onClick={onVideoClick}>
          {video.title}
        </h3>
        <p className="text-sm text-gray-400 mb-2">{video.genre}</p>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{video.description}</p>
        
        {/* Video Stats */}
        <div className="mb-3 text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-gray-400">Views:</span>
            <span className="font-medium">{video.views.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-400">Duration:</span>
            <span className="font-medium">{video.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Uploaded:</span>
            <span className="font-medium">{new Date(video.uploadDate).toLocaleDateString()}</span>
          </div>
        </div>
        
        {/* Betting Odds - Shown only when expanded */}
        {isExpanded && (
          <div className="mt-4 border-t border-gray-700 pt-4">
            <h4 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300 mb-3">
              BETTING ODDS
            </h4>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {odds.map(odd => (
                <button 
                  key={odd.id}
                  className="bg-gradient-to-b from-zinc-700 to-zinc-800 hover:bg-gradient-to-b hover:from-orange-500 hover:to-orange-600 hover:text-black transition py-2 rounded text-center border border-gray-700"
                >
                  <div className="text-xs">{odd.name}</div>
                  <div className="font-bold">{odd.value}</div>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Stake" 
                className="flex-1 bg-zinc-700 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold px-4 py-2 rounded text-sm transition">
                Place Bet
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={onExpand}
          className={`mt-3 text-sm flex items-center text-orange-400 hover:text-orange-300 transition ${
            isExpanded ? 'font-bold' : ''
          }`}
        >
          {isExpanded ? 'Hide odds' : 'Show betting odds'}
          <svg 
            className={`ml-1 w-4 h-4 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Hexagon = ({ index }) => {
  const size = Math.random() * 40 + 20;
  const delay = Math.random() * 5;
  const duration = Math.random() * 10 + 10;
  const color = index % 2 ? 'text-orange-400' : 'text-orange-300';

  return (
    <svg
      className={`absolute ${color} opacity-10`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
      viewBox="0 0 100 100"
    >
      <polygon points="50,15 90,35 90,75 50,95 10,75 10,35" fill="currentColor" />
    </svg>
  );
};

export default VideosPage;