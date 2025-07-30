// src/components/BettingModal.jsx
import React, { useState } from 'react';

const BettingModal = ({ video, onClose, onPlaceBet }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [betAmount, setBetAmount] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const handleBetSubmit = () => {
    if (!selectedOption || !betAmount) {
      alert('Please select an option and enter bet amount');
      return;
    }

    const potentialWin = (parseFloat(betAmount) * parseFloat(selectedOption.odds)).toFixed(2);
    onPlaceBet({
      videoId: video.id,
      option: selectedOption,
      amount: betAmount,
      potentialWin
    });
    onClose();
  };

  const renderBetOptions = () => {
    if (!video.betOptions || video.betOptions.length === 0) return null;

    return video.betOptions[activeTab].type === 'Winner' ? (
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(video.betOptions[activeTab].odds).map(([name, odds]) => (
          <button
            key={name}
            onClick={() => setSelectedOption({ name, odds, type: video.betOptions[activeTab].type })}
            className={`p-3 rounded-lg border transition ${
              selectedOption?.name === name
                ? 'bg-orange-500/30 border-orange-500 text-orange-400'
                : 'bg-zinc-700/50 border-gray-600 hover:bg-zinc-700/70'
            }`}
          >
            <div className="font-bold text-lg">{name}</div>
            <div className="text-sm">Odds: {odds}</div>
          </button>
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-3">
        {video.betOptions[activeTab].options.map(option => (
          <button
            key={option.name}
            onClick={() => setSelectedOption({ ...option, type: video.betOptions[activeTab].type })}
            className={`p-3 rounded-lg border transition ${
              selectedOption?.name === option.name
                ? 'bg-orange-500/30 border-orange-500 text-orange-400'
                : 'bg-zinc-700/50 border-gray-600 hover:bg-zinc-700/70'
            }`}
          >
            <div className="font-bold text-sm">{option.name}</div>
            <div className="text-lg">Odds: {option.odds}</div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-gray-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              Place Your Bet
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">{video.title}</h4>
            <div className="flex gap-2 flex-wrap mb-4">
              {video.betOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeTab === index
                      ? 'bg-orange-500 text-black font-bold'
                      : 'bg-zinc-700 text-gray-300'
                  }`}
                >
                  {option.type}
                </button>
              ))}
            </div>

            {renderBetOptions()}
          </div>

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

            {selectedOption && betAmount && (
              <div className="bg-zinc-700/30 rounded-lg p-3 text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Selected Bet:</span>
                  <span className="font-semibold">
                    {selectedOption.type}: {selectedOption.name}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Odds:</span>
                  <span className="font-semibold">{selectedOption.odds}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Potential Win:</span>
                  <span className="font-bold text-green-400">
                    ₱{(parseFloat(betAmount) * parseFloat(selectedOption.odds)).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Return:</span>
                  <span className="font-bold">
                    ₱{(parseFloat(betAmount) * parseFloat(selectedOption.odds) + parseFloat(betAmount)).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-zinc-700 hover:bg-zinc-600 px-4 py-3 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleBetSubmit}
                disabled={!selectedOption || !betAmount}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-black font-bold py-3 rounded-lg transition"
              >
                CONFIRM BET
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BettingModal;