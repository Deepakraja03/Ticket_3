import React, { useState, useEffect } from "react";
import img from "../assets/lp.png";
import { useParams } from "react-router-dom";
import { VIEWONEEVENT } from "../ContractIntegration";

const EventDetails = () => {
    const [event, setEvent] = useState(null); // Initialize as null
    const { id } = useParams();

    const viewEvent = async () => {
        const eventId = +id.replace(":", "");
        if (!isNaN(eventId) && eventId !== undefined) {
            try {
                const events = await VIEWONEEVENT(eventId);
                if (events) {
                    setEvent({
                        host: events[0],
                        eventName: events[1],
                        eventLocation: events[2],
                        totalTickets: parseInt(events[3]),
                        ticketsSold: parseInt(events[4]),
                        ticketPrice: parseInt(events[5]),
                        eventDate: parseInt(events[6]),
                        eventTime: parseInt(events[7]),
                        isActive: !!events[8] // Convert to a boolean
                    });
                } else {
                    console.error("No event data received.");
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        } else {
            console.error("Invalid event ID:", eventId);
        }
    };

    useEffect(() => {
        viewEvent();
    }, []);

    return (
        <div className="bg-black play-font">
            <div>
                <h1 className="text-4xl text-yellow-400 flex justify-center pt-5 font-bold">Event Hosted</h1>
            </div>

            <div className="text-white">
                <h2>Event ID: {id}</h2> {/* Display the original 'id' with the colon */}
                
                {/* Conditionally render event details */}
                {event ? (
                    <div className="block">
                        <p>Host: {event.host}</p>
                        <p>Event Name: {event.eventName}</p>
                        <p>Event Location: {event.eventLocation}</p>
                        <p>Total Tickets: {event.totalTickets}</p>
                        <p>Tickets Sold: {event.ticketsSold}</p>
                        <p>Ticket Price: {event.ticketPrice}</p>
                        <p>Event Date: {event.eventDate}</p>
                        <p>Active: {event.isActive ? "Yes" : "No"}</p>
                    </div>
                ) : (
                    <p>Loading event details...</p>
                )}
            </div>
        </div>
    );
}

export default EventDetails;
