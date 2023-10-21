import React, { useState, useEffect } from "react";
import { GETUSERTICKETS,GETHOSTEVENTS } from "../ContractIntegration";
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [events, setEvents] = useState([]);
    const [showDetails, setShowDetails] = useState(false); // State variable to control visibility

    const viewTickets = async () => {
        try {
            const userTickets = await GETUSERTICKETS();
            setTickets(userTickets);
        } catch (error) {
            console.error("Error fetching user tickets:", error);
        }
    };
    const viewEvents = async () => {
        try {
            const hostEvents = await GETHOSTEVENTS();
            setEvents(hostEvents);
        } catch (error) {
            console.error("Error fetching user tickets:", error);
        }
    };

    console.log(tickets);
    useEffect(() => {
        viewTickets();
        viewEvents();
    }, []);

    return (
        <div className="bg-black h-screen play-font">
            <h1 className="text-4xl font-bold text-white pt-10 flex justify-center hover:underline">Dashboard</h1>
            <div className="text-white mx-2">
                {events.length > 0 ? (
                    <div className="grid grid-cols-3">
                        {events[0].map((event, index) => (
                            <div className="mt-10" key={index}>
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <a href="www.google.com">
                                    </a>
                                    <div className="p-5">
                                        <div className="hidden">
                                            {parseInt(events[0][index], 16)}
                                        </div>
                                        <a href="www.google.com">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
                                                {events[1][index].toString()}
                                            </h5>
                                        </a>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Event Location<br />{events[2][index].toString()}</p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Event's Ticket Remaining<br />{events[3][index].toString()}</p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Event Time<br />{parseInt(events[4][index])}</p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">IsActive<br />{events[5][index] ? 'Yes' : '?No'}</p>

                                        {showDetails ? (
                                            <div>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Host Address<br />{events[6][index]}</p>
                                                <button onClick={() => setShowDetails(false)}>Hide Details</button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setShowDetails(true)}>Show Details</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Loading events...</p>
                )}
            </div>
            <div>
                My Booked Tickets
                <div>
                    <div className="text-white mx-2">
                        {tickets.length > 0 ? (
                            <div className="grid grid-cols-3">
                                {tickets[0].map((event, index) => (
                                    <div className="mt-10" key={index}>
                                        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                            <a href="www.google.com">
                                            </a>
                                            <div className="p-5">
                                                <div className="hidden">
                                                    {parseInt(tickets[0][index], 16)}
                                                </div>
                                                <a href="www.google.com">
                                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hidden">
                                                        {tickets[1][index].toString()}
                                                    </h5>
                                                </a>
                                                <p className="mb-3 font-normal text-white text-2xl">{tickets[2][index].toString()}</p>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Event Location<br />{tickets[3][index].toString()}</p>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">No of Tickets<br />{parseInt(tickets[4][index])}</p>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Event Time<br />{parseInt(tickets[5][index])}</p>
                                                
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Loading events...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;