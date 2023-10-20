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
        throw error; // Optionally rethrow the error for further handling
    }
};


export const FETCHHOSTEVENT = async () => {
    if (!ethereum) {
      return []; 
    }
  
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const Role = new ethers.Contract(TICKET_CONTRACT, Tick, signer);
  
    try {
      const events = await Role.getAllEvents(); // Replace 'getAllEvents' with the actual function in your contract
      return events;
    } catch (error) {
      return []; // Return an empty array or handle the error as needed
    }
  };

