import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';

import Host from './Pages/Host1';
import Book from './Pages/Book';
import Events from './Pages/Events';


function App() {
  return (
    <div>
        <Router>
          <Routes>
          <Route path="/" Component={Home} />
          <Route path="/host" Component={Host} />
          <Route path="/book" Component={Book} />
          <Route path="/events" Component={Events} /> 


          </Routes>
        </Router>
    </div>
  )
}

export default App