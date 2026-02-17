import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../style/GoalsModal.css'

export default function GoalsModal({ onClose, matchEvents, setMatchEvents }) {

    const SERVER_URL = 'http://localhost:8081';
    const { matchId } = useParams();
    const [players, setPlayers] = useState([]);
    const [scorer, setScorer] = useState();
    const [assister, setAssister] = useState();

    const getCalledPlayers = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/${matchId}`, { withCredentials: true });
            setPlayers(response.data.call.players);
        } catch (error) {
            console.log('Error al recuperar los jugadores: ', error);
        }
    }

    const setGoal = (scorer, assister) => {
        let newMatchEvents;
        if (matchEvents == undefined) {
            newMatchEvents = [{ goal: { team: 'METROPOLITANO HC', scorer: scorer, assister: assister } }];
        } else {
            newMatchEvents = [...matchEvents, { goal: { team: 'METROPOLITANO HC', scorer: scorer, assister: assister } }]
        }
        setMatchEvents(newMatchEvents);
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
                                    return <div key={player.id} className='goalNumber' onClick={() => setScorer(player)}>{player.number}</div>
                                })
                            }
                        </div>
                        <div id='assist'>
                            {
                                players.map((player) => {
                                    return <div key={player.id} className='assistNumber' onClick={() => setAssister(player)}>{player.number}</div>
                                })
                            }
                        </div>
                    </div>
                    <button onClick={() => [setGoal(scorer, assister), onClose()]}>GUARDAR</button>
                    <button onClick={() => onClose()}>CERRAR</button>
                </div>
            </div>
        </>
    )
}