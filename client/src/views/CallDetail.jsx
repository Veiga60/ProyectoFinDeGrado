import Header from '../components/Header.jsx'
import Match from '../components/Match.jsx'
import PlayerCard from '../components/PlayerCard.jsx'
import { useState, useEffect, useContext } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import MatchCompressed from '../components/MatchCompressed.jsx'
import axios from 'axios'
import '../style/CallDetail.css'
import { AuthContext } from '../components/AuthContext.jsx'

export default function CallDetail() {

    const SERVER_URL = 'http://localhost:8081';
    const { matchId } = useParams();
    const location = useLocation();

    const [match, setMatch] = useState();
    const [players, setPlayers] = useState([]);
    const [call, setCall] = useState();
    const [width, setWidth] = useState(window.innerWidth)

    const { authenticatedUser } = useContext(AuthContext);

    const getMatch = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/${matchId}`, { withCredentials: true });
            setMatch(response.data);
            if (response.data.call != null) {
                setCall(response.data.call);
            }
        } catch (error) {
            console.log('Error fetching selected match: ', error);
        }
    }

    const getPlayers = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/players/clubTeam/${location.state?.clubTeamId}`, { withCredentials: true });
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
            await axios.put(`${SERVER_URL}/calls/${callId}/players/${authenticatedUser?.player?.id}`,
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
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        getMatch();
        getPlayers();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Header />
            <div id='callDetailContentDiv'>
                <div id='selectedMatchDiv'>
                    <div id='callDetailMatchDiv'>
                        {
                            (width >= 800) ? (
                                <Match
                                    match={match}
                                />
                            ) : (
                                <MatchCompressed
                                    match={match}
                                />
                            )
                        }
                    </div>
                    {
                        ((call != undefined && authenticatedUser?.isCoach == false && call?.callPlayerStatus[Number(authenticatedUser?.player?.id)] == 'PENDING')
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
                    <div id='playersTextDiv'>
                        <p id='playersText'>JUGADORES</p>
                    </div>
                    <div id='playersDiv'>
                        {players.map((player) =>
                            <PlayerCard
                                key={player.id}
                                player={player}
                                onClick={() => callPlayer(player.id)}
                                status={call?.callPlayerStatus[player.id]}
                                enableHover={authenticatedUser?.isCoach}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}