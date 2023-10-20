import Web3 from "web3";
import Tick from "./abi/Ticket3.json";
import { ethers } from "ethers";

const isBrowser = () => typeof window !== "undefined";
const ethereum = isBrowser() ? window.ethereum : null;

const TICKET_CONTRACT = "0x9435060c40A5D2C3aA48F792dD81C74Bd5AF7Fe2";

export const HOSTEVENT = async ({
    name,
    location,
    totaltickets,
    price,
    date,
    time
}) => {
    if (!ethereum) {
        console.error("Ethereum provider not available.");
        return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const Role = new ethers.Contract(TICKET_CONTRACT, Tick, signer);
    
    try {
        const tokenId = await Role.hostEvent(name, location, totaltickets, price, date, time);
        console.log("Transaction Hash:", tokenId);
        return tokenId;
    } catch (error) {
        console.error("Error hosting event:", error);
        throw error;
    }
};
export const GETALLEVENTS = async () => {
    if (!ethereum) {
        console.error("Ethereum provider not available.");
        return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const Role = new ethers.Contract(TICKET_CONTRACT, Tick, signer);
    
    try {
        const result = await Role.getAllEvents();
        return result;
    } catch (error) {
        console.error("Error fetching event:", error);
        throw error;
    }
};


