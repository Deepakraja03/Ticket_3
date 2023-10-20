import React from "react";
import Navbar from "../Components/Navbar";
import { useState } from "react"


const Host = () => {
  const [Description, setDescription] = useState('')
  const [Eventname, setEventname] = useState('')
  const [Date, setDate] = useState('')
  const [Time, setTime] = useState('')
  const [Venue, setVenue] = useState('')
  const [Capacity, setCapacity] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    

    const host = {Description, Eventname, Date, Time, Venue}

    const response = await fetch('/api/host', {
      method: 'POST',
      body: JSON.stringify(host),
      headers: {
        'Content-Type': 'application/json',
        
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setDescription('')
      setEventname('')
      setDate('')
      setTime('')
      setVenue('')
      setError(null)
      setEmptyFields([])
  
    }
  }


    return ( 
      <div className=" play bg-gray-600 h-screen">
        <Navbar />
        <form class="   pb-10 mt-20 l-20"  >
        <div class=" pl-44">
       
        <div class="relative z-0 w-9/12 mb-6 group">
            <input type="text" name="description" onChange={(e) => setDescription(e.target.value)}
            value={Description}
            className={emptyFields.includes('Description') ? 'error' : ''} id="description" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder=" Description" required  />
            <label for="description" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-6" data-aos="fade-right"></label>
        </div> <div class="relative z-0 w-9/12 mb-6 group">
            <input type="text" onChange={(e) => setEventname(e.target.value)}
            value={Eventname}
            className={emptyFields.includes('Eventname') ? 'error' : ''}  name="EventName" id="EventName" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder=" Event Name" required />
            <label for="EventName" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-6" data-aos="fade-right"></label>
        </div>
        <div className="flex gap-28 ">
        <div class="relative z-0 w-1/3 mb-6 group">
            <input type="date" onChange={(e) => setDate(e.target.value)}
            value={Date}
            className={emptyFields.includes('Date') ? 'error' : ''} name="date" id="date" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder=" Date " required />
            <label for="date" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-6">From</label>
        </div>
        <div class="relative z-0 w-1/3 mb-6 group">
            <input type="date" onChange={(e) => setDate(e.target.value)}
            value={Date}
            className={emptyFields.includes('Date') ? 'error' : ''} name="date" id="date" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder=" Date " required />
            <label for="date" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-6">To</label>
        </div>
        </div>
        <div className="flex gap-28 ">
        <div class="relative z-0 w-1/3 mb-6 group">
            <input type="time" onChange={(e) => setTime(e.target.value)}    
            value={Time}
            className={emptyFields.includes('Time') ? 'error' : ''} name="time" id="time" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder=" Time" required />
            <label for="time" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-6">Start</label>
        </div>
        <div class="relative z-0 w-1/3 mb-6 group">
            <input type="time" onChange={(e) => setTime(e.target.value)}    
            value={Time}
            className={emptyFields.includes('Time') ? 'error' : ''} name="time" id="time" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder=" Time" required />
            <label for="time" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-6">End</label>
        </div>
        </div>
        </div>
      
        <div class=" pl-44">
        <div class="relative z-0 w-9/12 mb-6 group">
            <input type="text" onChange={(e) => setVenue(e.target.value)}
            value={Venue}
            className={emptyFields.includes('Venue') ? 'error' : ''} name="Venue" id="Venue" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder="Venue " required />
            <label for="Venue" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-6" data-aos="fade-right"></label>
        </div>
        <div class="relative z-0 w-9/12 mb-6 group">
            <input type="number" onChange={(e) => setCapacity(e.target.value)}
            value={Capacity}
            className={emptyFields.includes('Capacity') ? 'error' : ''} name="Capacity" id="Capacity" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder=" Capacity" required />
            <label for="Capacity" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-5" data-aos="fade-right"></label>
        </div>
        
        </div>
        <div class=" pl-44 ">
            <button type="submit" class="text-black font-semibold  bg-yellow-400 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-300 font-md rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-300 hover:scale-105 dark:focus:ring-black" onSubmit={handleSubmit}>Host</button>
        </div>
      </form>
      {error}
    </div>
     );
}
 
export default Host;