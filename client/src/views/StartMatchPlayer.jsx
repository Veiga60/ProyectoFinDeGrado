import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios'
import '../style/StartMatchPlayer.css'

export default function StartMatchPlayer() {

    const SERVER_URL = 'http://localhost:8081';
    const { playerId } = useParams();
    const { matchId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [matchEvents, setMatchEvents] = useState();

    const [player, setPlayer] = useState();
    const [plusMinus, setPlusMinus] = useState(0);
    const [shots, setShots] = useState(0);
    const [goodPasses, setGoodPasses] = useState(0);
    const [badPasses, setBadPasses] = useState(0);
    const [recoveredPucks, setRecoveredPucks] = useState(0);
    const [lostPucks, setLostPucks] = useState(0);
    const [playerPenaltyShotGoals, setPlayerPenaltyShotGoals] = useState(0);
    const [penaltyShotMisses, setPenaltyShotMisses] = useState(0);

    const [shotsReceived, setShotsReceived] = useState(0);
    const [goalsReceived, setGoalsReceived] = useState(0);
    const [goaliePenaltyMins, setGoaliePenaltyMins] = useState(0);
    const [goaliePenaltyShotGoals, setGoaliePenaltyShotGoals] = useState(0);
    const [penaltyShotSaves, setPenaltyShotSaves] = useState(0);

    const goals = matchEvents?.filter((matchEvent) => (matchEvent.goal) ? ((matchEvent.goal.scorer?.id) == player?.id) : (0)).length || 0;
    const assists = matchEvents?.filter((matchEvent) => (matchEvent.goal) ? ((matchEvent.goal.assister?.id) == player?.id) : (0)).length || 0;

    const playerPenalties = matchEvents?.filter((matchEvent) => (matchEvent.penalty?.player?.id == playerId));
    var playerPenaltyMins = playerPenalties?.reduce((accumulator, playerPenalty) => accumulator + Number(playerPenalty.penalty.penaltyTime), 0);

    var playerMatchStatsBody = {
        goals: goals,
        assists: assists,
        plusMinus: plusMinus,
        shots: shots,
        goodPasses: goodPasses,
        badPasses: badPasses,
        recoveredPucks: recoveredPucks,
        lostPucks: lostPucks,
        penaltyMins: playerPenaltyMins,
        penaltyShotGoals: playerPenaltyShotGoals,
        penaltyShotMisses: penaltyShotMisses
    }

    var goalieMatchStatsBody = {
        shotsReceived: shotsReceived,
        goalsReceived: goalsReceived,
        penaltyMins: goaliePenaltyMins,
        penaltyShotGoals: goaliePenaltyShotGoals,
        penaltyShotSaves: goaliePenaltyShotGoals
    }

    const getPlayer = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/players/${playerId}`, { withCredentials: true });
            if (response.data.playerType == 'RINK_PLAYER') {
                getPlayerMatchStats(response.data, matchId);
            } else if (response.data.playerType == 'GOALIE') {
                getGoalieMatchStats(response.data, matchId);
            }
            setPlayer(response.data);
        } catch (error) {
            console.log('Error fetching the player: ', error);
        }
    }

    const saveMatchStats = async (player) => {
        try {
            if (player?.playerType == 'RINK_PLAYER') {
                const response = await axios.put(`${SERVER_URL}/matchStats/matches/${matchId}/players/${player.id}`, playerMatchStatsBody, {
                    headers: {
                        'Content-Type': 'application/json'
                    }, withCredentials: true
                });
                navigate(`/matches/${matchId}/start_match`, { state: { matchEvents: matchEvents } });
            } else {
                const response = await axios.put(`${SERVER_URL}/matchStats/matches/${matchId}/goalies/${player.id}`, goalieMatchStatsBody, {
                    headers: {
                        'Content-Type': 'application/json'
                    }, withCredentials: true
                });
                navigate(`/matches/${matchId}/start_match`, { state: { matchEvents: matchEvents } });
            }
        } catch (error) {
            console.log(`Error saving the stats of player: `, error);
        }
    }

    const getPlayerMatchStats = async (player, matchId) => {
        if (player?.playerType == 'RINK_PLAYER') {
            try {
                const response = await axios.get(`${SERVER_URL}/matchStats/matches/${matchId}/players/${player?.id}`, { withCredentials: true });
                setPlusMinus(response?.data?.plusMinus);
                setShots(response?.data?.shots);
                setGoodPasses(response?.data?.goodPasses);
                setBadPasses(response?.data?.badPasses);
                setRecoveredPucks(response?.data?.recoveredPucks);
                setLostPucks(response?.data?.lostPucks);
                setPlayerPenaltyShotGoals(response?.data?.penaltyShotGoals);
                setPenaltyShotMisses(response?.data?.penaltyShotMisses);
            } catch (error) {
                console.log('Error fetching the stats of the player: ', error);
            }
        } else {
            return;
        }
    }

    const getGoalieMatchStats = async (player, matchId) => {
        if (player?.playerType == 'GOALIE') {
            try {
                const response = await axios.get(`${SERVER_URL}/matchStats/matches/${matchId}/goalies/${player?.id}`, { withCredentials: true });
                setShotsReceived(response.data.shotsReceived);
                setGoalsReceived(response.data.goalsReceived);
                setGoaliePenaltyMins(response.data.penaltyMins);
                setGoaliePenaltyShotGoals(response.data.penaltyShotGoals);
                setPenaltyShotSaves(response.data.penaltyShotSaves);
            } catch (error) {
                console.log('Error fetching the stats of the player: ', error);
            }
        } else {
            return;
        }
    }

    useEffect(() => {
        playerPenaltyMins = 0;
        getPlayer();
        setMatchEvents(location.state?.matchEvents);
    }, []);

    return (
        <>
            <div id='mainContentDiv'>
                <div id='matchPlayerDiv'>
                    <div id='matchPlayerImageDiv'>
                        <img id='matchPlayerImage' src={`/players/${player?.photo}`} alt={`${player?.name} ${player?.lastName1} ${player?.lastName2}`} />
                    </div>
                    <div id='matchPlayerNameDiv'>
                        <p id='matchPlayerNameText'>{player?.name} {player?.lastName1} {player?.lastName2}</p>
                    </div>
                </div>
                <div id='matchPlayerStatsDiv'>
                    {(player?.playerType == 'RINK_PLAYER') ?
                        (
                            <>
                                <div className='statDiv'>
                                    <p className='statTitle'>GOLES</p>
                                    <div className='matchStatDiv'>
                                        <p className='matchStat'>{goals}</p>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>ASISTENCIAS</p>
                                    <div className='matchStatDiv'>
                                        <p className='matchStat'>{assists}</p>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>PUNTOS</p>
                                    <div className='matchStatDiv'>
                                        <p className='matchStat'>{goals + assists}</p>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>+/-</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => [setPlusMinus(plusMinus - 1), console.log('Hola', playerPenalties)]}>-</button>
                                        <p className='matchStat'>{plusMinus}</p>
                                        <button className='plusButton' onClick={() => setPlusMinus(plusMinus + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>TIROS</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (shots > 0) && setShots(shots - 1)}>-</button>
                                        <p className='matchStat'>{shots}</p>
                                        <button className='plusButton' onClick={() => setShots(shots + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>PASES DETERMINANTES</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (goodPasses > 0) && setGoodPasses(goodPasses - 1)}>-</button>
                                        <p className='matchStat'>{goodPasses}</p>
                                        <button className='plusButton' onClick={() => setGoodPasses(goodPasses + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>PASES FALLADOS</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (badPasses > 0) && setBadPasses(badPasses - 1)}>-</button>
                                        <p className='matchStat'>{badPasses}</p>
                                        <button className='plusButton' onClick={() => setBadPasses(badPasses + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>PUCKS RECUPERADOS</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (recoveredPucks > 0) && setRecoveredPucks(recoveredPucks - 1)}>-</button>
                                        <p className='matchStat'>{recoveredPucks}</p>
                                        <button className='plusButton' onClick={() => setRecoveredPucks(recoveredPucks + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>PUCKS PERDIDOS</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (lostPucks > 0) && setLostPucks(lostPucks - 1)}>-</button>
                                        <p className='matchStat'>{lostPucks}</p>
                                        <button className='plusButton' onClick={() => setLostPucks(lostPucks + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>MINUTOS SANCIÓN</p>
                                    <div className='matchStatDiv'>
                                        <p className='matchStat'>{playerPenaltyMins}</p>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>PENALTIS METIDOS</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (playerPenaltyShotGoals > 0) && setPlayerPenaltyShotGoals(playerPenaltyShotGoals - 1)}>-</button>
                                        <p className='matchStat'>{playerPenaltyShotGoals}</p>
                                        <button className='plusButton' onClick={() => setPlayerPenaltyShotGoals(playerPenaltyShotGoals + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>PENALTIS FALLADOS</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (penaltyShotMisses > 0) && setPenaltyShotMisses(penaltyShotMisses - 1)}>-</button>
                                        <p className='matchStat'>{penaltyShotMisses}</p>
                                        <button className='plusButton' onClick={() => setPenaltyShotMisses(penaltyShotMisses + 1)}>+</button>
                                    </div>
                                </div>
                            </>
                        ) :
                        (
                            <>
                                <div className='statDiv'>
                                    <p className='statTitle'>% PARADAS</p>
                                    <div className='matchStatDiv'>
                                        <p className='matchStat'>{(shotsReceived > 0) && ((shotsReceived - goalsReceived) / (shotsReceived)).toFixed(3)}</p>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>TIROS RECIBIDOS</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (shotsReceived > 0) && setShotsReceived(shotsReceived - 1)}>-</button>
                                        <p className='matchStat'>{shotsReceived}</p>
                                        <button className='plusButton' onClick={() => setShotsReceived(shotsReceived + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>GOLES RECIBIDOS</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (goalsReceived > 0) && [setGoalsReceived(goalsReceived - 1), setShotsReceived(shotsReceived - 1)]}>-</button>
                                        <p className='matchStat'>{goalsReceived}</p>
                                        <button className='plusButton' onClick={() => [setGoalsReceived(goalsReceived + 1), setShotsReceived(shotsReceived + 1)]}>+</button>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>MINUTOS SANCIÓN</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (goaliePenaltyMins > 0) && setGoaliePenaltyMins(goaliePenaltyMins - 1)}>-</button>
                                        <p className='matchStat'>{goaliePenaltyMins}</p>
                                        <button className='plusButton' onClick={() => setGoaliePenaltyMins(goaliePenaltyMins + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>PENALTIS ENCAJADOS</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (goaliePenaltyShotGoals > 0) && setGoaliePenaltyShotGoals(goaliePenaltyShotGoals - 1)}>-</button>
                                        <p className='matchStat'>{goaliePenaltyShotGoals}</p>
                                        <button className='plusButton' onClick={() => setGoaliePenaltyShotGoals(goaliePenaltyShotGoals + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>PENALTIS PARADOS</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (penaltyShotSaves > 0) && setPenaltyShotSaves(penaltyShotSaves - 1)}>-</button>
                                        <p className='matchStat'>{penaltyShotSaves}</p>
                                        <button className='plusButton' onClick={() => setPenaltyShotSaves(penaltyShotSaves + 1)}>+</button>
                                    </div>
                                </div>
                            </>
                        )}
                    <button onClick={() => saveMatchStats(player)}>GUARDAR</button>
                    <button onClick={() => navigate(`/matches/${matchId}/start_match`, { state: { matchPeriod: location.state.matchPeriod, matchEvents: matchEvents } })}>VOLVER</button>
                </div>
            </div>
        </>
    )
}