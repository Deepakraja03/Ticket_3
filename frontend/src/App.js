import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Host from './Pages/Host';
import Events from './Pages/Events';
import Dashboard from './Pages/Dashboard';
import Navbar from './Components/Navbar';
import Web3 from 'web3';

function App() {
  const [web3, setWeb3] = useState(null);



  const [isConnected, setIsConnected] = useState(
    localStorage.getItem('isConnected') === 'true' || false
  );
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem('walletAddress') || ''
  );


  useEffect(() => {
    const getWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        if (window.ethereum.selectedAddress) {
          setIsConnected(true);
          setWalletAddress(window.ethereum.selectedAddress);
          localStorage.setItem('walletAddress', window.ethereum.selectedAddress);

        }
      }
    };
    getWeb3();
  }, []);

  useEffect(() => {
    const savedWalletAddress = localStorage.getItem('walletAddress');
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
      setIsConnected(true);
    }
  }, []);

  const connectWallet = async () => {
    if (!web3) {
      console.error("Web3 is not initialized.");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      if (window.ethereum.selectedAddress) {
        setWalletAddress(window.ethereum.selectedAddress);
        localStorage.setItem('walletAddress', window.ethereum.selectedAddress);
        setIsConnected(true);

        localStorage.setItem('isConnected', 'true');

      }
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    localStorage.removeItem('walletAddress');

    localStorage.removeItem('isConnected');

  };

  return (
    <div>
      <Router>
        <Navbar isConnected={isConnected} connectWallet={connectWallet} disconnectWallet={disconnectWallet} walletAddress={walletAddress} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Host />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

