import { GETHOSTEVENTS, GETUSERTICKETS } from "../ContractIntegration";
import React, { useState, useEffect } from "react";
import Qrs from "./Qrs";

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [events, setEvents] = useState([]);

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

    console.log(events);
    useEffect(() => {
        viewTickets();
        viewEvents();
    }, []);

    return ( 
        <div className="bg-black play-font">
            <h1 className="text-4xl font-bold text-white pt-10 flex justify-center hover:underline">Dashboard</h1>
            <h1 className="flex justify-center py-5 font-bold text-white text-2xl">My Hosted Events</h1>
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
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">IsActive<br />{events[5][index]? 'Yes' : '?No'}</p>
                                        {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">HostAddress<br />{events[6][index]}</p> */}
                                        <Qrs />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="flex justify-center py-10">Loading events...</p>
                )}
            </div>
            <div className="text-white py-5">
                <h1 className="font-bold flex justify-center text-2xl">
                My Booked Tickets
                </h1>
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
                                        {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">HostAddress<br />{tickets[6][index]}</p> */}
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="flex justify-center py-10">Loading events...</p>
                )}
            </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;