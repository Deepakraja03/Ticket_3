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
<<<<<<< HEAD
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
=======
  const [isConnected, setIsConnected] = useState(
    localStorage.getItem('isConnected') === 'true' || false
  );
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem('walletAddress') || ''
  );
>>>>>>> 752b33ef578f393224f628d0e41151d520e6d8ca

  useEffect(() => {
    const getWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        if (window.ethereum.selectedAddress) {
          setIsConnected(true);
          setWalletAddress(window.ethereum.selectedAddress);
<<<<<<< HEAD
          localStorage.setItem('walletAddress', window.ethereum.selectedAddress);
=======
>>>>>>> 752b33ef578f393224f628d0e41151d520e6d8ca
        }
      }
    };
    getWeb3();
  }, []);

<<<<<<< HEAD
  useEffect(() => {
    // When the component first loads, check if there's a wallet address in local storage
    const savedWalletAddress = localStorage.getItem('walletAddress');
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
      setIsConnected(true);
    }
  }, []);

=======
>>>>>>> 752b33ef578f393224f628d0e41151d520e6d8ca
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
<<<<<<< HEAD
=======
        localStorage.setItem('isConnected', 'true');
>>>>>>> 752b33ef578f393224f628d0e41151d520e6d8ca
      }
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    localStorage.removeItem('walletAddress');
<<<<<<< HEAD
=======
    localStorage.removeItem('isConnected');
>>>>>>> 752b33ef578f393224f628d0e41151d520e6d8ca
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

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 752b33ef578f393224f628d0e41151d520e6d8ca
