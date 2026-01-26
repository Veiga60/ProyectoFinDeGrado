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
                                <div id='goalsDiv' className='statDiv'>
                                    <p id='goalsTitle' className='statTitle'>GOLES</p>
                                    <div id='matchGoalsDiv' className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (goals > 0) && setGoals(goals - 1)}>-</button>
                                        <p id='matchGoals' className='matchStat'>{goals}</p>
                                        <button className='plusButton' onClick={() => setGoals(goals + 1)}>+</button>
                                    </div>
                                </div>
                                <div id='assistsDiv' className='statDiv'>
                                    <p id='assistsTitle' className='statTitle'>ASISTENCIAS</p>
                                    <div id='matchAssistsDiv' className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => (assists > 0) && setAssists(assists - 1)}>-</button>
                                        <p id='matchAssists' className='matchStat'>{assists}</p>
                                        <button className='plusButton' onClick={() => setAssists(assists + 1)}>+</button>
                                    </div>
                                </div>
                                <div id='plusMinusDiv' className='statDiv'>
                                    <p id='plusMinusTitle' className='statTitle'>+/-</p>
                                    <div id='matchPlusMinusDiv' className='matchStatDiv'>
                                        <button className='minusButton' onClick={() => setPlusMinus(plusMinus - 1)}>-</button>
                                        <p id='matchPlusMinus' className='matchStat'>{plusMinus}</p>
                                        <button className='plusButton' onClick={() => setPlusMinus(plusMinus + 1)}>+</button>
                                    </div>
                                </div>
                            </>
                        ) :
                        (
                            <div id='goalsDiv' className='statDiv'>
                                <p id='goalsTitle' className='statTitle'>TIROS RECIBIDOS</p>
                                <div id='matchGoalsDiv' className='matchStatDiv'>
                                    <p id='matchGoals' className='matchStat'>{shotsReceived}</p>
                                </div>
                            </div>
                        )}

                </div>
            </div>
        </>
    )
}