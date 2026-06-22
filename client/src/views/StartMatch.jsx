import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import ScoreBoard from '../components/ScoreBoard.jsx'
import UseAIModal from '../components/UseAIModal.jsx'
import axios from 'axios'
import '../style/StartMatch.css'
import GoalEvent from '../components/GoalEvent.jsx'
import PenaltyEvent from '../components/PenaltyEvent.jsx'
import TimeoutEvent from '../components/TimeoutEvent.jsx'
import FinishMatchErrorModal from '../components/FinishMatchErrorModal.jsx'
import { RiTeamFill } from "react-icons/ri";
import { PiHockeyFill } from "react-icons/pi";

export default function StartMatch() {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();
    const { matchId } = useParams();
    const location = useLocation();

    const [useAIModal, setUseAIModal] = useState(false);

    const [matchEvents, setMatchEvents] = useState([]);

    const [match, setMatch] = useState();
    const localTeamGoals = matchEvents?.filter((matchEvent) => (matchEvent.goal && matchEvent.goal.matchPeriod != 'overtime') ? ((String(matchEvent.goal.team.id) === String(match?.localTeam.id))) : (0)).length || 0;
    const visitingTeamGoals = matchEvents?.filter((matchEvent) => (matchEvent.goal && matchEvent.goal.matchPeriod != 'overtime') ? ((String(matchEvent.goal.team.id) === String(match?.visitingTeam.id))) : (0)).length || 0;

    const localTeamGoalsReal = matchEvents?.filter((matchEvent) => (matchEvent.goal) ? ((String(matchEvent.goal.team.id) === String(match?.localTeam.id))) : (0)).length || 0;
    const visitingTeamGoalsReal = matchEvents?.filter((matchEvent) => (matchEvent.goal) ? ((String(matchEvent.goal.team.id) === String(match?.visitingTeam.id))) : (0)).length || 0;

    const [players, setPlayers] = useState([]);

    const [teamMatchStats, setTeamMatchStats] = useState();
    const [playersMatchStats, setPlayersMatchStats] = useState();
    const [goaliesMatchStats, setGoaliesMatchStats] = useState();

    const [matchPeriod, setMatchPeriod] = useState('period1');
    const [previousMatchPeriod, setPreviousMatchPeriod] = useState('period1');

    const [bonusPointTeam, setBonusPointTeam] = useState();

    const [prompt, setPrompt] = useState('');

    const [finishMatchError, setFinishMatchError] = useState(false);

    const toggleUseAIModal = () => {
        setUseAIModal(!useAIModal);
    }

    const toggleFinishMatchErrorModal = () => {
        setFinishMatchError(!finishMatchError);
    }

    const getNextMatch = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/next`, { withCredentials: true });
            setMatch(response.data[0]);
            setPlayers(response.data[0].call.players);
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

        let savedPlayersStats = [];
        let savedGoaliesStats = [];

        try {
            const response = await axios.get(`${SERVER_URL}/playersMatchStats/matches/${matchId}`, { withCredentials: true });
            savedPlayersStats = response.data;
        } catch (error) {
            console.log("Error fetching player's match stats:", error);
        }

        try {
            const gRes = await axios.get(`${SERVER_URL}/goaliesMatchStats/matches/${matchId}`, { withCredentials: true });
            savedGoaliesStats = gRes.data;
        } catch (e) { }
        for (const player of players) {
            if (player.playerType == 'RINK_PLAYER') {

                const existing = savedPlayersStats.find(s => s.player.id === player.id);
                const playerMatchStatsBody = {
                    goals: matchEvents.filter((matchEvent) => (matchEvent.goal?.scorer) ? (matchEvent.goal.scorer.id == player.id) : (0)).length || 0,
                    assists: matchEvents.filter((matchEvent) => (matchEvent.goal?.assister) ? (matchEvent.goal.assister.id == player.id) : (0)).length || 0,
                    plusMinus: existing ? existing.plusMinus : 0,
                    shots: existing ? existing.shots : 0,
                    goodPasses: existing ? existing.goodPasses : 0,
                    badPasses: existing ? existing.badPasses : 0,
                    recoveredPucks: existing ? existing.recoveredPucks : 0,
                    lostPucks: existing ? existing.lostPucks : 0,
                    penaltyMins: matchEvents?.filter((matchEvent) => (matchEvent.penalty?.player?.id == player.id)).reduce((accumulator, playerPenalty) => accumulator + Number(playerPenalty.penalty.penaltyTime), 0),
                    penaltyShotGoals: existing ? existing.penaltyShotGoals : 0,
                    penaltyShotMisses: existing ? existing.penaltyShotMisses : 0
                }
                try {
                    await axios.put(`${SERVER_URL}/matchStats/matches/${matchId}/players/${player.id}`, playerMatchStatsBody, {
                        headers: { 'Content-Type': 'application/json' }, withCredentials: true
                    });
                } catch (error) {
                    console.log("Error updating player's stats: ", error);
                }
            } else if (player.playerType == 'GOALIE') {
                const existing = savedGoaliesStats.find(s => s.goalie.id === player.id);
                const goalieMatchStatsBody = {
                    shotsReceived: existing ? existing.shotsReceived : 0,
                    goalsReceived: existing ? existing.goalsReceived : 0,
                    penaltyMins: matchEvents?.filter((matchEvent) => (matchEvent.penalty?.player?.id == player.id)).reduce((accumulator, playerPenalty) => accumulator + Number(playerPenalty.penalty.penaltyTime), 0),
                    penaltyShotGoals: existing ? existing.penaltyShotGoals : 0,
                    penaltyShotSaves: existing ? existing.penaltyShotSaves : 0
                }
                try {
                    await axios.put(`${SERVER_URL}/matchStats/matches/${matchId}/goalies/${player.id}`, goalieMatchStatsBody, {
                        headers: { 'Content-Type': 'application/json' }, withCredentials: true
                    });
                } catch (error) {
                    console.log("Error updating goalie's stats: ", error);
                }
            }
        }
    }

    const prepareStatsToUpdate = async () => {
        try {
            await fillPlayersMatchStats();

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
                } else if (localTeamGoals === visitingTeamGoals && matchPeriod == 'overtime' && localTeamGoalsReal > visitingTeamGoalsReal) {
                    teamMatchStatsResponse.data.matchResult = 'TIE';
                    teamMatchStatsResponse.data.bonusPoint = true;
                    await setBonusPointTeam(match?.localTeam);
                } else if (localTeamGoals === visitingTeamGoals && matchPeriod == 'overtime' && localTeamGoalsReal < visitingTeamGoalsReal) {
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
                } else if (localTeamGoals === visitingTeamGoals && matchPeriod == 'overtime' && localTeamGoalsReal < visitingTeamGoalsReal) {
                    teamMatchStatsResponse.data.matchResult = 'TIE';
                    teamMatchStatsResponse.data.bonusPoint = true;
                    await setBonusPointTeam(match?.visitingTeam);
                } else if (localTeamGoals === visitingTeamGoals && matchPeriod == 'overtime' && localTeamGoalsReal > visitingTeamGoalsReal) {
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

        const playersStatsToPrompt = [];
        const goaliesStatsToPrompt = [];

        if (!stats) {
            console.error('Cannot get recomendations without stats');
            return;
        }

        for (const playerStats of stats.playersMatchStats) {
            const playerStatsAnonimized = {
                id: playerStats.id,
                playerId: playerStats.player.id,
                assists: playerStats.assist,
                badPasses: playerStats.badPasses,
                goals: playerStats.goals,
                goodPasses: playerStats.goodPasses,
                lostPucks: playerStats.lostPucks,
                matchId: playerStats.match.id,
                penaltyMins: playerStats.penaltyMins,
                penaltyShotGoals: playerStats.penaltyShotGoals,
                penaltyShotMisses: playerStats.penaltyShotMisses,
                plusMinus: playerStats.plusMinus,
                recoveredPucks: playerStats.recoveredPucks,
                shots: playerStats.shots
            }

            playersStatsToPrompt.push(playerStatsAnonimized);
        }

        for (const goalieStats of stats.goaliesMatchStats) {
            const goalieStatsAnonimized = {
                goalieId: goalieStats.goalie.id,
                goalsReceived: goalieStats.goalsReceived,
                id: goalieStats.id,
                matchId: goalieStats.match.id,
                penaltyMins: goalieStats.penaltyMins,
                penaltyShotGoals: goalieStats.penaltyShotGoals,
                penaltyShotSaves: goalieStats.penaltyShotSaves,
                shotsReceived: goalieStats.shotsReceived
            }

            goaliesStatsToPrompt.push(goalieStatsAnonimized);
        }

        const aiPrompt = 'Eres un entrenador de HOCKEY LINEA profesional, y sabes encontrar las áreas a mejorar analizando las estadísticas de un partido.' +
            'Viendo estas estadísticas de un partido proporcioname las áreas a mejorar que consideres, para el equipo como conjunto y para cada jugador y portero, para trabajarlas en los entrenamientos de la siguiente semana. ' +
            'Las primeras estadísticas que te proporciono son las del equipo, lo siguiente son dos listas con las estadísticas de cada jugador y cada portero del partido, respectivamente. Devuelve las areas a mejorar/entrenar en formato JSON. No me des un análisis general. Resume el JSON de la respuesta lo máximo de posible' +
            'TERMINOLOGIA' +
            '-Penalty kill significa que el equipo ha hecho una falta y está en inferioridad numérica durante un tiempo' +
            '-Power play es lo contrario. El equipo contrario ha hecho una falta y tenemos superioridad numérica durante un tiempo.' +
            '-Penalty shot = tiro de penalti.' +
            'A TENER EN CUENTA' +
            '-La respuesta en español' +
            '-No marcar gol en penalty kill es lo normal. Lo importante es que no te marquen. Siempre y cuando haya habido penalty killing.' +
            '-Un power play no lo genera el equipo. Falta del equipo contrario = power play.' +
            '-El power play merece ser mejorado si la eficacia es menor al 50%. 1 gol de 1 es perfecto. Si no ha habido power play, no nay nada que analizar' +
            '-La eficacia de los tiros debe ser entrenada cuando sea menor al 25%. Una eficacia superior a esa es buena estadística. No analices los goles independientemente. Analiza los goles en base a los tiros totales realizados.' +
            '-Las situaciones como 1vs0, 2vs1, etc son en ataque. Si acaba en gol = +1 punto. Si no = -1 punto en esa estadística.' +
            '-En este deporte se juega con un disco y 4vs4 + 1 portero en la pista. Los power play suelen ser 4vs3.' +
            '-No agrupes los jugadores ni los porteros en un mismo ' +
            '-Por favor que el json se divida en 3 partes (equipo, jugadores, porteros). En la parte de equipo, que la clave sea el area a entrenar y el valor la descripcion.' +
            'En la parte de jugadores, las claves seran el id de cada jugador, y el valor un objeto con clave el area a entrenar y valor la descripcion. Los porteros igual que los jugadores.' +
            `Estadísticas del equipo ${JSON.stringify(stats.teamMatchStats)}.` +
            `Lista de estadísticas de jugadores ${JSON.stringify(playersStatsToPrompt)}.` +
            `Lista de estadísticas de porteros ${JSON.stringify(goaliesStatsToPrompt)}.`
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
                        if (matchPeriod === 'period1' || localTeamGoalsReal === visitingTeamGoalsReal) {
                            toggleFinishMatchErrorModal();
                        } else {
                            const statsToUpdate = await prepareStatsToUpdate();
                            prepareAIPrompt(statsToUpdate);
                            toggleUseAIModal();
                        }
                    }}>FINALIZAR PARTIDO</button>
                </div>
                <div id='matchInfoMainDiv'>
                    <div id='startMatchLeftDiv'>
                        <div id='calledPlayersDiv'>
                            <table id='calledPlayersTable'>
                                <caption className='tableTitle'>JUGADORES</caption>
                                <tbody id='calledPlayersTableBody'>
                                    {players.map(player =>
                                        ((match.call.callPlayerStatus[player.id] == 'CONFIRMED') && player.playerType == 'RINK_PLAYER') && (
                                            <tr key={player.id} className='calledPlayerRow'>
                                                <td className='calledPlayerNumber' onClick={() => navigate(`/matches/${matchId}/start_match/players/${player.id}`, { state: { matchPeriod: matchPeriod, matchEvents: matchEvents } })}>
                                                    {`${player.number}`.padStart(2, '0')}
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
                                                    {`${player.number}`.padStart(2, '0')}
                                                </td>
                                                <td className='calledGoalieName' onClick={() => navigate(`/matches/${matchId}/start_match/players/${player.id}`, { state: { matchPeriod: matchPeriod, matchEvents: matchEvents } })}>
                                                    {player.name} {player.lastName1} {player.lastName2}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div id='startMatchButtonsDiv'>
                            <button className='startMatchButton' onClick={() => navigate(`/matches/${matchId}/start_match/team`, { state: { matchPeriod: matchPeriod, matchEvents: matchEvents } })}><RiTeamFill className='teamIcon' size={25} /><span>ESTADISTICAS EQUIPO</span></button>
                            <button className='startMatchButton' onClick={() => navigate(`/matches/${matchId}/incidences`, { state: { match: match, matchPeriod: matchPeriod, matchEvents: matchEvents } })}><PiHockeyFill className='eventsIcon' size={25} /><span>INCIDENCIAS</span></button>
                        </div>
                    </div>
                    <div id='matchEventsContainer'>
                        <p id='matchEventsText'>ACTA DEL PARTIDO</p>
                        <div id='matchEventsDiv'>
                            {matchEvents?.map((matchEvent) => {
                                if (matchEvent.hasOwnProperty('goal')) {
                                    if (matchEvent.goal.scorer == undefined) {
                                        return <GoalEvent
                                            matchPeriod={matchEvent.goal.matchPeriod}
                                            matchTime={matchEvent.goal.matchTime}
                                            team={matchEvent.goal.team}
                                            scorer={matchEvent.goal.scorer}
                                            assister={matchEvent.goal.assister}
                                        />
                                    } else {
                                        return <GoalEvent
                                            matchPeriod={matchEvent.goal.matchPeriod}
                                            matchTime={matchEvent.goal.matchTime}
                                            team={matchEvent.goal.team}
                                            scorer={matchEvent.goal.scorer}
                                            assister={matchEvent.goal.assister}
                                        />
                                    }
                                } else if (matchEvent.hasOwnProperty('penalty')) {
                                    return <PenaltyEvent
                                        matchPeriod={matchEvent.penalty.matchPeriod}
                                        matchTime={matchEvent.penalty.matchTime}
                                        team={matchEvent.penalty.team}
                                        player={matchEvent.penalty.player}
                                        penaltyTime={matchEvent.penalty.penaltyTime}
                                        penaltyType={matchEvent.penalty.penaltyType}
                                    />
                                } else if (matchEvent.hasOwnProperty('timeout')) {
                                    return <TimeoutEvent
                                        matchPeriod={matchEvent.timeout.matchPeriod}
                                        matchTime={matchEvent.timeout.matchTime}
                                        team={matchEvent.timeout.team}
                                    />
                                }
                            })}
                        </div>
                    </div>
                </div>
                {(useAIModal) && (matchPeriod !== 'period1') && ((localTeamGoalsReal !== visitingTeamGoalsReal)) &&
                    (
                        <UseAIModal
                            onClose={toggleUseAIModal}
                            onMatchFinished={finishMatch}
                            teamMatchStats={teamMatchStats}
                            playersMatchStats={playersMatchStats}
                            goaliesMatchStats={goaliesMatchStats}
                            prompt={prompt}
                            matchId={matchId}
                        />
                    )
                }
                {(finishMatchError) && (
                    <FinishMatchErrorModal onClose={toggleFinishMatchErrorModal} />
                )}
            </div >
        </>
    )
}