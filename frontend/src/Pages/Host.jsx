import React  from "react";

import  { useState } from "react";
import { HOSTEVENT } from "../ContractIntegration";

const Host = () => {
  const [host, setHost] = useState({
    name: '',
    location: '',
    totaltickets: '',
    price: '',
    date: '',
    time: '',
  });

  const [transactionStatus, setTransactionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addHost = async () => {
    try {
      const { name, location, totaltickets, price, date, time } = host;
      const tokenId = await HOSTEVENT({ name, location, totaltickets, price, date, time });
      console.log("Transaction Hash:", tokenId);
      setTransactionStatus("Successfully submitted!");
    } catch (error) {
      console.error("Error hosting event:", error);
      setTransactionStatus("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="play-font bg-black h-screen  flex-col px-60 py-11  text-white font-medium">
      <h1 className=" text-2xl md:text-3xl">Event Name
      <input type="text" className=" block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-gray-500" placeholder="event name" required name="name" value={host.name} onChange={handleChange} /></h1>
      <h1 className=" text-2xl md:text-3xl pt-6">Venue
      <input type="text" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-gray-500" placeholder="location" name="location" value={host.location} onChange={handleChange} /></h1>
      <h1 className="text-2xl md:text-3xl pt-6">Number of tickets
      <input type="number" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-gray-500" placeholder="total tickets" name="totaltickets" value={host.totaltickets} onChange={handleChange} /></h1>
      <h1 className=" text-2xl md:text-3xl pt-6"> Price per ticket
      <input type="number" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-gray-500" placeholder="price" name="price" value={host.price} onChange={handleChange} /></h1>
      <div className=" space-x-6 pt-6">
          <h1 className=" text-2xl md:text-3xl ">Date 
          <input type="number" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-gray-500" placeholder="date" name="date" value={host.date} onChange={handleChange} /></h1>
          {/* <h1 className=" text-2xl md:text-3xl">Date to
          <input type="number" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-gray-500" placeholder="date" name="date" value={host.date} onChange={handleChange} /></h1> */}
      </div>
      <h1 className=" text-2xl md:text-3xl pt-6 pb-6 ">Time
      <input type="number" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-yellow-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-gray-500" placeholder="time" name="time" value={host.time} onChange={handleChange} /></h1>
      <button className=" w-24 text-2xl rounded-full py-2 hover:scale-105 bg-yellow-300 text-black hover:bg-black border-2 hover:border-yellow-400 hover:text-white " onClick={addHost}>HOST</button>
      {transactionStatus && (
        <div className={transactionStatus === "Successfully submitted!" ? "text-green-500" : "text-red-500"}>
          {transactionStatus}
        </div>
      )}
  </div>
  )
}
  export default Host;