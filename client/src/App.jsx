import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './views/Login.jsx'
import Signup from './views/Signup.jsx'
import Matches from './views/Matches.jsx'
import Stats from './views/Stats.jsx'
import PlayerStats from './views/PlayerStats.jsx'
import SelectRole from './views/SelectRole.jsx'
import './style/App.css'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/stats/players/:id" element={<PlayerStats />} />
        <Route path="/select_role" element={<SelectRole />} />
      </Routes>
    </BrowserRouter>
  )
}
