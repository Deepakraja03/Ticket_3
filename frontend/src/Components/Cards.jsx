import React, { useState, useEffect } from "react";
import Cards from "./Cards"; // Import your Cards component
import { FETCHHOSTEVENT } from "../ContractIntegration"; // Import your HOSTEVENT function

const ContractIntegration = () => {
  const [hostedEvents, setHostedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hosted events when the component mounts
  useEffect(() => {
    async function fetchHostedEvents() {
      try {
        const events = await FETCHHOSTEVENT(); // Call your function to fetch hosted events
        setHostedEvents(events);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchHostedEvents();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-white">
          {hostedEvents.map((event, index) => (
            <Cards
            key={index}
            name={event.name}
            ticket={event.ticket}
            price={event.price}
            location={event.location}
            date={event.date}
            time={event.time}
              // Add other event properties as needed
            />
          ))}   
        </div>
      )}
    </div>
  );
};

export default ContractIntegration;
