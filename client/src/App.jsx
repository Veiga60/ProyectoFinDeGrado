import React from 'react'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Index from './Index.jsx'
import './style/App.css'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/index" element={<Index />} />
      </Routes>
    </BrowserRouter>
  )
}
