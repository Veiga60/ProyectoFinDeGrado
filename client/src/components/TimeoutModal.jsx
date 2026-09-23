import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../style/TimeoutModal.css'

export default function TimeoutModal({ teamTimeout, onClose, matchEvents, setMatchEvents }) {

    const location = useLocation();

    const [matchMinute, setMatchMinute] = useState('');
    const [matchSecond, setMatchSecond] = useState('');

    const setTimeout = () => {
        let newMatchEvents;
        if (matchEvents == undefined) {
            newMatchEvents = [{ timeout: { team: teamTimeout, matchTime: `${matchMinute}:${matchSecond}`, matchPeriod: location.state.matchPeriod } }];
        } else {
            newMatchEvents = [...matchEvents, { timeout: { team: teamTimeout, matchTime: `${matchMinute}:${matchSecond}`, matchPeriod: location.state.matchPeriod } }]
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
                    <div id='timeoutModalInputsDiv'>
                        <input className='timeoutModalInput' type="number" placeholder='Minuto' id="matchMinute" onChange={(e) => { setMatchMinute(e.target.value.padStart(2, '0')) }} />
                        <input className='timeoutModalInput' type="number" placeholder='Segundo' id="matchSecond" onChange={(e) => { setMatchSecond(e.target.value.padStart(2, '0')) }} />
                    </div>
                    <div id='timeoutModalButtonsDiv'>
                        <button className='timeoutModalButton' onClick={() => (matchMinute <= 25 && matchSecond <= 59 && matchMinute >= 0 && matchSecond >= 0) && [setTimeout(), onClose()]}>GUARDAR</button>
                        <button className='timeoutModalButton' onClick={() => onClose()}>CERRAR</button>
                    </div>
                </div>
            </div>
        </>
    )
}