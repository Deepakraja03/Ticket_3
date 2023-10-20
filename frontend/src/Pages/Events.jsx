// Events.js

import React, { useState, useEffect } from "react";
import Cards from "../Components/Cards";
import { FETCHHOSTEVENT } from "../ContractIntegration"; // Import the updated function

const Events = () => {
    const [hostedEvents, setHostedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchHostedEvents() {
            try {
                const events = await FETCHHOSTEVENT();
                setHostedEvents(events);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchHostedEvents();
    }, []); // Pass an empty dependency array to run the effect only once

    return (
        <div className="bg-black play-font">
            <h1 className="text-4xl text-yellow-400 flex justify-center pt-5 font-bold">Events</h1>

            <form className="mt-10 mx-72">
                {/* Your search form */}
            </form>

            <div className="grid grid-cols-3">
                {loading ? (
                    hostedEvents.map((event, index) => (
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
                    ))
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : (
                    <p className="text-white">Loading</p>
                )}
            </div>
        </div>
    );
};

export default Events;
