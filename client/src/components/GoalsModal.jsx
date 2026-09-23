import { useEffect, useState } from 'react'
import '../style/GoalsModal.css'
import { useLocation } from 'react-router-dom';

export default function GoalsModal({ teamGoal, onClose, matchEvents, setMatchEvents, match }) {

    const location = useLocation();

    const [players, setPlayers] = useState([]);
    const [scorer, setScorer] = useState();
    const [assister, setAssister] = useState();
    const [matchMinute, setMatchMinute] = useState('');
    const [matchSecond, setMatchSecond] = useState('');

    const [previousScorer, setPreviousScorer] = useState(null);
    const [previousAssister, setPreviousAssister] = useState(null);

    const selectScorer = (scorer) => {
        if (previousScorer !== null) {
            deselectPreviousScorer();
        }
        setScorer(scorer);
        document.getElementById(`scorer${scorer.number}`).className = 'selectedGoalNumber';
        setPreviousScorer(scorer);
    }

    const deselectPreviousScorer = () => {
        document.getElementById(`scorer${previousScorer.number}`).className = 'goalNumber';
    }

    const selectAssister = (assister) => {
        if (previousAssister !== null) {
            deselectPreviousAssister();
        }
        setAssister(assister);
        document.getElementById(`assister${assister.number}`).className = 'selectedGoalNumber';
        setPreviousAssister(assister);
    }

    const deselectPreviousAssister = () => {
        document.getElementById(`assister${previousAssister.number}`).className = 'assistNumber';
    }

    const setGoal = (scorer, assister) => {
        let newMatchEvents;
        if (matchEvents == undefined) {
            newMatchEvents = [{ goal: { team: teamGoal, scorer: scorer, assister: assister, matchTime: `${matchMinute}:${matchSecond}`, matchPeriod: location.state.matchPeriod } }];
        } else {
            newMatchEvents = [...matchEvents, { goal: { team: teamGoal, scorer: scorer, assister: assister, matchTime: `${matchMinute}:${matchSecond}`, matchPeriod: location.state.matchPeriod } }]
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
                            <input className='goalsModalInput' type="number" placeholder='Minuto' id="matchMinute" onChange={(e) => { setMatchMinute(e.target.value.padStart(2, '0')) }} />
                            <input className='goalsModalInput' type="number" placeholder='Segundo' id="matchSecond" onChange={(e) => { setMatchSecond(e.target.value.padStart(2, '0')) }} />
                        </div>
                        <div className='goalsModalButtonDiv'>
                            <button className='goalsModalButton' onClick={() => (matchMinute <= 25 && matchSecond <= 59 && matchMinute >= 0 && matchSecond >= 0) && [setGoal(scorer, assister), onClose()]}>GUARDAR</button>
                            <button className='goalsModalButton' onClick={() => onClose()}>CERRAR</button>
                        </div>
                    </div>
                </div>)
                :
                (<div id='goalsModalMainDiv'>
                    <div id='goalsMainDiv'>
                        <div id='goalsAndAssists'>
                            <div id='goal'>
                                <p id='goalTitle'>GOL</p>
                                <div id='goalPlayerNumbers'>
                                    {
                                        players.map((player) => {
                                            return (match?.call.callPlayerStatus[player?.id] == 'CONFIRMED') && (< div key={player.id} id={`scorer${player.number}`} className='goalNumber' onClick={() => selectScorer(player)}>{`${player.number}`.padStart(2, '0')}</div>)
                                        })
                                    }
                                </div>
                            </div>
                            <div id='assist'>
                                <p id='assistTitle'>ASISTENCIA</p>
                                <div id='assistPlayerNumbers'>
                                    {
                                        players.map((player) => {
                                            return (match?.call.callPlayerStatus[player?.id] == 'CONFIRMED') && (<div key={player.id} id={`assister${player.number}`} className='assistNumber' onClick={() => selectAssister(player)}>{`${player.number}`.padStart(2, '0')}</div>)
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='goalsModalInputsDiv'>
                            <input className='goalsModalInput' type="number" placeholder='Minuto' id="matchMinute" onChange={(e) => { setMatchMinute(e.target.value.padStart(2, '0')) }} />
                            <input className='goalsModalInput' type="number" placeholder='Segundo' id="matchSecond" onChange={(e) => { setMatchSecond(e.target.value.padStart(2, '0')) }} />
                        </div>
                        <div className='goalsModalButtonDiv'>
                            <button id='goalsModalSaveButton' className='goalsModalButton' onClick={() => (matchMinute <= 25 && matchSecond <= 59 && matchMinute >= 0 && matchSecond >= 0) && [setGoal(scorer, assister), onClose()]}>GUARDAR</button>
                            <button id='goalsModalReturnButton' className='goalsModalButton' onClick={() => onClose()}>CERRAR</button>
                        </div>
                    </div>
                </div >)
            }

        </>
    )
}