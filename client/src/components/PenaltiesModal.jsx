import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../style/PenaltiesModal.css'

export default function PenaltiesModal({ teamPenalty, onClose, matchEvents, setMatchEvents }) {

    const SERVER_URL = 'http://localhost:8081';
    const { matchId } = useParams();

    const [penaltyTime, setPenaltyTime] = useState(0);
    const [penaltyType, setPenaltyType] = useState('');
    const [players, setPlayers] = useState([]);
    const [playerPenalty, setPlayerPenalty] = useState();
    const [matchMinute, setMatchMinute] = useState();
    const [matchSecond, setMatchSecond] = useState();

    const getCalledPlayers = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/${matchId}`, { withCredentials: true });
            setPlayers(response.data.call.players);
        } catch (error) {
            console.log('Error al recuperar los jugadores: ', error);
        }
    }

    const setPenalty = () => {
        let newMatchEvents;
        if (matchEvents == undefined) {
            newMatchEvents = [{ penalty: { team: teamPenalty.name, penaltyType: penaltyType, penaltyTime: penaltyTime, player: playerPenalty } }];
        } else {
            newMatchEvents = [...matchEvents, { penalty: { team: teamPenalty.name, penaltyType: penaltyType, penaltyTime: penaltyTime, player: playerPenalty } }];
        }
        setMatchEvents(newMatchEvents);
    }

    useEffect(() => {
        if (teamPenalty.name == 'Metropolitano HC') {
            getCalledPlayers();
        }
    }, []);

    return (
        <>
            {(teamPenalty.name != 'Metropolitano HC') ?
                (
                    <div id='penaltiesModalMainDiv'>
                        <div id='penaltiesMainDiv'>
                            <div id='penalties'>
                                <div id='trippingDiv' className='penaltyDiv' onClick={() => setPenaltyType('ZANCADILLA')}>
                                    <p id='trippingText' className='penaltyText'>ZANCADILLA</p>
                                </div>
                                <div id='crossCheckingDiv' className='penaltyDiv' onClick={() => setPenaltyType('CARGA CON STICK')}>
                                    <p id='crossCheckingText' className='penaltyText'>CARGA CON STICK</p>
                                </div>
                            </div>
                            <input type='number' placeholder='Minutos' onChange={(e) => setPenaltyTime(e.target.value)} />
                            <input type="number" placeholder='Minuto' id="matchMinute" onChange={(e) => { setMatchMinute(e.target.value) }} />
                            <input type="number" placeholder='Segundo' id="matchSecond" onChange={(e) => { setMatchSecond(e.target.value) }} />
                            <button onClick={() => (penaltyTime == 2 || penaltyTime == 5 || penaltyTime == 10) && (matchMinute <= 20 && matchSecond <= 59 && matchMinute > 0 && matchSecond > 0) && ([setPenalty(), onClose()])}>GUARDAR</button>
                            <button onClick={() => onClose()}>CERRAR</button>
                        </div>
                    </div>
                ) : (
                    <div id='penaltiesModalMainDiv'>
                        <div id='penaltiesMainDiv'>
                            <div id='penaltiesAndNumbers'>
                                <div id='penalties'>
                                    <div id='trippingDiv' className='penaltyDiv' onClick={() => setPenaltyType('ZANCADILLA')}>
                                        <p id='trippingText' className='penaltyText'>ZANCADILLA</p>
                                    </div>
                                    <div id='crossCheckingDiv' className='penaltyDiv' onClick={() => setPenaltyType('CARGA CON STICK')}>
                                        <p id='crossCheckingText' className='penaltyText'>CARGA CON STICK</p>
                                    </div>
                                </div>
                                <div id='numbers'>
                                    {
                                        players.map((player) => {
                                            return <div key={player.id} className='goalNumber' onClick={() => setPlayerPenalty(player)}>{player.number}</div>
                                        })
                                    }
                                </div>
                            </div>
                            <input type='number' placeholder='Minutos' onChange={(e) => setPenaltyTime(e.target.value)} />
                            <button onClick={() => (penaltyTime == 2 || penaltyTime == 5 || penaltyTime == 10) && ([setPenalty(), onClose()])}>GUARDAR</button>
                            <button onClick={() => onClose()}>CERRAR</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}