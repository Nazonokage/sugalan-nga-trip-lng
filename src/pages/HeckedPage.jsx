import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import hexBg from '../assets/hexellence-1920x1080.png';

const HeckedPage = () => {
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [betAmount, setBetAmount] = useState('');
  const [selectedOdd, setSelectedOdd] = useState(null);
  const [activeBetTab, setActiveBetTab] = useState(0);
  const [isHacked, setIsHacked] = useState(false);
  const [hackWarning, setHackWarning] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [userBalance, setUserBalance] = useState(5000);
  const [winStreak, setWinStreak] = useState(0);
  const [hackMessage, setHackMessage] = useState('');
  const [hackMultiplier, setHackMultiplier] = useState(1);
  const [konamiCode, setKonamiCode] = useState([]);
  const [currentVideoFile, setCurrentVideoFile] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  useEffect(() => {
    const loadVideo = () => {
      setLoading(true);
      const mockVideo = {
        id: "boxing-championship",
        title: "Championship Boxing Match - Live",
        genre: "Sports",
        views: 125430,
        duration: "2:45:30",
        uploadDate: "2025-07-30",
        description: "Epic championship bout between two heavyweight legends. Place your bets now! Winner takes all in this historic match.",
        isLive: true,
        contestants: [
          { 
            name: "Mike 'Thunder' Johnson", 
            country: "USA", 
            winRate: "85%", 
            weight: "220 lbs",
            form: "5 wins in a row"
          },
          { 
            name: "Ivan 'Storm' Petrov", 
            country: "Russia", 
            winRate: "82%", 
            weight: "218 lbs",
            form: "Knockout specialist"
          }
        ],
        betOptions: [
          {
            type: "Winner",
            odds: {
              "Mike Johnson": "1.85",
              "Ivan Petrov": "2.10"
            }
          },
          {
            type: "Round Betting",
            odds: {
              "Round 1-3": "3.50",
              "Round 4-6": "2.80",
              "Round 7+": "1.95",
              "Goes Distance": "4.20"
            }
          },
          {
            type: "Method",
            odds: {
              "Knockout": "2.40",
              "Decision": "1.75",
              "Technical": "5.50"
            }
          }
        ]
      };
      setVideo(mockVideo);
      setLoading(false);
    };

    loadVideo();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const newSequence = [...konamiCode, event.code].slice(-konamiSequence.length);
      setKonamiCode(newSequence);
      
      if (JSON.stringify(newSequence) === JSON.stringify(konamiSequence)) {
        triggerHack();
        setKonamiCode([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiCode]);

  const triggerHack = () => {
    setHackWarning(true);
    setGlitchEffect(true);
    
    setTimeout(() => {
      setIsHacked(true);
      setHackMessage("🔴 SYSTEM COMPROMISED - ODDS MANIPULATION ACTIVE");
      setGlitchEffect(false);
      setHackMultiplier(2 + Math.random() * 3);
      // Change video when hacked
      setCurrentVideoFile("歌ってみたGikumot-kumot but sang by yui (720 X 1280).mp4");
    }, 3000);
  };

  const handleVideoClick = () => {
    if (!isVideoPlaying && !isHacked) {
      setCurrentVideoFile("歌ってみたGikumot-kumot but sang by yui (720 X 1280).mp4");
      setIsVideoPlaying(true);
    }
  };

  const handleBackToVideos = () => {
    setCurrentVideoFile("Rick Roll (Different link no ads) (360 X 640).mp4");
    setIsVideoPlaying(true);
  };

  const handleBetSubmit = () => {
    if (!selectedOdd || !betAmount) {
      alert('Please select odds and enter bet amount');
      return;
    }
    
    const amount = parseFloat(betAmount);
    let actualOdds = parseFloat(selectedOdd.value);
    
    if (isHacked) {
      const hackBonus = hackMultiplier;
      actualOdds = actualOdds * hackBonus;
      const hackWin = Math.random() > 0.05;
      
      if (hackWin) {
        const winAmount = amount * actualOdds;
        setUserBalance(prev => prev + winAmount);
        setWinStreak(prev => prev + 1);
        
        const message = `🔥 HACKED WIN! 🔥\n` +
                       `Bet: ₱${amount.toLocaleString()}\n` +
                       `Hacked Odds: ${actualOdds.toFixed(2)} (${hackBonus.toFixed(1)}x boost!)\n` +
                       `Win: ₱${winAmount.toLocaleString()}\n` +
                       `New Balance: ₱${(userBalance + winAmount).toLocaleString()}\n` +
                       `Win Streak: ${winStreak + 1}`;
        
        alert(message);
      } else {
        setUserBalance(prev => prev - amount);
        setWinStreak(0);
        alert(`Unlucky! Lost: ₱${amount.toLocaleString()}\nEven hacks can't win 100% of the time! 😅`);
      }
    } else {
      const normalWin = Math.random() > 0.65;
      
      if (normalWin) {
        const winAmount = amount * actualOdds;
        setUserBalance(prev => prev + winAmount);
        alert(`🎉 You Won!\nBet: ₱${amount.toLocaleString()}\nWin: ₱${winAmount.toLocaleString()}\nNew Balance: ₱${(userBalance + winAmount).toLocaleString()}`);
      } else {
        setUserBalance(prev => prev - amount);
        alert(`😔 You Lost!\nBet: ₱${amount.toLocaleString()}\nRemaining Balance: ₱${(userBalance - amount).toLocaleString()}`);
      }
    }
    
    setBetAmount('');
    setSelectedOdd(null);
  };

  const renderBetOptions = () => {
    if (!video?.betOptions || video.betOptions.length === 0) {
      return (
        <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
          <p className="text-gray-400">No betting options available for this event</p>
        </div>
      );
    }

    return (
      <div className={`bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border rounded-lg p-6 sticky top-32 ${
        glitchEffect ? 'animate-pulse border-red-500 shadow-lg shadow-red-500/50' : 'border-gray-700'
      }`}>
        {/* Hack Status */}
        {isHacked && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-400 text-lg animate-pulse">⚠️</span>
              <span className="text-red-400 font-bold text-sm">HACKING MODE ACTIVE</span>
              <div className="ml-auto text-xs bg-red-600 px-2 py-1 rounded">
                {hackMultiplier.toFixed(1)}x BOOST
              </div>
            </div>
            <p className="text-xs text-red-300">{hackMessage}</p>
            <div className="mt-2 text-xs grid grid-cols-2 gap-2">
              <span className="text-green-400">Win Streak: {winStreak}</span>
              <span className="text-green-400">Win Rate: 95%</span>
            </div>
          </div>
        )}

        {/* Balance Display */}
        <div className="mb-4 p-3 bg-zinc-700/50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Balance:</span>
            <span className={`font-bold text-lg ${
              isHacked ? 'text-green-400 animate-pulse' : 'text-white'
            }`}>
              ₱{userBalance.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Betting Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {video.betOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => setActiveBetTab(index)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                activeBetTab === index
                  ? `${isHacked ? 'bg-red-500 text-white shadow-lg shadow-red-500/50' : 'bg-orange-500 text-black'} font-bold`
                  : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
              }`}
            >
              {option.type}
              {isHacked && activeBetTab === index && <span className="ml-1">🔥</span>}
            </button>
          ))}
        </div>

        {/* Betting Options */}
        <div className="space-y-3 mb-6">
          {Object.entries(video.betOptions[activeBetTab].odds).map(([name, odds]) => {
            const originalOdds = parseFloat(odds);
            const displayOdds = isHacked ? (originalOdds * hackMultiplier).toFixed(2) : odds;
            const isModified = isHacked && displayOdds !== odds;
            
            return (
              <button 
                key={name}
                onClick={() => setSelectedOdd({ name, value: odds, type: video.betOptions[activeBetTab].type })}
                className={`w-full flex justify-between items-center p-3 rounded-lg border transition-all ${
                  selectedOdd?.name === name && selectedOdd?.type === video.betOptions[activeBetTab].type
                    ? `${isHacked ? 'bg-red-500/30 border-red-500 text-red-400 shadow-lg' : 'bg-orange-500/30 border-orange-500 text-orange-400'}`
                    : `bg-zinc-700/50 border-gray-600 hover:bg-zinc-700/70 ${isHacked ? 'hover:border-red-600/50' : ''}`
                }`}
              >
                <span className="text-sm">{name}</span>
                <div className="flex items-center gap-2">
                  {isModified && (
                    <span className="text-xs line-through text-gray-500">{odds}</span>
                  )}
                  <span className={`font-bold text-lg ${
                    isModified ? 'text-green-400' : ''
                  }`}>
                    {displayOdds}
                    {isModified && <span className="text-xs ml-1">📈</span>}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bet Amount Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Bet Amount (₱) 
              {isHacked && <span className="text-red-400 ml-2">🔓 UNLIMITED MODE</span>}
            </label>
            <input 
              type="number" 
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder={isHacked ? "Sky's the limit!" : "Enter amount"}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-all ${
                isHacked 
                  ? 'bg-red-900/20 border-red-600 focus:ring-red-500 text-red-300 placeholder-red-400' 
                  : 'bg-zinc-700 border-gray-600 focus:ring-orange-500 text-white'
              }`}
            />
          </div>
          
          {/* Win Calculation */}
          {selectedOdd && betAmount && (
            <div className={`rounded-lg p-3 text-sm border ${
              isHacked 
                ? 'bg-red-700/30 border-red-600/50' 
                : 'bg-zinc-700/30 border-zinc-600'
            }`}>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Potential Win:</span>
                <span className={`font-bold ${isHacked ? 'text-green-400' : 'text-green-400'}`}>
                  ₱{(parseFloat(betAmount) * parseFloat(selectedOdd.value) * (isHacked ? hackMultiplier : 1)).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Total Return:</span>
                <span className="font-bold text-white">
                  ₱{(parseFloat(betAmount) * parseFloat(selectedOdd.value) * (isHacked ? hackMultiplier : 1) + parseFloat(betAmount)).toLocaleString()}
                </span>
              </div>
              {isHacked && (
                <div className="text-xs text-red-300 mt-2 flex justify-between">
                  <span>🔥 Hack Multiplier:</span>
                  <span className="font-bold">{hackMultiplier.toFixed(1)}x</span>
                </div>
              )}
            </div>
          )}

          <button 
            onClick={handleBetSubmit}
            disabled={!selectedOdd || !betAmount}
            className={`w-full font-bold py-3 rounded-lg transition-all transform hover:scale-105 ${
              isHacked
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/50'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black'
            } disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {isHacked ? '🔥 PLACE HACKED BET 🔥' : 'PLACE BET'}
          </button>
        </div>

        {/* Hack Instructions */}
        {!isHacked && (
          <div className="mt-6 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
            <p className="text-xs text-gray-500 text-center mb-2">
              🕹️ Want to hack the system?
            </p>
            <div className="space-y-2">
              <p className="text-xs text-gray-400 text-center">
                Try the Konami Code: ↑↑↓↓←→←→BA
              </p>
              <p className="text-xs text-gray-500 text-center">or</p>
              <button
                onClick={triggerHack}
                className="w-full text-xs bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded transition-all"
              >
                🔓 Click here to hack (Easy Mode)
              </button>
            </div>
          </div>
        )}

        {/* Reset Button for Demo */}
        {isHacked && (
          <div className="mt-4">
            <button
              onClick={() => {
                setIsHacked(false);
                setWinStreak(0);
                setUserBalance(5000);
                setHackMessage('');
                setHackMultiplier(1);
                setCurrentVideoFile('');
                setIsVideoPlaying(false);
              }}
              className="w-full text-xs bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded transition-all"
            >
              🔄 Reset Demo
            </button>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
        <div className="text-orange-400 text-xl animate-pulse">Loading video...</div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen bg-zinc-900 text-white font-sans relative overflow-hidden ${
        glitchEffect ? 'glitch' : ''
      }`}
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

      {/* Hack Warning Overlay */}
      {hackWarning && !isHacked && (
        <div className="fixed inset-0 bg-red-900/80 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-black border-2 border-red-500 p-8 rounded-lg text-center animate-pulse max-w-md">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              ⚠️ SYSTEM BREACH DETECTED ⚠️
            </h2>
            <p className="text-red-300 mb-4">Unauthorized access in progress...</p>
            <div className="mt-4 text-green-400 font-mono text-sm">
              <div className="mb-2">BYPASSING SECURITY...</div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full animate-pulse" style={{width: '90%'}}></div>
              </div>
              <div className="mt-2">90% COMPLETE</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="pt-28 pb-8 px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-black rounded-lg overflow-hidden mb-6 aspect-video relative">
              {currentVideoFile ? (
                <video 
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  onError={(e) => {
                    console.error('Video failed to load:', currentVideoFile);
                  }}
                >
                  <source src={`/videos/${currentVideoFile}`} type="video/mp4" />
                  <div className="absolute inset-0 bg-black flex items-center justify-center text-gray-500">
                    Video Unavailable
                  </div>
                </video>
              ) : (
                <div 
                  className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center cursor-pointer hover:bg-gradient-to-br hover:from-zinc-700 hover:to-zinc-800 transition-all"
                  onClick={handleVideoClick}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">🥊</div>
                    <h3 className="text-2xl font-bold mb-2">Live Boxing Championship</h3>
                    <p className="text-gray-400">Thunder vs Storm - Round 8</p>
                    <div className="mt-4 text-sm text-gray-500">
                      (Click to play video)
                    </div>
                  </div>
                </div>
              )}
              
              {video.isLive && (
                <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded text-sm font-bold flex items-center animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  LIVE
                </div>
              )}
              {isHacked && (
                <div className="absolute top-4 right-4 bg-red-500/80 px-3 py-1 rounded text-sm font-bold animate-pulse">
                  🔴 HACKED STREAM
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 border border-gray-700 rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className={`px-2 py-1 rounded ${
                      isHacked ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {video.genre}
                    </span>
                    <span>{video.views.toLocaleString()} views</span>
                    <span>{video.duration}</span>
                    <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <button 
                  onClick={handleBackToVideos}
                  className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded text-sm transition"
                >
                  Back to Videos
                </button>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {video.description}
              </p>
            </div>

            {/* Contestants */}
            <div className="bg-zinc-800/50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                Championship Contestants
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {video.contestants.map((contestant, i) => (
                  <div key={i} className={`p-4 rounded-lg ${
                    isHacked ? 'bg-red-900/20 border border-red-700' : 'bg-zinc-700/30'
                  }`}>
                    <div className="font-bold text-lg">{contestant.name}</div>
                    <div className="text-sm text-gray-400">Country: {contestant.country}</div>
                    <div className="text-sm">Win Rate: {contestant.winRate}</div>
                    <div className="text-sm">Weight: {contestant.weight}</div>
                    <div className="text-sm">Form: {contestant.form}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Betting Sidebar */}
          {renderBetOptions()}
        </div>
      </div>

      {/* Glitch Effect Styles */}
      <style jsx>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        .glitch {
          animation: glitch 0.3s infinite;
        }

        @keyframes float {
          from {
            transform: translateY(100vh) rotate(0deg);
          }
          to {
            transform: translateY(-100px) rotate(360deg);
          }
        }
      `}</style>
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

export default HeckedPage;