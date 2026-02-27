import { useState } from 'react'
import { useParams } from 'react-router-dom'
import '../style/TimeoutModal.css'

export default function TimeoutModal({ teamTimeout, onClose, matchEvents, setMatchEvents }) {

    const SERVER_URL = 'http://localhost:8081';
    const { matchId } = useParams();
    const [players, setPlayers] = useState([]);
    const [scorer, setScorer] = useState();
    const [assister, setAssister] = useState();
    const [matchMinute, setMatchMinute] = useState('');
    const [matchSecond, setMatchSecond] = useState('');

    const setTimeout = () => {
        let newMatchEvents;
        if (matchEvents == undefined) {
            newMatchEvents = [{ timeout: { team: teamTimeout, matchTime: `${matchMinute}:${matchSecond}` } }];
        } else {
            newMatchEvents = [...matchEvents, { timeout: { team: teamTimeout, matchTime: `${matchMinute}:${matchSecond}` } }]
        }
        setMatchEvents(newMatchEvents);
    }

    return (
        <>
            <div id='timeoutModalMainDiv'>
                <div id='timeoutMainDiv'>
                    <div id='timeout'>
                        <p id='timeoutTitle'>TIEMPO MUERTO</p>
                    </div>
                    <input type="number" placeholder='Minuto partido' id="matchMinute" onChange={(e) => { setMatchMinute(e.target.value.padStart(2, '0')) }} />
                    <input type="number" placeholder='Segundo partido' id="matchSecond" onChange={(e) => { setMatchSecond(e.target.value.padStart(2, '0')) }} />
                    <button onClick={() => (matchMinute <= 20 && matchSecond <= 59 && matchMinute >= 0 && matchSecond >= 0) && [setTimeout(), onClose()]}>GUARDAR</button>
                    <button onClick={() => onClose()}>CERRAR</button>
                </div>
            </div>
        </>
    )
}