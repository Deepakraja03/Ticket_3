import React, { useState } from 'react';

const Navbar = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

    const connectWallet = async () => {
        try {
            // Request access to the user's MetaMask wallet
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            setIsConnected(true);
            checkConnection();
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    };

    const checkConnection = async () => {
        if (window.ethereum.selectedAddress) {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            setWalletAddress(accounts[0]);
        } else {
            setIsConnected(false);
            setWalletAddress('');
        }
    };

    return (
        <div className="pt-8 ml-80 mr-80 px-20 pb-8">
            <div className="flex justify-center text-white pt-2  pb-2  bg-white/30 rounded-full">
                <div className="flex items-center">
                    <h1 className="text-yellow-400 text-2xl font-bold">Ticket3</h1>
                    <a href="/" className="text-lg ml-7">Home</a>
                    <a href="/Dashboard" className="text-lg ml-7 ">Dashboard</a>
                    <a href="/host" className="text-lg ml-7 ">Host</a>
                    <a href="/events" className="text-lg ml-7 mr-7">Events</a>
                </div>
                {isConnected ? (
                    <div>
                        <p className='truncate w-24'>{walletAddress}</p>
                    </div>
                ) : (
                    <button
                        onClick={connectWallet}
                        className="text-xl text-black font-semibold border-2 border-yellow-400 bg-yellow-400  rounded-2xl px-3 py-1 hover-bg-black hover-border-2 hover-text-yellow-400 hover-border-yellow-400"
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
