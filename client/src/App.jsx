import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './views/Login.jsx'
import Signup from './views/Signup.jsx'
import Home from './views/Home.jsx'
import Matches from './views/Matches.jsx'
import Stats from './views/Stats.jsx'
import PlayerStats from './views/PlayerStats.jsx'
import SelectRole from './views/SelectRole.jsx'
import Calls from './views/Calls.jsx'
import CallDetail from './views/CallDetail.jsx'
import StartMatch from './views/StartMatch.jsx'
import StartMatchPlayer from './views/StartMatchPlayer.jsx'
import Unauthorized from './views/Unauthorized.jsx'
import './style/App.css'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/stats/players/:playerId" element={<PlayerStats />} />
        <Route path="/select_role" element={<SelectRole />} />
        <Route path="/calls" element={<Calls />} />
        <Route path="/calls/match/:matchId" element={<CallDetail />} />
        <Route path="/matches/next/start_match" element={<StartMatch />} />
        <Route path="/matches/next/start_match/players/:playerId" element={<StartMatchPlayer />} />
        <Route path="/error/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  )
}
