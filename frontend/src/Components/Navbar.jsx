import React, { useState, useEffect, useRef } from 'react';

const Navbar = ({ isConnected, connectWallet, disconnectWallet, walletAddress }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = () => {
    disconnectWallet();
    setShowDropdown(false);
  };

  const handleDocumentClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  return (
    <div className="py-2 px-20 bg-black w-full">
      <div className="flex justify-between text-white py-2 bg-white/30 rounded-full px-4">
        <div className="flex items-center">
          <h1 className="text-yellow-400 text-2xl font-bold">Ticket3</h1>
        </div>
        <div className="flex items-center gap-6">
          <a href="/" className="text-lg">
            Home
          </a>
          <a href="/Dashboard" className="text-lg">
            Dashboard
          </a>
          <a href="/host" className="text-lg">
            Host
          </a>
          <a href="/events" className="text-lg">
            Events
          </a>
        </div>
        <div className="relative" ref={dropdownRef}>
          {isConnected ? (
            <div className="flex items-center">
              <p
                className="text-lg text-white truncate w-44 cursor-pointer"
                onClick={toggleDropdown}
              >
                {walletAddress}
              </p>
              {showDropdown && (
                <div className="absolute right-0 mt-36 bg-white/50 text-white rounded-lg p-2">
                  <p className="text-lg">{walletAddress}</p>
                  <button
                    onClick={handleSignOut}
                    className="text-lg text-black font-semibold border-2 border-yellow-400 bg-yellow-400 rounded-2xl px-3 py-1 hover-bg-black hover-border-2 hover-text-yellow-400 hover-border-yellow-400"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="text-xl text-black font-semibold border-2 border-yellow-400 bg-yellow-400 rounded-2xl px-3 py-1 hover-bg-black hover-border-2 hover-text-yellow-400 hover-border-yellow-400"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;