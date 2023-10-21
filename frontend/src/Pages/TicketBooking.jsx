import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BOOKING, VIEWONEEVENT } from "../ContractIntegration";

const EventDetails = () => {
    const [event, setEvent] = useState(null);
    const [transactionStatus, setTransactionStatus] = useState(null);
    const { id } = useParams();
    const [book, setBook] = useState({
        eventId: id,
        ticketCount: '',
    });

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
                        isActive: !!events[8],
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const bookTicket = async () => {
        try {
            const eventId = +id.replace(":", "").toString();
            console.log("eve",eventId)
            const { ticketCount } = book;
            console.log(book)
    
            if (!isNaN(eventId) && eventId !== undefined) {
                // Log the values for debugging
                console.log("event.ticketPrice:", event.ticketPrice);
                console.log("event.ticketCount:", book.ticketCount);
    
                const ticketCost = event.ticketPrice * book.ticketCount;
    
                if (isNaN(ticketCost)) {
                    console.error("Invalid ticket cost. Please check your inputs.");
                    setTransactionStatus("Transaction failed. Please try again.");
                    return;
                }
    
                // Convert the ticketCost to a string
                const ticketCostStr = ticketCost.toString();
    
                // Log the calculated ticketCost
                console.log("ticketCost:", ticketCostStr);
    
                const tokenId = await BOOKING({eventId, ticketCount, ticketCostStr});
                console.log("Transaction Hash:", tokenId);
                setTransactionStatus("Successfully submitted!");
            } else {
                console.error("Invalid event ID:", eventId);
                setTransactionStatus("Transaction failed. Please try again.");
            }
        } catch (error) {
            console.error("Error booking tickets:", error);
            setTransactionStatus("Transaction failed. Please try again.");
        }
    };
    
      
      
    return (
        <div className="bg-black play-font">
            <div>
                <h1 className="text-4xl text-yellow-400 flex justify-center pt-5 font-bold">
                    Event Hosted
                </h1>
            </div>

            <div className="text-white">
                <h2>Event ID: {id}</h2>

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

            <div>
                <input
                    type="number"
                    placeholder="No of tickets"
                    name="ticketCount"
                    min="1"
                    value={book.ticketCount}
                    onChange={handleChange}
                />
                <button onClick={bookTicket} className="text-white bg-red-600">
                    Book
                </button>
            </div>
        </div>
    );
};

export default EventDetails;