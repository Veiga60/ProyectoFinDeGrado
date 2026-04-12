import { useEffect, useState } from 'react'
import '../style/GoalsModal.css'

export default function GoalsModal({ teamGoal, onClose, matchEvents, setMatchEvents, match }) {

    const [players, setPlayers] = useState([]);
    const [scorer, setScorer] = useState();
    const [assister, setAssister] = useState();
    const [matchMinute, setMatchMinute] = useState('');
    const [matchSecond, setMatchSecond] = useState('');

    const setGoal = (scorer, assister) => {
        let newMatchEvents;
        if (matchEvents == undefined) {
            newMatchEvents = [{ goal: { team: teamGoal, scorer: scorer, assister: assister, matchTime: `${matchMinute}:${matchSecond}` } }];
        } else {
            newMatchEvents = [...matchEvents, { goal: { team: teamGoal, scorer: scorer, assister: assister, matchTime: `${matchMinute}:${matchSecond}` } }]
        }
        setMatchEvents(newMatchEvents);
    }

    useEffect(() => {
        setPlayers(match?.call.players);
    }, []);

    return (
        <>
            {(teamGoal.name != 'Metropolitano HC') ?
                (<div id='goalsModalMainDiv'>
                    <div id='goalsMainDiv'>
                        <div id='goalsAndAssists'>
                            <p id='goalTitle'>GOL ANOTADO</p>
                        </div>
                        <div className='goalsModalInputsDiv'>
                            <input className='goalsModalInput' type="number" placeholder='Minuto partido' id="matchMinute" onChange={(e) => { setMatchMinute(e.target.value.padStart(2, '0')) }} />
                            <input className='goalsModalInput' type="number" placeholder='Segundo partido' id="matchSecond" onChange={(e) => { setMatchSecond(e.target.value.padStart(2, '0')) }} />
                        </div>
                        <div className='goalsModalButtonDiv'>
                            <button className='goalsModalButton' onClick={() => (matchMinute <= 20 && matchSecond <= 59 && matchMinute >= 0 && matchSecond >= 0) && [setGoal(scorer, assister), onClose()]}>GUARDAR</button>
                            <button className='goalsModalButton' onClick={() => onClose()}>CERRAR</button>
                        </div>
                    </div>
                </div>)
                :
                (<div id='goalsModalMainDiv'>
                    <div id='goalsMainDiv'>
                        <div id='goalsAndAssists'>
                            <div id='goal'>
                                <p>GOL</p>
                                <div id='goalPlayerNumbers'>
                                    {
                                        players.map((player) => {
                                            return (match?.call.callPlayerStatus[player?.id] == 'CONFIRMED') && (< div key={player.id} className='goalNumber' onClick={() => setScorer(player)}>{player.number}</div>)
                                        })
                                    }
                                </div>
                            </div>
                            <div id='assist'>
                                <p>ASISTENCIA</p>
                                <div id='assistPlayerNumbers'>
                                    {
                                        players.map((player) => {
                                            return (match?.call.callPlayerStatus[player?.id] == 'CONFIRMED') && (<div key={player.id} className='assistNumber' onClick={() => setAssister(player)}>{player.number}</div>)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <input type="number" placeholder='Minuto partido' id="matchMinute" onChange={(e) => { setMatchMinute(e.target.value.padStart(2, '0')) }} />
                            <input type="number" placeholder='Segundo partido' id="matchSecond" onChange={(e) => { setMatchSecond(e.target.value.padStart(2, '0')) }} />
                        </div>
                        <div>
                            <button onClick={() => (matchMinute <= 20 && matchSecond <= 59 && matchMinute >= 0 && matchSecond >= 0) && [setGoal(scorer, assister), onClose()]}>GUARDAR</button>
                            <button onClick={() => onClose()}>CERRAR</button>
                        </div>
                    </div>
                </div >)
            }

        </>
    )
}