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
import StartMatchTeam from './views/StartMatchTeam.jsx'
import MatchEvents from './views/MatchEvents.jsx'
import Forum from './views/Forum.jsx'
import ForumDebates from './views/ForumDebates.jsx'
import Messages from './views/Messages.jsx'
import Unauthorized from './views/Unauthorized.jsx'
import Orders from './views/Orders.jsx'
import './style/App.css'
import Recomendations from './views/Recomendations.jsx'
import RecomendationsPlayer from './views/RecomendationsPlayer.jsx'
import RecomendationsTeam from './views/RecomendationsTeam.jsx'

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
        <Route path="/matches/:matchId/start_match" element={<StartMatch />} />
        <Route path="/matches/:matchId/start_match/players/:playerId" element={<StartMatchPlayer />} />
        <Route path="/matches/:matchId/start_match/team" element={<StartMatchTeam />} />
        <Route path="/matches/:matchId/incidences" element={<MatchEvents />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/categories/:category" element={<ForumDebates />} />
        <Route path="/forum/categories/:category/:debateId" element={<Messages />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/recomendations/matches/:matchId" element={<Recomendations />} />
        <Route path="/recomendations/matches/:matchId/players/:playerId" element={<RecomendationsPlayer />} />
        <Route path="/recomendations/matches/:matchId/team" element={<RecomendationsTeam />} />
        <Route path="/error/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  )
}
