import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import '../style/PenaltiesModal.css'

export default function PenaltiesModal({ teamPenalty, onClose }) {

    const location = useLocation();
    const [matchEvents, setMatchEvents] = useState([]);
    const [match, setMatch] = useState();

    const [penaltyTime, setPenaltyTime] = useState(0);
    const [penaltyType, setPenaltyType] = useState('');

    const setPenalty = (team) => {
        let newMatchEvents;
        if (matchEvents == undefined) {
            newMatchEvents = [{ penalty: { team: team.name, penaltyType: penaltyType, penaltyTime: penaltyTime } }];
        } else {
            newMatchEvents = [...matchEvents, { penalty: { team: team.name, penaltyType: penaltyType, penaltyTime: penaltyTime } }];
        }
        setMatchEvents(newMatchEvents);
    }

    useEffect(() => {
        setMatchEvents(location.state.matchEvents)
        console.log(location);
    }, []);

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
                    <button onClick={() => [console.log('Hola', matchEvents), console.log(penaltyType), setPenalty(teamPenalty), onClose()]}>CERRAR</button>
                </div>
            </div>
        </>
    )
}