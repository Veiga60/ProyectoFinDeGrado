import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import '../style/PenaltiesModal.css'

export default function PenaltiesModal({ teamPenalty, onClose, matchEvents, setMatchEvents }) {

    const [penaltyTime, setPenaltyTime] = useState(0);
    const [penaltyType, setPenaltyType] = useState('');

    const setPenalty = () => {
        let newMatchEvents;
        if (matchEvents == undefined) {
            newMatchEvents = [{ penalty: { team: teamPenalty.name, penaltyType: penaltyType, penaltyTime: penaltyTime } }];
        } else {
            newMatchEvents = [...matchEvents, { penalty: { team: teamPenalty.name, penaltyType: penaltyType, penaltyTime: penaltyTime } }];
        }
        setMatchEvents(newMatchEvents);
    }

    return (
        <>
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
                    <button onClick={() => [setPenalty(), onClose()]}>GUARDAR</button>
                    <button onClick={() => onClose()}>CERRAR</button>
                </div>
            </div>
        </>
    )
}