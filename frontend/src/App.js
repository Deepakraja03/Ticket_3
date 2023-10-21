
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Host from './Pages/Host';
import Events from './Pages/Events';
import Dashboard from './Pages/Dashboard';
import Navbar from './Components/Navbar';

import TicketBooking from '../src/Pages/TicketBooking';
import EventDetails from './Pages/EventDetails';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {avalancheFuji
} from 'wagmi/chains';

import { publicProvider } from 'wagmi/providers/public';

function App() {
  // const [web3, setWeb3] = useState(null);
  // const [isConnected, setIsConnected] = useState(false);
  // const [walletAddress, setWalletAddress] = useState('');

  // useEffect(() => {
  //   const getWeb3 = async () => {
  //     if (window.ethereum) {
  //       const web3Instance = new Web3(window.ethereum);
  //       setWeb3(web3Instance);
  //       if (window.ethereum.selectedAddress) {
  //         setIsConnected(true);
  //         setWalletAddress(window.ethereum.selectedAddress);
  //         localStorage.setItem('walletAddress', window.ethereum.selectedAddress);
  //       }
  //     }
  //   };
  //   getWeb3();
  // }, []);

  // useEffect(() => {
  //   // When the component first loads, check if there's a wallet address in local storage
  //   const savedWalletAddress = localStorage.getItem('walletAddress');
  //   if (savedWalletAddress) {
  //     setWalletAddress(savedWalletAddress);
  //     setIsConnected(true);
  //   }
  // }, []);

  // const connectWallet = async () => {
  //   if (!web3) {
  //     console.error("Web3 is not initialized.");
  //     return;
  //   }
  //   try {
  //     await window.ethereum.request({ method: "eth_requestAccounts" });
  //     if (window.ethereum.selectedAddress) {
  //       setWalletAddress(window.ethereum.selectedAddress);
  //       localStorage.setItem('walletAddress', window.ethereum.selectedAddress);
  //       setIsConnected(true);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const disconnectWallet = () => {
  //   setIsConnected(false);
  //   setWalletAddress('');
  //   localStorage.removeItem('walletAddress');
  // };
  
  const { chains, publicClient } = configureChains(
    [avalancheFuji],
    [
      // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'Ticket3',
    projectId: 'Ticket3',
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })
  

  return (
    <div>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/host" element={<Host />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/events" element={<Events />} />
              <Route path="/event/:id" element={<EventDetails />} />
              <Route path="/event/:id/booking" element={<TicketBooking />} />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;