import React, { useState, useEffect } from "react";
import img from "../assets/lp.png";
import { GETALLEVENTS } from "../ContractIntegration";
import { Link } from "react-router-dom";

const Events = () => {
    const [eventList, setEventList] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const events = await GETALLEVENTS();
                if (events) {
                    setEventList(events);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        fetchEvents();
    }, []);
    console.log(eventList);
    return (
        <div className="bg-black play-font">
            <div>
                <h1 className="text-4xl text-yellow-400 flex justify-center pt-5 font-bold">Events</h1>
            </div>

            <form className="mt-10 mx-72">
                {/* Search form */}
            </form>
            <div className="text-white mx-2">
                {eventList.length > 0 ? (
                    <div className="grid grid-cols-3">
                        {eventList[0].map((event, index) => (
                            <div className="mt-10" key={index}>
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <a href="www.google.com">
                                        <img className="rounded-t-lg" src={img} alt="" />
                                    </a>
                                    <div className="p-5">
                                        <div className="hidden">
                                            {parseInt(eventList[0][index], 16)}
                                        </div>
                                        <a href="www.google.com">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {eventList[1][index].toString()}
                                            </h5>
                                        </a>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Event Location<br />{eventList[2][index].toString()}</p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">TotalTickets<br />{parseInt(eventList[3][index])}</p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">EventTimes<br />{parseInt(eventList[4][index])}</p>
                                        {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">IsActive<br />{eventList[5][index]}</p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">HostAddress<br />{eventList[6][index]}</p> */}
                                        <Link to={`/event/:${parseInt(eventList[0][index], 16)}`} >
                                        <button className="bg-blue-700 px-4 py-1 rounded-2xl hover:bg-blue-800 text-sm font-medium">
                                            Book
                                        </button>
                                        </Link>
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
    );
}

export default Events;
