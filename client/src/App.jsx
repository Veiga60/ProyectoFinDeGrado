import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './views/Login.jsx'
import Signup from './views/Signup.jsx'
import Matches from './views/Matches.jsx'
import './style/App.css'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    </BrowserRouter>
  )
}
