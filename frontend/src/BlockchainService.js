import { ethers } from "ethers";
import Web3 from "web3";
import config from "../src/Contract/ticket.json";

const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
const { ethereum } = isBrowser();
if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

const CONTRACT_ADDRESS = "0xb976ed289fc21266D302ebBDC1515d8D585a683f";



const CreateTeam = async ({ selectedPlayers }) => {
    console.log("host creation started");
    console.log(selectedPlayers);
    let provider =
      window.ethereum != null
        ? new ethers.providers.Web3Provider(window.ethereum)
        : ethers.providers.getDefaultProvider();
    console.log(provider);
    const signer = provider.getSigner();
    console.log(signer);
    const Role = new ethers.Contract(CONTRACT_ADDRESS, config, signer);
    const res = await Role.createTeam(selectedPlayers);
  
    console.log(res);
    console.log("Team Created");
    window.alert("Your team was created");
    return true;
  };


  export {
    
    CreateTeam,

  };