import React, { useState } from "react";
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
    <div className="play bg-gray-800 h-screen flex flex-col px-60 py-11">
      <input type="text" className="w-full my-3" placeholder="event name" name="name" value={host.name} onChange={handleChange} />
      <input type="text" className="w-full my-3" placeholder="location" name="location" value={host.location} onChange={handleChange} />
      <input type="number" className="w-full my-3" placeholder="total tickets" name="totaltickets" value={host.totaltickets} onChange={handleChange} />
      <input type="number" className="w-full my-3" placeholder="price" name="price" value={host.price} onChange={handleChange} />
      <input type="number" className="w-full my-3" placeholder="date" name="date" value={host.date} onChange={handleChange} />
      <input type="number" className="w-full my-3" placeholder="time" name="time" value={host.time} onChange={handleChange} />
      <button className="bg-red-500" onClick={addHost}>Host</button>
      {transactionStatus && (
        <div className={transactionStatus === "Successfully submitted!" ? "text-green-500" : "text-red-500"}>
          {transactionStatus}
        </div>
      )}
    </div>
  );
};

export default Host;
