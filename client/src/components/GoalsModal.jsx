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
    const [matchMinute, setMatchMinute] = useState('');
    const [matchSecond, setMatchSecond] = useState('');

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
            newMatchEvents = [{ goal: { team: 'METROPOLITANO HC', scorer: scorer, assister: assister, matchTime: `${matchMinute}:${matchSecond}` } }];
        } else {
            newMatchEvents = [...matchEvents, { goal: { team: 'METROPOLITANO HC', scorer: scorer, assister: assister, matchTime: `${matchMinute}:${matchSecond}` } }]
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
                            <p>GOL</p>
                            <div id='goalPlayerNumbers'>
                                {
                                    players.map((player) => {
                                        return <div key={player.id} className='goalNumber' onClick={() => setScorer(player)}>{player.number}</div>
                                    })
                                }
                            </div>
                        </div>
                        <div id='assist'>
                            <p>ASISTENCIA</p>
                            <div id='assistPlayerNumbers'>
                                {
                                    players.map((player) => {
                                        return <div key={player.id} className='assistNumber' onClick={() => setAssister(player)}>{player.number}</div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <input type="number" placeholder='Minuto' id="matchMinute" onChange={(e) => { setMatchMinute(e.target.value.padStart(2, '0')) }} />
                    <input type="number" placeholder='Segundo' id="matchSecond" onChange={(e) => { setMatchSecond(e.target.value.padStart(2, '0')) }} />
                    <button onClick={() => (matchMinute <= 20 && matchSecond <= 59 && matchMinute >= 0 && matchSecond >= 0) && [setGoal(scorer, assister), onClose()]}>GUARDAR</button>
                    <button onClick={() => onClose()}>CERRAR</button>
                </div>
            </div>
        </>
    )
}