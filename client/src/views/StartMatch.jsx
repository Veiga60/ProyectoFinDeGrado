import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import ScoreBoard from '../components/ScoreBoard.jsx'
import UseAIModal from '../components/UseAIModal.jsx'
import axios from 'axios'
import '../style/StartMatch.css'


export default function StartMatch() {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();
    const { matchId } = useParams();
    const location = useLocation();

    const [useAIModal, setUseAIModal] = useState(false);

    const [matchEvents, setMatchEvents] = useState([]);

    const [match, setMatch] = useState();
    const localTeamGoals = matchEvents?.filter((matchEvent) => (matchEvent.goal) ? ((String(matchEvent.goal.team.id) === String(match?.localTeam.id))) : (0)).length || 0;
    const visitingTeamGoals = matchEvents?.filter((matchEvent) => (matchEvent.goal) ? ((String(matchEvent.goal.team.id) === String(match?.visitingTeam.id))) : (0)).length || 0;
    const [players, setPlayers] = useState([]);

    const [teamMatchStats, setTeamMatchStats] = useState();
    const [playersMatchStats, setPlayersMatchStats] = useState();
    const [goaliesMatchStats, setGoaliesMatchStats] = useState();

    const [matchPeriod, setMatchPeriod] = useState('period2');
    const [previousMatchPeriod, setPreviousMatchPeriod] = useState('period2');

    const [bonusPointTeam, setBonusPointTeam] = useState();

    const [prompt, setPrompt] = useState('');

    const toggleUseAIModal = () => {
        setUseAIModal(!useAIModal);
    }

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

    const fillTeamMatchStats = async () => {
        const teamMatchStatsBody = {
            matchResult: null,
            bonusPoint: false,
            goalsFor: 0,
            goalsAgainst: 0,
            powerPlayGoals: 0,
            powerPlayNoGoals: 0,
            penaltyKillGoals: 0,
            penaltyKillNoGoals: 0,
            oneVsZero: 0,
            oneVsOne: 0,
            twoVsOne: 0,
            twoVsTwo: 0,
            threeVsOne: 0,
            threeVsTwo: 0
        }

        try {
            await axios.put(`${SERVER_URL}/matchStats/matches/${matchId}/team`, teamMatchStatsBody, {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            });
        } catch (error) {
            console.log('Error actualizando estadísticas del equipo en el partido: ', error);
        }
    }

    const fillPlayersMatchStats = async () => {
        for (const player of players) {
            if (player.playerType == 'RINK_PLAYER') {
                const playerMatchStatsBody = {
                    goals: matchEvents.filter((matchEvent) => (matchEvent.goal?.scorer) ? (matchEvent.goal.scorer.id === player.id) : (0)).length || 0,
                    assists: matchEvents.filter((matchEvent) => (matchEvent.goal?.assister) ? (matchEvent.goal.assister.id === player.id) : (0)).length || 0,
                    plusMinus: 0,
                    shots: 0,
                    goodPasses: 0,
                    badPasses: 0,
                    recoveredPucks: 0,
                    lostPucks: 0,
                    penaltyMins: matchEvents?.filter((matchEvent) => (matchEvent.penalty?.player?.id == player.id)).reduce((accumulator, playerPenalty) => accumulator + Number(playerPenalty.penalty.penaltyTime), 0),
                    penaltyShotGoals: 0,
                    penaltyShotMisses: 0
                }

                try {
                    await axios.put(`${SERVER_URL}/matchStats/matches/${matchId}/players/${player.id}`, playerMatchStatsBody, {
                        headers: {
                            'Content-Type': 'application/json'
                        }, withCredentials: true
                    });
                } catch (error) {
                    console.log('Error actualizando estadísticas de jugador en el partido: ', error);
                }

            } else if (player.playerType == 'GOALIE') {
                const goalieMatchStatsBody = {
                    shotsReceived: 0,
                    goalsReceived: 0,
                    penaltyMins: matchEvents?.filter((matchEvent) => (matchEvent.penalty?.player?.id == player.id)).reduce((accumulator, playerPenalty) => accumulator + Number(playerPenalty.penalty.penaltyTime), 0),
                    penaltyShotGoals: 0,
                    penaltyShotSaves: 0
                }

                try {
                    await axios.put(`${SERVER_URL}/matchStats/matches/${matchId}/goalies/${player.id}`, goalieMatchStatsBody, {
                        headers: {
                            'Content-Type': 'application/json'
                        }, withCredentials: true
                    });
                } catch (error) {
                    console.log('Error actualizando estadísticas de portero en el partido: ', error);
                }
            }
        }
    }

    const prepareStatsToUpdate = async () => {
        try {
            if (location.state.playerStatsEdited == false) {
                await fillPlayersMatchStats();
            }

            if (location.state.teamStatsEdited == false) {
                await fillTeamMatchStats();
            }

            const playersMatchStatsResponse = await axios.get(`${SERVER_URL}/playersMatchStats/matches/${matchId}`, { withCredentials: true });
            const goaliesMatchStatsResponse = await axios.get(`${SERVER_URL}/goaliesMatchStats/matches/${matchId}`, { withCredentials: true });
            let teamMatchStatsResponse = await axios.get(`${SERVER_URL}/matchStats/matches/${matchId}/team`, { withCredentials: true });
            setPlayersMatchStats(playersMatchStatsResponse.data);
            setGoaliesMatchStats(goaliesMatchStatsResponse.data);
            setTeamMatchStats(teamMatchStatsResponse.data);
            if (match?.localTeam.name === 'Metropolitano HC') {
                teamMatchStatsResponse.data.goalsFor = localTeamGoals;
                teamMatchStatsResponse.data.goalsAgainst = visitingTeamGoals;
                if (localTeamGoals > visitingTeamGoals && matchPeriod == 'period2') {
                    teamMatchStatsResponse.data.matchResult = 'WIN';
                } else if (localTeamGoals < visitingTeamGoals && matchPeriod == 'period2') {
                    teamMatchStatsResponse.data.matchResult = 'LOSS';
                } else if (localTeamGoals > visitingTeamGoals && matchPeriod == 'overtime') {
                    teamMatchStatsResponse.data.matchResult = 'TIE';
                    teamMatchStatsResponse.data.bonusPoint = true;
                    await setBonusPointTeam(match?.localTeam);
                } else if (localTeamGoals < visitingTeamGoals && matchPeriod == 'overtime') {
                    teamMatchStatsResponse.data.matchResult = 'TIE';
                    teamMatchStatsResponse.data.bonusPoint = false;
                    await setBonusPointTeam(match?.visitingTeam);
                }
            } else {
                teamMatchStatsResponse.data.goalsFor = visitingTeamGoals;
                teamMatchStatsResponse.data.goalsAgainst = localTeamGoals;
                if (visitingTeamGoals > localTeamGoals && matchPeriod == 'period2') {
                    teamMatchStatsResponse.data.matchResult = 'WIN';
                } else if (visitingTeamGoals < localTeamGoals && matchPeriod == 'period2') {
                    teamMatchStatsResponse.data.matchResult = 'LOSS';
                } else if (visitingTeamGoals > localTeamGoals && matchPeriod == 'overtime') {
                    teamMatchStatsResponse.data.matchResult = 'TIE';
                    teamMatchStatsResponse.data.bonusPoint = true;
                    await setBonusPointTeam(match?.visitingTeam);
                } else if (visitingTeamGoals < localTeamGoals && matchPeriod == 'overtime') {
                    teamMatchStatsResponse.data.matchResult = 'TIE';
                    teamMatchStatsResponse.data.bonusPoint = false;
                    await setBonusPointTeam(match?.localTeam);
                }
            }
            return { teamMatchStats: teamMatchStatsResponse.data, playersMatchStats: playersMatchStatsResponse.data, goaliesMatchStats: goaliesMatchStatsResponse.data }
        } catch (error) {
            console.log('Error preparando las estadísticas a actualizar: ', error);
        }
    }

    const finishMatch = async () => {
        try {
            await axios.put(`${SERVER_URL}/playersStats/all/update`, playersMatchStats, { withCredentials: true });
            await axios.put(`${SERVER_URL}/goaliesStats/all/update`, goaliesMatchStats, { withCredentials: true });
            await axios.put(`${SERVER_URL}/teamStats/update`, teamMatchStats, { withCredentials: true });
            await axios.put(`${SERVER_URL}/matches/${matchId}/update`, {}, { params: { localTeamGoals: Number(localTeamGoals), visitingTeamGoals: Number(visitingTeamGoals), bonusPoint: Number(bonusPointTeam?.id) || null }, withCredentials: true })
            navigate('/home');
        } catch (error) {
            console.log('Could not finish match: ', error);
        }
    }

    const prepareAIPrompt = (stats) => {
        console.log('Equipo: ', teamMatchStats);
        console.log('Jugadores: ', playersMatchStats);
        console.log('Porteros: ', goaliesMatchStats);
        const aiPrompt = 'Eres un entrenador de hockey línea profesional, y sabes encontrtar las áreas a mejorar analizando las estadísticas de un partido.' +
            'Te voy a proporcionar unos datos que corresponden a estadísticas recopiladas durante un partido. ' +
            'Viendo esas estadísticas proporcioname las áreas a mejorar que consideres, para el equipo como conjunto y para cada jugador y portero, para trabajarlas en los entrenamientos de la siguiente semana. ' +
            'Las primeras estadísticas que te proporciono son las del equipo como conjunto, lo siguiente son dos listas con las estadísticas de cada jugador y cada portero del partido, respectivamente. ' +
            '**REGLAS**' +
            '- Devuelve solo el JSON, sin texto extra.' +
            '- Centrate solo en los campos que corresponden a las estadísticas del partido y en el id de cada jugador, si lo hubiera. Para las estadísticas no debes abrir ningún objeto dentro del que te he pasado.' +
            '- No me devuelvas las estadisticas que te he pasado. Quiero que me devuelvas las áreas que tú consideres que haya que mejorar de cara al siguiente partido basándote en los 3 tipos de estadístcas que te he pasado' +
            '- Las áreas a mejorar con personalizadas para cada jugador o portero.' +
            'Puedes devolver el resultado en formato JSON.' +
            `Estadísticas del equipo ${JSON.stringify(stats.teamMatchStats)}.` +
            `Lista de estadísticas de jugadores ${JSON.stringify(stats.playersMatchStats)}.` +
            `Lista de estadísticas de porteros ${JSON.stringify(stats.goaliesMatchStats)}.`
        setPrompt(aiPrompt);
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
        (location.state?.matchPeriod) ? (selectPeriod(location.state?.matchPeriod)) : (selectPeriod(matchPeriod))
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
                    <button id='finishMatchButton' onClick={async () => {
                        const statsToUpdate = await prepareStatsToUpdate();
                        prepareAIPrompt(statsToUpdate);
                        toggleUseAIModal();
                    }}>FINALIZAR PARTIDO</button>
                </div>
                <div id='matchInfoMainDiv'>
                    <div id='calledPlayersDiv'>
                        <table id='calledPlayersTable'>
                            <caption className='tableTitle'>JUGADORES</caption>
                            <tbody id='calledPlayersTableBody'>
                                {players.map(player =>
                                    ((match.call.callPlayerStatus[player.id] == 'CONFIRMED') && player.playerType == 'RINK_PLAYER') && (
                                        <tr key={player.id} className='calledPlayerRow'>
                                            <td className='calledPlayerNumber' onClick={() => navigate(`/matches/${matchId}/start_match/players/${player.id}`, { state: { matchPeriod: matchPeriod, matchEvents: matchEvents } })}>
                                                {player.number}
                                            </td>
                                            <td className='calledPlayerName' onClick={() => navigate(`/matches/${matchId}/start_match/players/${player.id}`, { state: { matchPeriod: matchPeriod, matchEvents: matchEvents } })}>
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
                                            <td className='calledGoalieNumber' onClick={() => navigate(`/matches/${matchId}/start_match/players/${player.id}`, { state: { matchPeriod: matchPeriod, matchEvents: matchEvents } })}>
                                                {player.number}
                                            </td>
                                            <td className='calledGoalieName' onClick={() => navigate(`/matches/${matchId}/start_match/players/${player.id}`, { state: { matchPeriod: matchPeriod, matchEvents: matchEvents } })}>
                                                {player.name} {player.lastName1} {player.lastName2}
                                            </td>
                                        </tr>
                                    )
                                )}

                            </tbody>
                        </table>
                        <button onClick={() => navigate(`/matches/${matchId}/start_match/team`, { state: { matchPeriod: matchPeriod, matchEvents: matchEvents } })}>ESTADISTICAS EQUIPO</button>
                        <button onClick={() => navigate(`/matches/${matchId}/incidences`, { state: { match: match, matchPeriod: matchPeriod, matchEvents: matchEvents } })}>INCIDENCIAS</button>
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
                {(useAIModal) &&
                    (
                        <UseAIModal
                            onClose={toggleUseAIModal}
                            onMatchFinished={finishMatch}
                            teamMatchStats={teamMatchStats}
                            playersMatchStats={playersMatchStats}
                            goaliesMatchStats={goaliesMatchStats}
                            prompt={prompt}
                        />
                    )}
            </div >
        </>
    )
}