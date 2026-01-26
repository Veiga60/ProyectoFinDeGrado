import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios'
import '../style/StartMatchPlayer.css'

export default function StartMatchPlayer() {

    const SERVER_URL = 'http://localhost:8081';
    const { playerId } = useParams();

    const [player, setPlayer] = useState();
    const [goals, setGoals] = useState(0);
    const [assists, setAssists] = useState(0);
    const [plusMinus, setPlusMinus] = useState(0);
    const [shots, setShots] = useState(0);
    const [goodPasses, setGoodPasses] = useState(0);
    const [badPasses, setBadPasses] = useState(0);
    const [recoveredPucks, setRecoveredPucks] = useState(0);
    const [penaltyMins, setPenaltyMins] = useState(0);
    const [penaltyShotGoals, setPenaltyShotGoals] = useState(0);
    const [penaltyShotMisses, setPenaltyShotMisses] = useState(0);

    const [shotsReceived, setShotsReceived] = useState(0);

    const getPlayer = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/players/${playerId}`, { withCredentials: true });
            setPlayer(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('Error fetching the player: ', error);
        }
    }

    useEffect(() => {
        getPlayer();
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
                                        <button className='minusButton' onClick={() => (goals > 0) && setGoals(goals - 1)}>-</button>
                                        <p className='matchStat'>{goals}</p>
                                        <button className='plusButton' onClick={() => setGoals(goals + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>ASISTENCIAS</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (assists > 0) && setAssists(assists - 1)}>-</button>
                                        <p className='matchStat'>{assists}</p>
                                        <button className='plusButton' onClick={() => setAssists(assists + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>+/-</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => setPlusMinus(plusMinus - 1)}>-</button>
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
                                    <p className='statTitle'>MINUTOS SANCIÓN</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (penaltyMins > 0) && setPenaltyMins(penaltyMins - 1)}>-</button>
                                        <p className='matchStat'>{penaltyMins}</p>
                                        <button className='plusButton' onClick={() => setPenaltyMins(penaltyMins + 1)}>+</button>
                                    </div>
                                </div>
                                <div className='statDiv'>
                                    <p className='statTitle'>PENALTIS METIDOS</p>
                                    <div className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (penaltyShotGoals > 0) && setPenaltyShotGoals(penaltyShotGoals - 1)}>-</button>
                                        <p className='matchStat'>{penaltyShotGoals}</p>
                                        <button className='plusButton' onClick={() => setPenaltyShotGoals(penaltyShotGoals + 1)}>+</button>
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
                            <div className='statDiv'>
                                <p className='statTitle'>TIROS RECIBIDOS</p>
                                <div className='matchStatDiv'>
                                    <p className='matchStat'>{shotsReceived}</p>
                                </div>
                            </div>
                        )}

                </div>
            </div>
        </>
    )
}