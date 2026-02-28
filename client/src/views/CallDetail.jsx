import Header from '../components/Header.jsx'
import Match from '../components/Match.jsx'
import PlayerCard from '../components/PlayerCard.jsx'
import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import '../style/CallDetail.css'

export default function CallDetail() {

    const SERVER_URL = 'http://localhost:8081';
    const { matchId } = useParams();
    const location = useLocation();

    const [match, setMatch] = useState();
    const [players, setPlayers] = useState([]);
    const [call, setCall] = useState();

    const getMatch = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/${matchId}`, { withCredentials: true });
            console.log(response.data);
            setMatch(response.data);
            console.log(response.data.call);
            if (response.data.call != null) {
                setCall(response.data.call);
            }
        } catch (error) {
            console.log('Error fetching selected match: ', error);
        }
    }

    const getPlayers = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/players`, { withCredentials: true });
            setPlayers(response.data);
        } catch (error) {
            console.log('Error fetching players: ', error);
        }
    }

    const callPlayer = async (playerId) => {
        try {
            await axios.put(`${SERVER_URL}/calls/match/${match.id}/players/${playerId}`, {}, { withCredentials: true });
            window.location.reload(true);
        } catch (error) {
            console.log('Error calling player: ', error);
        }
    }

    const setAttendance = async (callId, attendance) => {
        try {
            await axios.put(`${SERVER_URL}/calls/${callId}/players/${location.state.authenticatedUserPlayerId}`,
                {},
                {
                    params: { attendance: attendance },
                    withCredentials: true
                }
            );
            window.location.reload(true);
        } catch (error) {
            console.log('Error confirming attendance/not attendance: ', error);
        }
    }


    useEffect(() => {
        getMatch();
        getPlayers();
        console.log(location.state);
    }, []);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state.authenticatedUserPlayerId}
                isCoach={location.state.isCoach}
            />
            <div id='callDetailContentDiv'>
                <div id='selectedMatchDiv'>
                    <Match
                        match={match}
                    />
                    {
                        ((call != undefined && location.state?.isCoach == false && call?.callPlayerStatus[Number(location.state.authenticatedUserPlayerId)] == 'PENDING')
                            &&
                            (
                                <div id='attendanceButtonsDiv'>
                                    <button id='confirmAttendanceButton' onClick={() => setAttendance(call?.id, true)}>&#x2714;</button>
                                    <button id='confirmNotAttendanceButton' onClick={() => setAttendance(call?.id, false)}>&#x2716;</button>
                                </div>
                            ))
                    }
                </div>
                <div id='playersToCallDiv'>
                    {players.map((player) =>
                        <PlayerCard
                            key={player.id}
                            player={player}
                            onClick={() => callPlayer(player.id)}
                            status={call?.callPlayerStatus[player.id]}
                            enableHover={location.state?.isCoach}
                        />
                    )}
                </div>
            </div>
        </>
    )
}