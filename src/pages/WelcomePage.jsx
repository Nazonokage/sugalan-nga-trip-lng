// src/pages/WelcomePage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import hexBg from '../assets/hexellence-1920x1080.png';

const WelcomePage = () => {
  return (
    <div
      className="min-h-screen bg-zinc-900 text-white font-sans relative overflow-hidden"
      style={{
        backgroundImage: `url(${hexBg})`,
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat',
      }}
    >
      <Navbar />

      {/* HERO SECTION - Now starts from top without navbar spacing */}
      <section className="relative w-full h-screen flex items-center justify-center px-8 overflow-hidden">
        {/* Floating Decorative Hexagons - Animated */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <Hexagon key={i} index={i} />
          ))}
        </div>

        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-28 left-20 w-28 h-56 bg-gradient-to-t from-orange-500/20 to-transparent opacity-30 blur-sm animate-pulse"></div>
          <div className="absolute top-12 right-[28%] w-36 h-64 bg-gradient-to-b from-orange-400/10 to-transparent opacity-40 blur-md animate-pulse"></div>
          <div className="absolute bottom-20 right-16 w-28 h-52 bg-gradient-to-t from-orange-500/20 to-transparent opacity-30 blur-sm animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl animate-pulse"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-start">
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              Ultimate Betting
            </span>
            <br />
            Experience
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl">
            Join millions of players worldwide in the most exciting sports betting and casino platform.
          </p>
          <button className="relative overflow-hidden group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black px-8 py-4 font-bold rounded-sm transition-all duration-300 shadow-lg hover:shadow-orange-500/30">
            <span className="relative z-10">GET STARTED</span>
            <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>

        {/* PROMOTION BLOCK */}
        <div className="absolute bottom-20 right-[8%] transform scale-[1.15] z-20 group">
          <div className="skew-x-12 w-[400px] h-[220px] bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 border border-gray-600 shadow-2xl overflow-hidden relative transition-all duration-500 group-hover:shadow-orange-500/50 group-hover:border-orange-400/30">
            <div
              className="w-full h-full -skew-x-12 p-6 flex flex-col justify-between text-white"
              style={{
                backgroundImage: `linear-gradient(rgba(24, 24, 27, 0.8), rgba(24, 24, 27, 0.8)), url(${hexBg})`,
                backgroundBlendMode: 'overlay',
                backgroundSize: 'cover',
                backgroundRepeat: 'repeat',
              }}
            >
              <div>
                <h2 className="text-3xl font-bold mb-1">Live Now</h2>
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                  Exclusive Promotions
                </h3>
                <p className="text-sm text-gray-300 mt-2">
                  Get up to <span className="text-orange-400 font-bold">200% bonus</span> on your first deposit and special rewards for loyal players.
                </p>
              </div>
              <button className="relative overflow-hidden group-hover:bg-orange-500 bg-orange-400 text-black px-5 py-2 mt-4 font-bold rounded-sm transition-all duration-300 w-fit">
                <span className="relative z-10">CLAIM BONUS</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
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

export default WelcomePage;