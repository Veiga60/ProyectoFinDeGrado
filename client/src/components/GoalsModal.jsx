import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../style/GoalsModal.css'

export default function GoalsModal({ onClose, matchEvents, setMatchEvents }) {

    const SERVER_URL = 'http://localhost:8081';
    const { matchId } = useParams();
    const [players, setPlayers] = useState([]);

    const getCalledPlayers = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/${matchId}`, { withCredentials: true });
            setPlayers(response.data.call.players);
        } catch (error) {
            console.log('Error al recuperar los jugadores: ', error);
        }
    }

    useEffect(() => {
        getCalledPlayers();
    }, []);

    return (
        <>
            <div id='goalsModalMainDiv'>
                <div id='goalsMainDiv'>
                    <div id='goalsAndAssists'>
                        <div id='goal'>
                            {
                                players.map((player) => {
                                    return <div key={player.id} className='goalNumber'>{player.number}</div>
                                })
                            }
                        </div>
                        <div id='assist'>
                            {
                                players.map((player) => {
                                    return <div key={player.id} className='assistNumber'>{player.number}</div>
                                })
                            }
                        </div>
                    </div>
                    <button onClick={() => [setGoal(), onClose()]}>GUARDAR</button>
                    <button onClick={() => onClose()}>CERRAR</button>
                </div>
            </div>
        </>
    )
}