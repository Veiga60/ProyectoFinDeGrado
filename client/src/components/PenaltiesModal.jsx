import { useState, useEffect } from 'react';
import '../style/PenaltiesModal.css'

export default function PenaltiesModal({ teamPenalty, onClose, matchEvents, setMatchEvents, match }) {

    const [penaltyTime, setPenaltyTime] = useState(0);
    const [penaltyType, setPenaltyType] = useState('');
    const [players, setPlayers] = useState([]);
    const [playerPenalty, setPlayerPenalty] = useState();
    const [matchMinute, setMatchMinute] = useState();
    const [matchSecond, setMatchSecond] = useState();

    const [previousPenalty, setPreviousPenalty] = useState(null);

    const [previousPlayerPenalty, setPreviousPlayerPenalty] = useState(null);

    const selectPenaltyType = (element) => {
        if (previousPenalty !== null) {
            deselectPreviousPenalty();
        }
        element.className = 'selectedPenalty';
        setPreviousPenalty(element);
    }

    const deselectPreviousPenalty = () => {
        previousPenalty.className = 'penaltyDiv';
    }

    const selectPlayerPenalty = (player) => {
        if (previousPlayerPenalty !== null) {
            deselectPreviousPlayerPenalty();
        }
        setPlayerPenalty(player);
        document.getElementById(`player${player.number}`).className = 'selectedPlayer';
        setPreviousPlayerPenalty(player);
    }

    const deselectPreviousPlayerPenalty = () => {
        document.getElementById(`player${playerPenalty.number}`).className = 'penaltyNumber';
    }

    const setPenalty = () => {
        let newMatchEvents;
        if (matchEvents == undefined) {
            newMatchEvents = [{ penalty: { team: teamPenalty, penaltyType: penaltyType, penaltyTime: penaltyTime, player: playerPenalty, matchTime: `${matchMinute}:${matchSecond}` } }];
        } else {
            newMatchEvents = [...matchEvents, { penalty: { team: teamPenalty, penaltyType: penaltyType, penaltyTime: penaltyTime, player: playerPenalty, matchTime: `${matchMinute}:${matchSecond}` } }];
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
                                <div id='trippingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('ZANCADILLA'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='trippingText' className='penaltyText'>ZC</p>
                                </div>
                                <div id='chargingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('CARGA'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='chargingText' className='penaltyText'>CG</p>
                                </div>
                                <div id='chargingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('INTERFERENCIA'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='chargingText' className='penaltyText'>IF</p>
                                </div>
                                <div id='roughingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('VIOLENCIA INNECESARIA'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='roughingText' className='penaltyText'>VI</p>
                                </div>
                                <div id='unsportsmanlikeDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('CONDUCTA ANTIDEPORTIVA'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='unsportsmanlikeText' className='penaltyText'>CA</p>
                                </div>
                                <div id='hookingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('ENGANCHAR'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='hookingText' className='penaltyText'>EG</p>
                                </div>
                                <div id='holdingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('AGARRAR'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='holdingText' className='penaltyText'>AG</p>
                                </div>
                                <div id='elbowingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('CODAZO'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='elbowingText' className='penaltyText'>CZ</p>
                                </div>
                                <div id='kneeingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('RODILLAZO'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='kneeingText' className='penaltyText'>RZ</p>
                                </div>
                                <div id='crossCheckingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('CARGA CON EL STICK'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='crossCheckingText' className='penaltyText'>CC</p>
                                </div>
                                <div id='slashingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('GOLPEAR CON EL STICK'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='slashingText' className='penaltyText'>SL</p>
                                </div>
                                <div id='highStickingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('STICK ALTO'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='highStickingText' className='penaltyText'>SA</p>
                                </div>
                                <div id='spearingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('GOLPEAR CON LA PUNTA DEL STICK'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='spearingText' className='penaltyText'>SP</p>
                                </div>
                                <div id='butEndingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('GOLPEAR CON EL TACO DEL STICK'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='butEndingText' className='penaltyText'>BE</p>
                                </div>
                                <div id='misconductDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('MALA CONDUCTA'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='misconductText' className='penaltyText'>MC</p>
                                </div>
                                <div id='gameMisconductDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('MALA CONDUCTA EN EL JUEGO'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='gameMisconductText' className='penaltyText'>MCJ</p>
                                </div>
                                <div id='matchPenaltyDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('PENALIZACIÓN DE PARTIDO'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='matchPenaltyText' className='penaltyText'>PP</p>
                                </div>
                                <div id='benchPenaltyDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('PENALIZACIÓN DE BANQUILLO'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='benchPenaltyText' className='penaltyText'>PB</p>
                                </div>
                                <div id='delayOfGameDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('RETRASO EN EL JUEGO'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='delayOfGameText' className='penaltyText'>RJ</p>
                                </div>
                                <div id='penaltyShotDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('TIRO DE PENALTI'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='penaltyShotText' className='penaltyText'>TP</p>
                                </div>
                                <div id='improperEquipmentDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('EQUIPACIÓN INDEVIDA'); selectPenaltyType(e.currentTarget) }}>
                                    <p id='improperEquipmentText' className='penaltyText'>EI</p>
                                </div>
                            </div>
                            <div id='penaltiesModalInputsDiv'>
                                <input className='penaltiesModalInput' type='number' placeholder='Minutos sanción' onChange={(e) => setPenaltyTime(e.target.value)} />
                                <input className='penaltiesModalInput' type="number" placeholder='Minuto' id="matchMinute" onChange={(e) => { setMatchMinute(e.target.value.padStart(2, '0')) }} />
                                <input className='penaltiesModalInput' type="number" placeholder='Segundo' id="matchSecond" onChange={(e) => { setMatchSecond(e.target.value.padStart(2, '0')) }} />
                            </div>
                            <div id='penaltiesModalButtonsDiv' className='penaltiesModalButtonsDivNotMyTeam'>
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
                                        <div id='trippingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('ZANCADILLA'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='trippingText' className='penaltyText'>ZC</p>
                                        </div>
                                        <div id='chargingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('CARGA'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='chargingText' className='penaltyText'>CG</p>
                                        </div>
                                        <div id='chargingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('INTERFERENCIA'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='chargingText' className='penaltyText'>IF</p>
                                        </div>
                                        <div id='roughingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('VIOLENCIA INNECESARIA'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='roughingText' className='penaltyText'>VI</p>
                                        </div>
                                        <div id='unsportsmanlikeDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('CONDUCTA ANTIDEPORTIVA'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='unsportsmanlikeText' className='penaltyText'>CA</p>
                                        </div>
                                        <div id='hookingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('ENGANCHAR'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='hookingText' className='penaltyText'>EG</p>
                                        </div>
                                        <div id='holdingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('AGARRAR'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='holdingText' className='penaltyText'>AG</p>
                                        </div>
                                        <div id='elbowingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('CODAZO'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='elbowingText' className='penaltyText'>CZ</p>
                                        </div>
                                        <div id='kneeingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('RODILLAZO'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='kneeingText' className='penaltyText'>RZ</p>
                                        </div>
                                        <div id='crossCheckingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('CARGA CON EL STICK'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='crossCheckingText' className='penaltyText'>CC</p>
                                        </div>
                                        <div id='slashingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('GOLPEAR CON EL STICK'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='slashingText' className='penaltyText'>SL</p>
                                        </div>
                                        <div id='highStickingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('STICK ALTO'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='highStickingText' className='penaltyText'>SA</p>
                                        </div>
                                        <div id='spearingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('GOLPEAR CON LA PUNTA DEL STICK'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='spearingText' className='penaltyText'>SP</p>
                                        </div>
                                        <div id='butEndingDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('GOLPEAR CON EL TACO DEL STICK'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='butEndingText' className='penaltyText'>BE</p>
                                        </div>
                                        <div id='misconductDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('MALA CONDUCTA'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='misconductText' className='penaltyText'>MC</p>
                                        </div>
                                        <div id='gameMisconductDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('MALA CONDUCTA EN EL JUEGO'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='gameMisconductText' className='penaltyText'>MCJ</p>
                                        </div>
                                        <div id='matchPenaltyDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('PENALIZACIÓN DE PARTIDO'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='matchPenaltyText' className='penaltyText'>PP</p>
                                        </div>
                                        <div id='benchPenaltyDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('PENALIZACIÓN DE BANQUILLO'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='benchPenaltyText' className='penaltyText'>PB</p>
                                        </div>
                                        <div id='delayOfGameDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('RETRASO EN EL JUEGO'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='delayOfGameText' className='penaltyText'>RJ</p>
                                        </div>
                                        <div id='penaltyShotDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('TIRO DE PENALTI'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='penaltyShotText' className='penaltyText'>TP</p>
                                        </div>
                                        <div id='improperEquipmentDiv' className='penaltyDiv' onClick={(e) => { setPenaltyType('EQUIPACIÓN INDEVIDA'); selectPenaltyType(e.currentTarget) }}>
                                            <p id='improperEquipmentText' className='penaltyText'>EI</p>
                                        </div>
                                    </div>
                                </div>
                                <div id='numbers'>
                                    <p className='titleText'>DORSAL</p>
                                    <div id='numbersDiv'>
                                        {
                                            players.map((player) => {
                                                return (match?.call.callPlayerStatus[player?.id] == 'CONFIRMED') && (<div key={player.id} id={`player${player.number}`} className='penaltyNumber' onClick={() => selectPlayerPenalty(player)}>{player.number}</div>)
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div id='penaltiesModalInputsDiv'>
                                <input className='penaltiesModalInput' type='number' placeholder='Minutos sanción' onChange={(e) => setPenaltyTime(e.target.value)} />
                                <input className='penaltiesModalInput' type='number' placeholder='Minuto' onChange={(e) => setMatchMinute(e.target.value.padStart(2, '0'))} />
                                <input className='penaltiesModalInput' type='number' placeholder='Segundo' onChange={(e) => setMatchSecond(e.target.value.padStart(2, '0'))} />
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