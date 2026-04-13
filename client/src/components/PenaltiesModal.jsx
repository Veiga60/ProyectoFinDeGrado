import { useState, useEffect } from 'react';
import '../style/PenaltiesModal.css'

export default function PenaltiesModal({ teamPenalty, onClose, matchEvents, setMatchEvents, match }) {

    const [penaltyTime, setPenaltyTime] = useState(0);
    const [penaltyType, setPenaltyType] = useState('');
    const [players, setPlayers] = useState([]);
    const [playerPenalty, setPlayerPenalty] = useState();
    const [matchMinute, setMatchMinute] = useState();
    const [matchSecond, setMatchSecond] = useState();

    const setPenalty = () => {
        let newMatchEvents;
        if (matchEvents == undefined) {
            newMatchEvents = [{ penalty: { team: teamPenalty.name, penaltyType: penaltyType, penaltyTime: penaltyTime, player: playerPenalty, matchTime: `${matchMinute}:${matchSecond}` } }];
        } else {
            newMatchEvents = [...matchEvents, { penalty: { team: teamPenalty.name, penaltyType: penaltyType, penaltyTime: penaltyTime, player: playerPenalty, matchTime: `${matchMinute}:${matchSecond}` } }];
        }
        setMatchEvents(newMatchEvents);
    }

    useEffect(() => {
        if (teamPenalty.name == 'Metropolitano HC') {
            setPlayers(match?.call.players);
        }
    }, []);

    return (
        <>
            {(teamPenalty.name != 'Metropolitano HC') ?
                (
                    <div id='penaltiesModalMainDiv'>
                        <div id='penaltiesMainDiv'>
                            <div id='penaltiesTitleDiv'>
                                <p id='penaltiesTitleText'>PENALIZACIÓN</p>
                            </div>
                            <div id='penalties'>
                                <div id='trippingDiv' className='penaltyDiv' onClick={() => setPenaltyType('ZANCADILLA')}>
                                    <p id='trippingText' className='penaltyText'>ZC</p>
                                </div>
                                <div id='chargingDiv' className='penaltyDiv' onClick={() => setPenaltyType('CARGA')}>
                                    <p id='chargingText' className='penaltyText'>CG</p>
                                </div>
                                <div id='roughingDiv' className='penaltyDiv' onClick={() => setPenaltyType('VIOLENCIA INNECESARIA')}>
                                    <p id='roughingText' className='penaltyText'>VI</p>
                                </div>
                                <div id='unsportsmanlikeDiv' className='penaltyDiv' onClick={() => setPenaltyType('CONDUCTA ANTIDEPORTIVA')}>
                                    <p id='unsportsmanlikeText' className='penaltyText'>CA</p>
                                </div>
                                <div id='hookingDiv' className='penaltyDiv' onClick={() => setPenaltyType('ENGANCHAR')}>
                                    <p id='hookingText' className='penaltyText'>EG</p>
                                </div>
                                <div id='holdingDiv' className='penaltyDiv' onClick={() => setPenaltyType('AGARRAR')}>
                                    <p id='holdingText' className='penaltyText'>AG</p>
                                </div>
                                <div id='elbowingDiv' className='penaltyDiv' onClick={() => setPenaltyType('CODAZO')}>
                                    <p id='elbowingText' className='penaltyText'>CZ</p>
                                </div>
                                <div id='kneeingDiv' className='penaltyDiv' onClick={() => setPenaltyType('RODILLAZO')}>
                                    <p id='kneeingText' className='penaltyText'>RZ</p>
                                </div>
                                <div id='crossCheckingDiv' className='penaltyDiv' onClick={() => setPenaltyType('CARGA CON STICK')}>
                                    <p id='crossCheckingText' className='penaltyText'>CC</p>
                                </div>
                                <div id='slashingDiv' className='penaltyDiv' onClick={() => setPenaltyType('GOLPEAR CON EL STICK')}>
                                    <p id='slashingText' className='penaltyText'>SL</p>
                                </div>
                                <div id='highStickingDiv' className='penaltyDiv' onClick={() => setPenaltyType('STICK ALTO')}>
                                    <p id='highStickingText' className='penaltyText'>SA</p>
                                </div>
                                <div id='spearingDiv' className='penaltyDiv' onClick={() => setPenaltyType('GOLPEAR CON LA PUNTA DEL STICK')}>
                                    <p id='spearingText' className='penaltyText'>SP</p>
                                </div>
                                <div id='butEndingDiv' className='penaltyDiv' onClick={() => setPenaltyType('GOLPEAR CON EL TACO DEL STICK')}>
                                    <p id='butEndingText' className='penaltyText'>BE</p>
                                </div>
                                <div id='misconductDiv' className='penaltyDiv' onClick={() => setPenaltyType('MALA CONDUCTA')}>
                                    <p id='misconductText' className='penaltyText'>MC</p>
                                </div>
                                <div id='gameMisconductDiv' className='penaltyDiv' onClick={() => setPenaltyType('MALA CONDUCTA EN EL JUEGO')}>
                                    <p id='gameMisconductText' className='penaltyText'>MCJ</p>
                                </div>
                                <div id='matchPenaltyDiv' className='penaltyDiv' onClick={() => setPenaltyType('PENALIZACIÓN DE PARTIDO')}>
                                    <p id='matchPenaltyText' className='penaltyText'>PP</p>
                                </div>
                                <div id='benchPenaltyDiv' className='penaltyDiv' onClick={() => setPenaltyType('PENALIZACIÓN DE BANQUILLO')}>
                                    <p id='benchPenaltyText' className='penaltyText'>PB</p>
                                </div>
                                <div id='delayOfGameDiv' className='penaltyDiv' onClick={() => setPenaltyType('RETRASO EN EL JUEGO')}>
                                    <p id='delayOfGameText' className='penaltyText'>RJ</p>
                                </div>
                                <div id='penaltyShotDiv' className='penaltyDiv' onClick={() => setPenaltyType('TIRO DE PENALTI')}>
                                    <p id='penaltyShotText' className='penaltyText'>TP</p>
                                </div>
                                <div id='improperEquipmentDiv' className='penaltyDiv' onClick={() => setPenaltyType('EQUIPACIÓN INDEVIDA')}>
                                    <p id='improperEquipmentText' className='penaltyText'>EI</p>
                                </div>
                            </div>
                            <div id='penaltiesModalInputsDiv'>
                                <input className='penaltiesModalInput' type='number' placeholder='Minutos' onChange={(e) => setPenaltyTime(e.target.value)} />
                                <input className='penaltiesModalInput' type="number" placeholder='Minuto' id="matchMinute" onChange={(e) => { setMatchMinute(e.target.value.padStart(2, '0')) }} />
                                <input className='penaltiesModalInput' type="number" placeholder='Segundo' id="matchSecond" onChange={(e) => { setMatchSecond(e.target.value.padStart(2, '0')) }} />
                            </div>
                            <div id='penaltiesModalButtonsDiv'>
                                <button className='penaltiesModalButton' onClick={() => (penaltyTime == 2 || penaltyTime == 5 || penaltyTime == 10) && (matchMinute <= 20 && matchSecond <= 59 && matchMinute >= 0 && matchSecond >= 0) && ([setPenalty(), onClose()])}>GUARDAR</button>
                                <button className='penaltiesModalButton' onClick={() => onClose()}>CERRAR</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div id='penaltiesModalMainDiv'>
                        <div id='penaltiesMainDiv'>
                            <div id='penaltiesAndNumbers'>
                                <div id='penaltiesMyTeam'>
                                    <p className='titleText'>PENALIZACIÓN</p>
                                    <div id='penaltiesMyTeamDiv'>
                                        <div id='trippingDiv' className='penaltyDiv' onClick={() => setPenaltyType('ZANCADILLA')}>
                                            <p id='trippingText' className='penaltyText'>ZC</p>
                                        </div>
                                        <div id='chargingDiv' className='penaltyDiv' onClick={() => setPenaltyType('CARGA')}>
                                            <p id='chargingText' className='penaltyText'>CG</p>
                                        </div>
                                        <div id='roughingDiv' className='penaltyDiv' onClick={() => setPenaltyType('VIOLENCIA INNECESARIA')}>
                                            <p id='roughingText' className='penaltyText'>VI</p>
                                        </div>
                                        <div id='unsportsmanlikeDiv' className='penaltyDiv' onClick={() => setPenaltyType('CONDUCTA ANTIDEPORTIVA')}>
                                            <p id='unsportsmanlikeText' className='penaltyText'>CA</p>
                                        </div>
                                        <div id='hookingDiv' className='penaltyDiv' onClick={() => setPenaltyType('ENGANCHAR')}>
                                            <p id='hookingText' className='penaltyText'>EG</p>
                                        </div>
                                        <div id='holdingDiv' className='penaltyDiv' onClick={() => setPenaltyType('AGARRAR')}>
                                            <p id='holdingText' className='penaltyText'>AG</p>
                                        </div>
                                        <div id='elbowingDiv' className='penaltyDiv' onClick={() => setPenaltyType('CODAZO')}>
                                            <p id='elbowingText' className='penaltyText'>CZ</p>
                                        </div>
                                        <div id='kneeingDiv' className='penaltyDiv' onClick={() => setPenaltyType('RODILLAZO')}>
                                            <p id='kneeingText' className='penaltyText'>RZ</p>
                                        </div>
                                        <div id='crossCheckingDiv' className='penaltyDiv' onClick={() => setPenaltyType('CARGA CON STICK')}>
                                            <p id='crossCheckingText' className='penaltyText'>CC</p>
                                        </div>
                                        <div id='slashingDiv' className='penaltyDiv' onClick={() => setPenaltyType('GOLPEAR CON EL STICK')}>
                                            <p id='slashingText' className='penaltyText'>SL</p>
                                        </div>
                                        <div id='highStickingDiv' className='penaltyDiv' onClick={() => setPenaltyType('STICK ALTO')}>
                                            <p id='highStickingText' className='penaltyText'>SA</p>
                                        </div>
                                        <div id='spearingDiv' className='penaltyDiv' onClick={() => setPenaltyType('GOLPEAR CON LA PUNTA DEL STICK')}>
                                            <p id='spearingText' className='penaltyText'>SP</p>
                                        </div>
                                        <div id='butEndingDiv' className='penaltyDiv' onClick={() => setPenaltyType('GOLPEAR CON EL TACO DEL STICK')}>
                                            <p id='butEndingText' className='penaltyText'>BE</p>
                                        </div>
                                        <div id='misconductDiv' className='penaltyDiv' onClick={() => setPenaltyType('MALA CONDUCTA')}>
                                            <p id='misconductText' className='penaltyText'>MC</p>
                                        </div>
                                        <div id='gameMisconductDiv' className='penaltyDiv' onClick={() => setPenaltyType('MALA CONDUCTA EN EL JUEGO')}>
                                            <p id='gameMisconductText' className='penaltyText'>MCJ</p>
                                        </div>
                                        <div id='matchPenaltyDiv' className='penaltyDiv' onClick={() => setPenaltyType('PENALIZACIÓN DE PARTIDO')}>
                                            <p id='matchPenaltyText' className='penaltyText'>PP</p>
                                        </div>
                                        <div id='benchPenaltyDiv' className='penaltyDiv' onClick={() => setPenaltyType('PENALIZACIÓN DE BANQUILLO')}>
                                            <p id='benchPenaltyText' className='penaltyText'>PB</p>
                                        </div>
                                        <div id='delayOfGameDiv' className='penaltyDiv' onClick={() => setPenaltyType('RETRASO EN EL JUEGO')}>
                                            <p id='delayOfGameText' className='penaltyText'>RJ</p>
                                        </div>
                                        <div id='penaltyShotDiv' className='penaltyDiv' onClick={() => setPenaltyType('TIRO DE PENALTI')}>
                                            <p id='penaltyShotText' className='penaltyText'>TP</p>
                                        </div>
                                        <div id='improperEquipmentDiv' className='penaltyDiv' onClick={() => setPenaltyType('EQUIPACIÓN INDEVIDA')}>
                                            <p id='improperEquipmentText' className='penaltyText'>EI</p>
                                        </div>
                                    </div>
                                </div>
                                <div id='numbers'>
                                    <p className='titleText'>DORSAL</p>
                                    <div id='numbersDiv'>
                                        {
                                            players.map((player) => {
                                                return (match?.call.callPlayerStatus[player?.id] == 'CONFIRMED') && (<div key={player.id} className='penaltyNumber' onClick={() => setPlayerPenalty(player)}>{player.number}</div>)
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div id='penaltiesModalInputsDiv'>
                                <input className='penaltiesModalInput' type='number' placeholder='Minutos sanción' onChange={(e) => setPenaltyTime(e.target.value)} />
                                <input className='penaltiesModalInput' type='number' placeholder='Minuto partido' onChange={(e) => setMatchMinute(e.target.value.padStart(2, '0'))} />
                                <input className='penaltiesModalInput' type='number' placeholder='Segundo partido' onChange={(e) => setMatchSecond(e.target.value.padStart(2, '0'))} />
                            </div>
                            <div id='penaltiesModalButtonsDiv'>
                                <button className='penaltiesModalButton' onClick={() => (penaltyTime == 2 || penaltyTime == 5 || penaltyTime == 10) && (matchMinute <= 20 && matchSecond <= 59 && matchMinute >= 0 && matchSecond >= 0) && ([setPenalty(), onClose()])}>GUARDAR</button>
                                <button className='penaltiesModalButton' onClick={() => onClose()}>CERRAR</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}