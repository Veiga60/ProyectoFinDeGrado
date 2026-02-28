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
    const localTeamGoals = matchEvents?.filter((matchEvent) => (matchEvent.goal) ? ((String(matchEvent.goal.team.id) === String(match?.localTeam.id))) : (0)).length || 0;
    const visitingTeamGoals = matchEvents?.filter((matchEvent) => (matchEvent.goal) ? ((String(matchEvent.goal.team.id) === String(match?.visitingTeam.id))) : (0)).length || 0;
    const [players, setPlayers] = useState([]);

    const [matchPeriod, setMatchPeriod] = useState('period1');
    const [previousMatchPeriod, setPreviousMatchPeriod] = useState('period1');

    const [bonusPointTeam, setBonusPointTeam] = useState();

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
            let teamMatchStats = await axios.get(`${SERVER_URL}/matchStats/matches/${matchId}/team`, { withCredentials: true });
            if (match?.localTeam.name === 'Metropolitano HC') {
                teamMatchStats.data.goalsFor = localTeamGoals;
                teamMatchStats.data.goalsAgainst = visitingTeamGoals;
                if (localTeamGoals > visitingTeamGoals && matchPeriod == 'period2') {
                    teamMatchStats.data.matchResult = 'WIN';
                } else if (localTeamGoals < visitingTeamGoals && matchPeriod == 'period2') {
                    teamMatchStats.data.matchResult = 'LOSS';
                } else if (localTeamGoals > visitingTeamGoals && matchPeriod == 'overtime') {
                    teamMatchStats.data.matchResult = 'TIE';
                    teamMatchStats.data.bonusPoint = true;
                    setBonusPointTeam(match?.localTeam);
                } else if (localTeamGoals < visitingTeamGoals && matchPeriod == 'overtime') {
                    teamMatchStats.data.matchResult = 'TIE';
                    teamMatchStats.data.bonusPoint = false;
                    setBonusPointTeam(match?.visitingTeam);
                }
            } else {
                teamMatchStats.data.goalsFor = visitingTeamGoals;
                teamMatchStats.data.goalsAgainst = localTeamGoals;
                if (visitingTeamGoals > localTeamGoals && matchPeriod == 'period2') {
                    teamMatchStats.data.matchResult = 'WIN';
                } else if (visitingTeamGoals < localTeamGoals && matchPeriod == 'period2') {
                    teamMatchStats.data.matchResult = 'LOSS';
                } else if (visitingTeamGoals > localTeamGoals && matchPeriod == 'overtime') {
                    teamMatchStats.data.matchResult = 'TIE';
                    teamMatchStats.data.bonusPoint = true;
                    setBonusPointTeam(match?.visitingTeam);
                } else if (visitingTeamGoals < localTeamGoals && matchPeriod == 'overtime') {
                    teamMatchStats.data.matchResult = 'TIE';
                    teamMatchStats.data.bonusPoint = false;
                    setBonusPointTeam(match?.localTeam);
                }
            }
            await axios.put(`${SERVER_URL}/playersStats/all/update`, playerMatchStats.data, { withCredentials: true });
            await axios.put(`${SERVER_URL}/goaliesStats/all/update`, goalieMatchStats.data, { withCredentials: true });
            await axios.put(`${SERVER_URL}/teamStats/update`, teamMatchStats.data, { withCredentials: true });
            await axios.put(`${SERVER_URL}/matches/${matchId}/update`, {}, { params: { localTeamGoals: Number(localTeamGoals), visitingTeamGoals: Number(visitingTeamGoals), bonusPoint: Number(bonusPointTeam?.id) || null }, withCredentials: true })
            navigate('/home');
        } catch (error) {
            console.log('Could not finish match: ', error);
        }
    }

    const selectPeriod = (period) => {
        deselectPreviousPeriod()
        setMatchPeriod(period);
        document.getElementById(period).className = 'matchPeriodSelected';
        setPreviousMatchPeriod(period);
    }

    const deselectPreviousPeriod = () => {
        document.getElementById(previousMatchPeriod).className = 'matchPeriod';
    }

    useEffect(() => {
        getNextMatch();
        setMatchEvents(location.state?.matchEvents);
        selectPeriod(matchPeriod);
    }, []);

    return (
        <>
            <div id='startMatchMainDiv'>
                <ScoreBoard
                    match={match}
                    localTeamGoals={localTeamGoals}
                    visitingTeamGoals={visitingTeamGoals}
                />
                <div id='matchPeriods'>
                    <div id='period1' className='matchPeriod' onClick={() => { selectPeriod('period1') }}><p className='matchPeriodText' onClick={() => { selectPeriod('period1') }}>P1</p></div>
                    <div id='period2' className='matchPeriod' onClick={() => { selectPeriod('period2') }}><p className='matchPeriodText' onClick={() => { selectPeriod('period2') }}>P2</p></div>
                    <div id='overtime' className='matchPeriod' onClick={() => { selectPeriod('overtime') }}><p className='matchPeriodText' onClick={() => { selectPeriod('overtime') }}>OT</p></div>
                </div>
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
                                        return <p id='matchEventsGoal' className='matchEvent'>[{matchEvent.goal.matchTime}] GOL DE {matchEvent.goal.team.name}</p>
                                    } else {
                                        return <p className='matchEvent'>[{matchEvent.goal.matchTime}] GOL DE {matchEvent.goal.team.name}. GOL: {matchEvent.goal.scorer.name} {matchEvent.goal.scorer.lastName1} {matchEvent.goal.scorer.lastName2}. {(matchEvent.goal.assister) && `ASISTENCIA: ${matchEvent.goal.assister?.name} ${matchEvent.goal.assister?.lastName1} ${matchEvent.goal.assister?.lastName2}`}</p>
                                    }
                                } else if (matchEvent.hasOwnProperty('penalty')) {
                                    return <p id='matchEventsPenalty' className='matchEvent'>[{matchEvent.penalty.matchTime}] FALTA DE {matchEvent.penalty.team}. {matchEvent.penalty.player?.name} {matchEvent.penalty.player?.lastName1} {matchEvent.penalty.player?.lastName2} {matchEvent.penalty.penaltyTime}' por {matchEvent.penalty.penaltyType}</p>
                                } else if (matchEvent.hasOwnProperty('timeout')) {
                                    return <p id='matchEventsTimeout' className='matchEvent'>[{matchEvent.timeout.matchTime}] TIEMPO MUERTO DE {matchEvent.timeout.team.name}.</p>
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}