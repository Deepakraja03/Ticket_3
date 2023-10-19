// import React, { Component } from 'react';

// class EventHostForm extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       eventName: '',
//       eventTiming: '',
//       eventDateFrom: '',
//       eventDateTo: '',
//       eventVenue: '',
//       eventCapacity: '',
//     };
//   }

//   handleInputChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   }

//   handleSubmit = (e) => {
//     e.preventDefault();
//     // You can handle the form submission logic here, e.g., sending the data to an API or storing it in state.
//     console.log(this.state);
//   }

// render ()  {

//   return ( 

//     <div className="bg-gradient-to-l from-gray-700 via-gray-900 to-black pb-6">

//       <div className=" flex justify-center">
//         <p className="text-6xl font-bold pt-6 text-white ">Event Host Form</p>
//       </div>
//       <div className="">
//         <form onSubmit={this.handleSubmit}>
//           <div className="">
//             <label htmlFor="EventName">Event Name:</label>
//             <input type="text" id="EventName" name="EventName" value={this.state.EventName} onChange={this.handleInputChange} required />
//           </div>
//           <div className="">
//             <label htmlFor="EventDate">Event Date:</label>
//             <input type="text" id="EventDate" name="EventDate" value={this.state.eventDate} onChange={this.handleInputChange} required />
//           </div>
//           <div className="">
//             <label htmlFor="EventTiming">Event Timing:</label>
//             <input type="text" id="EventTiming" name="EventTiming" value={this.state.EventTiming} onChange={this.handleInputChange} required />
//           </div>
//           <div className="">
//             <label htmlFor="EventVenueTo">Event Venue (to):</label>
//             <input type="text" id="EventVenue" name="EventVenue" value={this.state.EventVenue} onChange={this.handleInputChange} required />
//           </div>
//           <div className="">
//             <label htmlFor="EventVenueFrom">Event Capacity (from):</label>
//             <input type="text" id="EventCapacity" name="EventCapacity" value={this.state.EventCapacity} onChange={this.handleInputChange} required />
//           </div>
//         </form>
//       </div>
//     </div>

//    );
// }
 
// export default Host;

import React, { Component } from 'react';
import Navbar from '../Components/Navbar';

class EventHostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventName: '',
      eventTiming: '',
      eventDateFrom: '',
      eventDateTo: '',
      eventVenue: '',
      eventCapacity: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here, e.g., sending the data to an API or storing it in state.
    console.log(this.state);
  }

  render() {
    return (
      
      <div className=' bg-black'>
        <Navbar/>
        <p className=' font-bold text-3xl flex justify-center md:text-6xl'>Event Host Form</p>
        <form onSubmit={this.handleSubmit}>
          <div className='flex justify-center grid-cols-2 pt-6'>
            <label className=' font-medium text-xl flex justify-center col-span-1 md:text-2xl' htmlFor="eventName">Event Name:</label>
            <input className=' flex justify-center col-span-1'
              type="text"
              id="eventName"
              name="eventName"
              value={this.state.eventName}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className='flex justify-center grid-cols-2 pt-6'>
            <label className=' font-medium text-xl flex justify-center col-span-1 md:text-4xl' htmlFor="eventTiming">Event Timing:</label>
            <input className=' flex justify-center col-span-1'
              type="text"
              id="eventTiming"
              name="eventTiming"
              value={this.state.eventTiming}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className='flex justify-center grid-cols-2 pt-6'>
            <label className=' font-medium text-xl flex justify-center md:text-4xl' htmlFor="eventDateFrom">Event Date (From):</label>
            <input className=' flex justify-center'
              type="date"
              id="eventDateFrom"
              name="eventDateFrom"
              value={this.state.eventDateFrom}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className='flex justify-center grid-cols-2 pt-6'>
            <label className='font-medium text-xl flex justify-center md:text-4xl' htmlFor="eventDateTo">Event Date (To):</label>
            <input className='flex justify-center'
              type="date"
              id="eventDateTo"
              name="eventDateTo"
              value={this.state.eventDateTo}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className='flex justify-center grid-cols-2 pt-6'>
            <label className=' font-medium text-xl flex justify-center md:text-4xl' htmlFor="eventVenue">Event Venue:</label>
            <input className=' flex justify-center'
              type="text"
              id="eventVenue"
              name="eventVenue"
              value={this.state.eventVenue}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className='flex justify-center grid-cols-2 pt-6'>
            <label className=' font-medium text-xl flex justify-center md:text-4xl' htmlFor="eventCapacity">Event Capacity:</label>
            <input className='flex justify-center'
              type="number"
              id="eventCapacity"
              name="eventCapacity"
              value={this.state.eventCapacity}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <button className=' flex justify-center pt-6 h-7 w-[100px] bg-gray-800 text-red rounded-full ' type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default EventHostForm;

