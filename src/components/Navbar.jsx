// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ tabs }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const defaultTabs = ['Sportsbook', 'Live now', 'Casino', 'Pre-match', 'Promotions'];
  const activeTabs = tabs || defaultTabs;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabClick = (tab) => {
    if (tab === 'Sportsbook') navigate('/');
    if (tab === 'Live now') navigate('/videos');
    if (tab === 'Casino') navigate('/streaming/vid-hacked');
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 sm:px-8 md:px-12 py-3 sm:py-4 border-b border-gray-700 backdrop-blur-sm bg-zinc-900/80 z-[100] text-base sm:text-lg">
      {/* Logo and Navigation */}
      <div className="flex items-center gap-4 sm:gap-10">
        <div 
          className="text-xl sm:text-2xl font-bold text-orange-400 cursor-pointer"
          onClick={() => navigate('/')}
        >
          🎰 BetFlix
        </div>
        
        {!isMobile && (
          <div className="flex gap-4 sm:gap-8 uppercase font-semibold tracking-wide">
            {activeTabs.map((tab, i) => (
              <div
                key={i}
                className="relative group cursor-pointer text-gray-300 hover:text-white transition"
                onClick={() => handleTabClick(tab)}
              >
                <span className="text-sm sm:text-base">{tab}</span>
                <span className={`absolute bottom-[-6px] left-0 w-0 h-[2px] bg-orange-400 transition-all duration-300 group-hover:w-full`}></span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search and Menu */}
      <div className="flex items-center gap-4 sm:gap-6">
        {!isMobile && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-sm text-black text-xs sm:text-sm outline-none w-32 sm:w-40 transition-all duration-200 focus:w-48 sm:focus:w-64"
            />
            <svg
              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        )}
        
        <button 
          className="flex flex-col gap-[4px] sm:gap-[5px] cursor-pointer group"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-6 sm:w-7 h-[2px] bg-white block transition-all ${menuOpen ? 'rotate-45 translate-y-1.5 sm:translate-y-2' : ''}`}></span>
          <span className={`w-6 sm:w-7 h-[2px] bg-white block transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 sm:w-7 h-[2px] bg-white block transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5 sm:-translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-zinc-900/95 backdrop-blur-lg border-b border-gray-700 z-50 py-4 px-4">
          <div className="flex flex-col gap-4">
            {activeTabs.map((tab, i) => (
              <div
                key={i}
                className="cursor-pointer text-gray-300 hover:text-white transition py-2 border-b border-gray-700"
                onClick={() => handleTabClick(tab)}
              >
                <span className="text-base">{tab}</span>
              </div>
            ))}
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-sm text-black text-sm outline-none"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;