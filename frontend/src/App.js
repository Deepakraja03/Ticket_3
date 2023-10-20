import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Host from './Pages/Host';
import Events from './Pages/Events';
import EventDetails from './Pages/EventDetails'
import Dashboard from './Pages/Dashboard';
import Navbar from './Components/Navbar';
import Web3 from 'web3';

function App() {
  return (
    <div>
      <Router>
        <Navbar isConnected={isConnected} connectWallet={connectWallet} disconnectWallet={disconnectWallet} walletAddress={walletAddress} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host" element={<Host />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App