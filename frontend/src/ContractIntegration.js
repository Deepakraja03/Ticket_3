import Tick from "./abi/Ticket3.json";
import { ethers } from "ethers";

const isBrowser = () => typeof window !== "undefined";
const ethereum = isBrowser() ? window.ethereum : null;

const TICKET_CONTRACT = "0x62631D2c3DA5c5FE2009818bed69bA42D5612E9D";
<<<<<<< HEAD

=======
>>>>>>> f5d073ff0260df7ccd5da32eb5df0f432cfbe35d

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
<<<<<<< HEAD
=======

export const VIEWONEEVENT = async(eventId) => {
    if (!ethereum) {
        console.error("Ethereum provider not available.");
        return null;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const Role = new ethers.Contract(TICKET_CONTRACT, Tick, signer);

    try {
        const result = await Role.viewEvent(eventId);
        console.log(result);
        return result;

    } catch (error) {
        console.error("Error fetching event details:", error);
        return null;
    }
}

export const BOOKING = async ({
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
>>>>>>> f5d073ff0260df7ccd5da32eb5df0f432cfbe35d
