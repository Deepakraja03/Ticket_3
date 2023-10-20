import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';

import Host from './Pages/Host';
import Events from "./Pages/Events"
import Dashboard from './Pages/Dashboard';


function App() {
  return (
    <div>
        <Router>
          <Routes>
          <Route path="/" Component={Home} />
          <Route path="/host" Component={Host} />
          <Route path="/Dashboard" Component={Dashboard} />
          <Route path="/events" Component={Events} /> 


          </Routes>
        </Router>
    </div>
  )
}

export default App