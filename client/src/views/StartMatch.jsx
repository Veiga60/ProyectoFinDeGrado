import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import ScoreBoard from '../components/ScoreBoard.jsx'
import axios from 'axios'
import '../style/StartMatch.css'


export default function StartMatch() {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();
    const { matchId } = useParams();
    const location = useLocation();

    const [matchEvents, setMatchEvents] = useState([]);

    const [match, setMatch] = useState();
    const localTeamGoals = matchEvents?.filter((matchEvent) => (matchEvent.goal) ? ((String(matchEvent.goal.team).toUpperCase() === String(match?.localTeam.name).toUpperCase())) : (0)).length || 0;
    const visitingTeamGoals = matchEvents?.filter((matchEvent) => (matchEvent.goal) ? ((String(matchEvent.goal.team).toUpperCase() === String(match?.visitingTeam.name).toUpperCase())) : (0)).length || 0;
    const [players, setPlayers] = useState([]);

    const getNextMatch = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/next`, { withCredentials: true });
            setMatch(response.data[0]);
            setPlayers(response.data[0].call.players);
            console.log(response.data[0]);
        } catch (error) {
            console.log('Error fetching next match: ', error);
        }
    }

    const finishMatch = async () => {
        try {
            const playerMatchStats = await axios.get(`${SERVER_URL}/playersMatchStats/matches/${matchId}`, { withCredentials: true });
            const goalieMatchStats = await axios.get(`${SERVER_URL}/goaliesMatchStats/matches/${matchId}`, { withCredentials: true });
            await axios.put(`${SERVER_URL}/playersStats/all/update`, playerMatchStats.data, { withCredentials: true });
            await axios.put(`${SERVER_URL}/goaliesStats/all/update`, goalieMatchStats.data, { withCredentials: true });
            navigate('/home');
        } catch (error) {
            console.log('Could not finish match: ', error);
        }
    }

    useEffect(() => {
        getNextMatch();
        setMatchEvents(location.state?.matchEvents);
        console.log(location.state);
    }, []);

    return (
        <>
            <div id='startMatchMainDiv'>
                <ScoreBoard
                    match={match}
                    localTeamGoals={localTeamGoals}
                    visitingTeamGoals={visitingTeamGoals}
                />
                <div id='finishMatchButtonDiv'>
                    <button id='finishMatchButton' onClick={() => finishMatch()}>FINALIZAR PARTIDO</button>
                </div>
                <div id='matchInfoMainDiv'>
                    <div id='calledPlayersDiv'>
                        <table id='calledPlayersTable'>
                            <caption className='tableTitle'>JUGADORES</caption>
                            <tbody id='calledPlayersTableBody'>
                                {players.map(player =>
                                    ((match.call.callPlayerStatus[player.id] == 'CONFIRMED') && player.playerType == 'RINK_PLAYER') && (
                                        <tr key={player.id} className='calledPlayerRow'>
                                            <td className='calledPlayerNumber' onClick={() => navigate(`/matches/${matchId}/start_match/players/${player.id}`, { state: { matchEvents: matchEvents } })}>
                                                {player.number}
                                            </td>
                                            <td className='calledPlayerName' onClick={() => navigate(`/matches/${matchId}/start_match/players/${player.id}`, { state: { matchEvents: matchEvents } })}>
                                                {player.name} {player.lastName1} {player.lastName2}
                                            </td>
                                        </tr>
                                    )
                                )}

                            </tbody>
                        </table>

                        <table id='calledGoaliesTable'>
                            <caption className='tableTitle'>PORTEROS</caption>
                            <tbody id='calledGoaliesTableBody'>
                                {players.map(player =>
                                    ((match.call.callPlayerStatus[player.id] == 'CONFIRMED') && player.playerType == 'GOALIE') && (
                                        <tr key={player.id} className='calledGoalieRow'>
                                            <td className='calledGoalieNumber' onClick={() => navigate(`/matches/${matchId}/start_match/players/${player.id}`, { state: { matchEvents: matchEvents } })}>
                                                {player.number}
                                            </td>
                                            <td className='calledGoalieName' onClick={() => navigate(`/matches/${matchId}/start_match/players/${player.id}`, { state: { matchEvents: matchEvents } })}>
                                                {player.name} {player.lastName1} {player.lastName2}
                                            </td>
                                        </tr>
                                    )
                                )}

                            </tbody>
                        </table>
                        <button onClick={() => navigate(`/matches/${matchId}/start_match/team`)}>ESTADISTICAS EQUIPO</button>
                        <button onClick={() => navigate(`/matches/${matchId}/incidences`, { state: { match: match, matchEvents: matchEvents } })}>INCIDENCIAS</button>
                        <button onClick={() => [console.log(location), console.log(matchEvents)]}>CONSOLA</button>
                    </div>
                    <div id='matchEventsContainer'>
                        <p id='matchEventsText'>ACTA DEL PARTIDO</p>
                        <div id='matchEventsDiv'>
                            {matchEvents?.map((matchEvent) => {
                                if (matchEvent.hasOwnProperty('goal')) {
                                    if (matchEvent.goal.scorer == undefined) {
                                        return <p id='matchEventsGoal' className='matchEvent'>GOL DE {matchEvent.goal.team}</p>
                                    } else {
                                        return <p className='matchEvent'>GOL DE {matchEvent.goal.team}. GOL: {matchEvent.goal.scorer.name} {matchEvent.goal.scorer.lastName1} {matchEvent.goal.scorer.lastName2}. {(matchEvent.goal.assister) && `ASISTENCIA: ${matchEvent.goal.assister?.name} ${matchEvent.goal.assister?.lastName1} ${matchEvent.goal.assister?.lastName2}`}</p>
                                    }
                                } else if (matchEvent.hasOwnProperty('penalty')) {
                                    return <p id='matchEventsPenalty' className='matchEvent'>FALTA DE {matchEvent.penalty.team}. {matchEvent.penalty.penaltyTime} por {matchEvent.penalty.penaltyType}</p>
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}