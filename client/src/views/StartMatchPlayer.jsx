import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
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
    var playerPenaltyMins = playerPenalties?.reduce((accumulator, playerPenalty) => accumulator + Number(playerPenalty.penalty.penaltyTime), 0) || 0;

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
                navigate(`/matches/${matchId}/start_match`, { state: { matchEvents: matchEvents, matchPeriod: location.state.matchPeriod, playerStatsEdited: true } });
            } else {
                const response = await axios.put(`${SERVER_URL}/matchStats/matches/${matchId}/goalies/${player.id}`, goalieMatchStatsBody, {
                    headers: {
                        'Content-Type': 'application/json'
                    }, withCredentials: true
                });
                navigate(`/matches/${matchId}/start_match`, { state: { matchEvents: matchEvents, matchPeriod: location.state.matchPeriod, playerStatsEdited: true } });
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
                <div id='startMatchPlayerRightDiv'>
                    <div id='matchPlayerStatsDiv'>
                        {(player?.playerType == 'RINK_PLAYER') ?
                            (
                                <>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{goals}</p>
                                            </div>
                                        </div>
                                        <p className='statTitle'>GOLES</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{assists}</p>
                                            </div>
                                        </div>
                                        <p className='statTitle'>ASISTENCIAS</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{goals + assists}</p>
                                            </div>
                                        </div>
                                        <p className='statTitle'>PUNTOS</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <FaCaretDown color='rgb(7, 78, 200)' size={40} onClick={() => setPlusMinus(plusMinus - 1)} />
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{plusMinus}</p>
                                            </div>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => setPlusMinus(plusMinus + 1)} />
                                        </div>
                                        <p className='statTitle'>+/-</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <FaCaretDown color='rgb(7, 78, 200)' size={40} onClick={() => (shots > 0) && setShots(shots - 1)} />
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{shots}</p>
                                            </div>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => setShots(shots + 1)} />
                                        </div>
                                        <p className='statTitle'>TIROS</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <FaCaretDown color='rgb(7, 78, 200)' size={40} onClick={() => (goodPasses > 0) && setGoodPasses(goodPasses - 1)} />
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{goodPasses}</p>
                                            </div>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => setGoodPasses(goodPasses + 1)} />
                                        </div>
                                        <p className='statTitle'>PASES DETERMINANTES</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <FaCaretDown color='rgb(7, 78, 200)' size={40} onClick={() => (badPasses > 0) && setBadPasses(badPasses - 1)} />
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{badPasses}</p>
                                            </div>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => setBadPasses(badPasses + 1)} />
                                        </div>
                                        <p className='statTitle'>PASES FALLADOS</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <FaCaretDown color='rgb(7, 78, 200)' size={40} onClick={() => (recoveredPucks > 0) && setRecoveredPucks(recoveredPucks - 1)} />
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{recoveredPucks}</p>
                                            </div>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => setRecoveredPucks(recoveredPucks + 1)} />
                                        </div>
                                        <p className='statTitle'>PUCKS RECUPERADOS</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <FaCaretDown color='rgb(7, 78, 200)' size={40} onClick={() => (lostPucks > 0) && setLostPucks(lostPucks - 1)} />
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{lostPucks}</p>
                                            </div>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => setLostPucks(lostPucks + 1)} />
                                        </div>
                                        <p className='statTitle'>PUCKS PERDIDOS</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{playerPenaltyMins}</p>
                                            </div>
                                        </div>
                                        <p className='statTitle'>MINUTOS SANCIÓN</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => (playerPenaltyShotGoals > 0) && setPlayerPenaltyShotGoals(playerPenaltyShotGoals - 1)} />
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{playerPenaltyShotGoals}</p>
                                            </div>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => setPlayerPenaltyShotGoals(playerPenaltyShotGoals + 1)} />
                                        </div>
                                        <p className='statTitle'>PENALTIS METIDOS</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <FaCaretDown color='rgb(7, 78, 200)' size={40} onClick={() => setPenaltyShotMisses(penaltyShotMisses + 1)} />
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{penaltyShotMisses}</p>
                                            </div>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => setPenaltyShotMisses(penaltyShotMisses + 1)} />
                                        </div>
                                        <p className='statTitle'>PENALTIS FALLADOS</p>
                                    </div>
                                </>
                            ) :
                            (
                                <>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <div id='savePercentageStatDiv' className='matchStatTextDiv'>
                                                <p className='matchStatText'>{(shotsReceived > 0) && ((shotsReceived - goalsReceived) / (shotsReceived)).toFixed(3)}</p>
                                            </div>
                                        </div>
                                        <p className='statTitle'>% PARADAS</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <FaCaretDown color='rgb(7, 78, 200)' size={40} onClick={() => (shotsReceived > 0) && setShotsReceived(shotsReceived - 1)} />
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{shotsReceived}</p>
                                            </div>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => setShotsReceived(shotsReceived + 1)} />
                                        </div>
                                        <p className='statTitle'>TIROS RECIBIDOS</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <FaCaretDown color='rgb(7, 78, 200)' size={40} onClick={() => (goalsReceived > 0) && [setGoalsReceived(goalsReceived - 1), setShotsReceived(shotsReceived - 1)]} />
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{goalsReceived}</p>
                                            </div>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => [setGoalsReceived(goalsReceived + 1), setShotsReceived(shotsReceived + 1)]} />
                                        </div>
                                        <p className='statTitle'>GOLES RECIBIDOS</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <FaCaretDown color='rgb(7, 78, 200)' size={40} onClick={() => (goaliePenaltyMins > 0) && setGoaliePenaltyMins(goaliePenaltyMins - 1)} />
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{goaliePenaltyMins}</p>
                                            </div>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => setGoaliePenaltyMins(goaliePenaltyMins + 1)} />
                                        </div>
                                        <p className='statTitle'>MINUTOS SANCIÓN</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <FaCaretDown color='rgb(7, 78, 200)' size={40} onClick={() => (goaliePenaltyShotGoals > 0) && setGoaliePenaltyShotGoals(goaliePenaltyShotGoals - 1)} />
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{goaliePenaltyShotGoals}</p>
                                            </div>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => setGoaliePenaltyShotGoals(goaliePenaltyShotGoals + 1)} />
                                        </div>
                                        <p className='statTitle'>PENALTIS ENCAJADOS</p>
                                    </div>
                                    <div className='statDiv'>
                                        <div className='matchStatDiv'>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => (penaltyShotSaves > 0) && setPenaltyShotSaves(penaltyShotSaves - 1)} />
                                            <div className='matchStatTextDiv'>
                                                <p className='matchStatText'>{penaltyShotSaves}</p>
                                            </div>
                                            <FaCaretUp color='rgb(7, 78, 200)' size={40} onClick={() => setPenaltyShotSaves(penaltyShotSaves + 1)} />
                                        </div>
                                        <p className='statTitle'>PENALTIS PARADOS</p>
                                    </div>
                                </>
                            )}
                    </div>
                    <div id='startMatchPlayerButtonsDiv'>
                        <button className='startMatchPlayerButton' onClick={() => saveMatchStats(player)}>GUARDAR</button>
                        <button className='startMatchPlayerButton' onClick={() => navigate(`/matches/${matchId}/start_match`, { state: { matchPeriod: location.state.matchPeriod, matchEvents: matchEvents, playerStatsEdited: false } })}>VOLVER</button>
                    </div>
                </div>
            </div >
        </>
    )
}