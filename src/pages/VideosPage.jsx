// src/pages/VideosPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import hexBg from '../assets/hexellence-1920x1080.png';
import Navbar from '../components/Navbar';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(false);
  const [expandedVideo, setExpandedVideo] = useState(null);
  const navigate = useNavigate();

  const tabs = [
    { id: 'All', name: 'All Events', icon: '📺' },
    { id: 'Sports', name: 'Sports', icon: '⚽' },
    { id: 'Esports', name: 'E-Sports', icon: '🎮' },
    { id: 'Cockfighting', name: 'Cockfighting', icon: '🐓' },
    { id: 'Racing', name: 'Racing', icon: '🏎️' },
    { id: 'Promotions', name: 'Promotions', icon: '🎁' },
  ];

  useEffect(() => {
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
          title: ['Football Match', 'Cockfight Event', 'Esports Tournament', 'Racing'][i % 4],
          genre: ['Sports', 'Cockfighting', 'Esports', 'Racing'][i % 4],
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

      {/* MAIN CONTENT */}
      <div className="flex-1 pt-28 pb-8 pl-8 pr-4 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-orange-400 text-xl">Loading videos...</div>
          </div>
        ) : (
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

      {/* SIDEBAR */}
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
  const renderParticipants = () => {
    if (!video.contestants && !video.teams) return null;
    
    const participants = video.teams || video.contestants;
    
    if (video.genre === 'Racing') {
      return (
        <div className="mt-2">
          <h4 className="text-xs text-gray-400 mb-1">Drivers:</h4>
          <div className="grid grid-cols-2 gap-1">
            {participants.slice(0, 4).map((p, i) => (
              <div key={i} className="text-xs truncate">
                {p.name}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return (
      <div className="mt-2">
        <h4 className="text-xs text-gray-400 mb-1">Participants:</h4>
        <div className="flex justify-between">
          {participants.slice(0, 2).map((p, i) => (
            <div key={i} className="text-xs">
              {p.name}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderOdds = () => {
    if (!video.betOptions || video.betOptions.length === 0) return null;
    
    const winnerOdds = video.betOptions.find(o => o.type === 'Winner');
    if (!winnerOdds) return null;
    
    return (
      <div className="mt-2">
        <h4 className="text-xs text-gray-400 mb-1">Winner Odds:</h4>
        <div className="grid grid-cols-2 gap-1">
          {Object.entries(winnerOdds.odds).map(([name, odds]) => (
            <div key={name} className="text-xs flex justify-between">
              <span>{name}</span>
              <span className="font-bold">{odds}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-gray-700 rounded-md overflow-hidden transition-all duration-300 ${
      isExpanded ? 'ring-2 ring-orange-500' : 'hover:ring-1 hover:ring-orange-400'
    }`}>
      {/* Video Thumbnail */}
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
        <div className="absolute inset-0 items-center justify-center text-gray-500 text-lg hidden">
          Video Preview
        </div>
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
        
        {renderParticipants()}
        {renderOdds()}

        <button 
          onClick={onExpand}
          className={`mt-3 text-sm flex items-center text-orange-400 hover:text-orange-300 transition ${
            isExpanded ? 'font-bold' : ''
          }`}
        >
          {isExpanded ? 'Hide details' : 'Show details'}
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