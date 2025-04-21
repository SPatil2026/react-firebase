import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Create from './components/Create'
import Login from './components/Login'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Create />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}
