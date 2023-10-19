import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';


function App() {
  return (
    <div>
        <Router>
          <Routes>
          <Route path="/" Component={Home} />
          </Routes>
        </Router>
    </div>
  )
}

export default App