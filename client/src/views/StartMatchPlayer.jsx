import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios'
import '../style/StartMatchPlayer.css'

export default function StartMatchPlayer() {

    const SERVER_URL = 'http://localhost:8081';
    const { playerId } = useParams();

    const [player, setPlayer] = useState();
    const [goals, setGoals] = useState(0);

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
                    <div id='goalsDiv' className='statDiv'>
                        <p id='goalsTitle' className='statTitle'>GOLES</p>
                        <div id='matchGoalsDiv' className='matchStatDiv'>
                            <p id='matchGoals' className='matchStat'>{goals}</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}