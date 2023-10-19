import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
<<<<<<< HEAD
import Host from './Pages/Host1';
=======
import Host from './Pages/Host';
import Book from './Pages/Book';
import Events from './Pages/Events';
>>>>>>> 9c4e248c64dd9ec2ccfcdeaa346d0055b5724125


function App() {
  return (
    <div>
        <Router>
          <Routes>
          <Route path="/" Component={Home} />
          <Route path="/host" Component={Host} />
          <Route path="/book" Component={Book} />
          <Route path="/event" Component={Events} /> 


          </Routes>
        </Router>
    </div>
  )
}

export default App