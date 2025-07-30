// src/pages/StreamingPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import hexBg from '../assets/hexellence-1920x1080.png';

const StreamingPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [betAmount, setBetAmount] = useState('');
  const [selectedOdd, setSelectedOdd] = useState(null);
  const [activeBetTab, setActiveBetTab] = useState(0);

  // src/pages/StreamingPage.jsx
// Add this near the top of the component, after loading the video
  useEffect(() => {
    if (video && video.id === "vid-hacked") {
      navigate("/streaming/vid-hacked");
    }
  }, [video, navigate]);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true);
        const response = await fetch('/database/videos.json');
        const videosData = await response.json();
        
        const currentVideo = videosData.find(v => v.id === videoId);
        if (!currentVideo) {
          navigate('/videos');
          return;
        }
        
        setVideo(currentVideo);
        
        // Get related videos (same genre, excluding current)
        const related = videosData
          .filter(v => v.genre === currentVideo.genre && v.id !== videoId)
          .slice(0, 4);
        setRelatedVideos(related);
        
      } catch (error) {
        console.error('Error loading video:', error);
        navigate('/videos');
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [videoId, navigate]);

  const handleBetSubmit = () => {
    if (!selectedOdd || !betAmount) {
      alert('Please select odds and enter bet amount');
      return;
    }
    
    const potentialWin = (parseFloat(betAmount) * parseFloat(selectedOdd.value)).toFixed(2);
    alert(`Bet placed!\nAmount: ₱${betAmount}\nOdds: ${selectedOdd.value}\nPotential Win: ₱${potentialWin}`);
    setBetAmount('');
    setSelectedOdd(null);
  };

  const renderParticipants = () => {
    if (!video.contestants && !video.teams) return null;
    
    const participants = video.teams || video.contestants;
    
    if (video.genre === 'Racing') {
      return (
        <div className="bg-zinc-800/50 rounded-lg p-4 mb-6">
          <h4 className="text-lg font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
            Race Participants
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {participants.map((p, i) => (
              <div key={i} className="bg-zinc-700/30 p-3 rounded-lg">
                <div className="font-bold">{p.name}</div>
                <div className="text-sm text-gray-400">{p.team}</div>
                <div className="text-sm">Position: {p.position}</div>
                <div className="text-sm">Points: {p.points}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return (
      <div className="bg-zinc-800/50 rounded-lg p-4 mb-6">
        <h4 className="text-lg font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
          {video.teams ? 'Teams' : 'Contestants'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {participants.map((p, i) => (
            <div key={i} className="bg-zinc-700/30 p-4 rounded-lg">
              <div className="font-bold text-lg">{p.name}</div>
              {p.character && <div className="text-sm text-gray-400">Character: {p.character}</div>}
              {p.team && <div className="text-sm text-gray-400">Team: {p.team}</div>}
              {p.country && <div className="text-sm text-gray-400">Country: {p.country}</div>}
              {p.winRate && <div className="text-sm">Win Rate: {p.winRate}</div>}
              {p.weight && <div className="text-sm">Weight: {p.weight}</div>}
              {p.form && <div className="text-sm">Form: {p.form}</div>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBetOptions = () => {
    if (!video.betOptions || video.betOptions.length === 0) {
      return (
        <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
          <p className="text-gray-400">No betting options available for this event</p>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-gray-700 rounded-lg p-6 sticky top-32">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {video.betOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => setActiveBetTab(index)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeBetTab === index
                  ? 'bg-orange-500 text-black font-bold'
                  : 'bg-zinc-700 text-gray-300'
              }`}
            >
              {option.type}
            </button>
          ))}
        </div>

        <div className="space-y-3 mb-6">
          {video.betOptions[activeBetTab].options ? (
            video.betOptions[activeBetTab].options.map((option, i) => (
              <button 
                key={i}
                onClick={() => setSelectedOdd({ name: option.name, value: option.odds, type: video.betOptions[activeBetTab].type })}
                className={`w-full flex justify-between items-center p-3 rounded-lg border transition ${
                  selectedOdd?.name === option.name && selectedOdd?.type === video.betOptions[activeBetTab].type
                    ? 'bg-orange-500/30 border-orange-500 text-orange-400'
                    : 'bg-zinc-700/50 border-gray-600 hover:bg-zinc-700/70'
                }`}
              >
                <span className="text-sm">{option.name}</span>
                <span className="font-bold text-lg">{option.odds}</span>
              </button>
            ))
          ) : (
            Object.entries(video.betOptions[activeBetTab].odds).map(([name, odds]) => (
              <button 
                key={name}
                onClick={() => setSelectedOdd({ name, value: odds, type: video.betOptions[activeBetTab].type })}
                className={`w-full flex justify-between items-center p-3 rounded-lg border transition ${
                  selectedOdd?.name === name && selectedOdd?.type === video.betOptions[activeBetTab].type
                    ? 'bg-orange-500/30 border-orange-500 text-orange-400'
                    : 'bg-zinc-700/50 border-gray-600 hover:bg-zinc-700/70'
                }`}
              >
                <span className="text-sm">{name}</span>
                <span className="font-bold text-lg">{odds}</span>
              </button>
            ))
          )}
        </div>

        {/* Rest of the betting form remains the same */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Bet Amount (₱)</label>
            <input 
              type="number" 
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder="Enter amount" 
              className="w-full bg-zinc-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          
          {selectedOdd && betAmount && (
            <div className="bg-zinc-700/30 rounded-lg p-3 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Potential Win:</span>
                <span className="font-bold text-green-400">
                  ₱{(parseFloat(betAmount) * parseFloat(selectedOdd.value)).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Return:</span>
                <span className="font-bold">
                  ₱{(parseFloat(betAmount) * parseFloat(selectedOdd.value) + parseFloat(betAmount)).toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <button 
            onClick={handleBetSubmit}
            disabled={!selectedOdd || !betAmount}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-black font-bold py-3 rounded-lg transition"
          >
            PLACE BET
          </button>
        </div>

        {/* Live Stats and Quick Links sections remain the same */}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-orange-400 text-xl">Loading video...</div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Video not found</h2>
          <button 
            onClick={() => navigate('/videos')}
            className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded text-black font-bold"
          >
            Back to Videos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-zinc-900 text-white font-sans relative overflow-hidden"
      style={{
        backgroundImage: `url(${hexBg})`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
      }}
    >
      <Navbar tabs={['Sportsbook', 'Live now', 'Casino', 'Promotions']} />
      
      {/* Floating Hexagon Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Hexagon key={i} index={i} />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="pt-28 pb-8 px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-black rounded-lg overflow-hidden mb-6 aspect-video relative">
              <video 
                className="w-full h-full object-cover"
                controls
                autoPlay
                poster={`/videos/${video.file}`}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              >
                <source src={`/videos/${video.file}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Fallback if video fails to load */}
              <div className="absolute inset-0 items-center justify-center text-gray-500 text-lg hidden bg-black">
                Video Unavailable
              </div>
              {video.isLive && (
                <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded text-sm font-bold flex items-center animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  LIVE
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-gray-700 rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                      {video.genre}
                    </span>
                    <span>{video.views.toLocaleString()} views</span>
                    <span>{video.duration}</span>
                    <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/videos')}
                  className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded text-sm transition"
                >
                  Back to Videos
                </button>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {video.description}
              </p>
            </div>

            {/* Participants Section */}
            {renderParticipants()}

            {/* Related Videos */}
            {relatedVideos.length > 0 && (
              <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                  MORE {video.genre.toUpperCase()}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedVideos.map(relatedVideo => (
                    <div 
                      key={relatedVideo.id}
                      className="bg-zinc-700/50 rounded-lg overflow-hidden cursor-pointer hover:bg-zinc-700/70 transition"
                      onClick={() => navigate(`/streaming/${relatedVideo.id}`)}
                    >
                      <div className="aspect-video bg-black flex items-center justify-center relative group">
                        <video 
                          className="w-full h-full object-cover"
                          poster={`/videos/${relatedVideo.file}`}
                        >
                          <source src={`/videos/${relatedVideo.file}`} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-12 h-12 bg-orange-500/80 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/70 px-1 py-0.5 rounded text-xs">
                          {relatedVideo.duration}
                        </div>
                        {relatedVideo.isLive && (
                          <div className="absolute top-1 left-1 bg-red-600 px-1 py-0.5 rounded text-xs font-bold flex items-center animate-pulse">
                            <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
                            LIVE
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm mb-1 line-clamp-2">{relatedVideo.title}</h4>
                        <p className="text-xs text-gray-400">{relatedVideo.views.toLocaleString()} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Betting Sidebar */}
          {renderBetOptions()}
        </div>
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

export default StreamingPage;