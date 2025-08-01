// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ tabs }) => {
  const navigate = useNavigate();
  const defaultTabs = ['Sportsbook', 'Live now', 'Casino', 'Pre-match', 'Promotions'];
  const activeTabs = tabs || defaultTabs;

  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-12 py-4 border-b border-gray-700 backdrop-blur-sm bg-zinc-900/80 z-[100] text-lg">
      {/* Logo and Navigation */}
      <div className="flex items-center gap-10">
        <div 
          className="text-2xl font-bold text-orange-400 cursor-pointer"
          onClick={() => navigate('/')}
        >
          🎰 BetFlix
        </div>
        
        <div className="flex gap-8 uppercase font-semibold tracking-wide">
          {activeTabs.map((tab, i) => (
            <div
              key={i}
              className="relative group cursor-pointer text-gray-300 hover:text-white transition"
              onClick={() => {
                if (tab === 'Sportsbook') navigate('/');
                if (tab === 'Live now') navigate('/videos');
                if (tab === 'Casino') navigate('/streaming/vid-hacked');
              }}
            >
              <span>{tab}</span>
              <span className={`absolute bottom-[-6px] left-0 w-0 h-[2px] bg-orange-400 transition-all duration-300 group-hover:w-full`}></span>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Menu */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-sm text-black text-sm outline-none w-40 transition-all duration-200 focus:w-64"
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
        <button className="flex flex-col gap-[5px] cursor-pointer group">
          <span className="w-7 h-[2px] bg-white block transition-transform group-hover:translate-x-1"></span>
          <span className="w-7 h-[2px] bg-white block transition-transform group-hover:translate-x-2"></span>
          <span className="w-7 h-[2px] bg-white block transition-transform group-hover:translate-x-1"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;