import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import React from 'react'
import Header from './Header.jsx'
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import './style/App.css'

export default function App() {

    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    )
}
