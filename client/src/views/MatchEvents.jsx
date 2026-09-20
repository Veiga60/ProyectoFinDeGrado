import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../style/MatchEvents.css'
import PenaltiesModal from '../components/PenaltiesModal';
import GoalsModal from '../components/GoalsModal';
import TimeoutModal from '../components/TimeoutModal';
import { AiFillAlert } from "react-icons/ai";
import { GiWhistle } from "react-icons/gi";
import { MdTimer } from "react-icons/md";
import basicLogo from '../assets/images/basicLogo.png'

export default function MatchEvents() {

    const location = useLocation();
    const navigate = useNavigate();
    const [penaltiesModal, setPenaltiesModal] = useState(false);
    const [goalsModal, setGoalsModal] = useState(false);
    const [timeoutModal, setTimeoutModal] = useState(false);

    const [selectedTeam, setSelectedTeam] = useState();

    const [matchEvents, setMatchEvents] = useState([]);
    const [match, setMatch] = useState();

    const togglePenaltiesModal = () => {
        setPenaltiesModal(!penaltiesModal);
    }

    const toggleGoalsModal = () => {
        setGoalsModal(!goalsModal);
    }

    const toggleTimeoutModal = () => {
        setTimeoutModal(!timeoutModal);
    }

    const finishEditingMatchEvents = async () => {
        navigate(`/matches/${match.id}/start_match`, { state: { matchPeriod: location.state.matchPeriod, matchEvents: matchEvents, selectedClubTeamId: location?.state?.selectedClubTeamId } });
    }

    useEffect(() => {
        setMatch(location.state.match);
        setMatchEvents(location.state.matchEvents);
    }, []);

    return (
        <>
            <div id="incidencesMainDiv">
                <div id="incidencesLocalTeamDiv" className='incidencesTeamDiv'>
                    <div id='indicencesLocalTeamImageDiv' className='incidencesTeamImageDiv'>
                        <img id='indicencesLocalTeamImage' className='incidencesTeamImage' src={match?.localTeam.logo ? `/logos/${match?.localTeam.logo}` : basicLogo} alt={match?.localTeam.name} />
                    </div>
                    <div id='localTeamIncidencesButtonsDiv' className='incidencesButtonsDiv'>
                        <button className='incidencesButton' onClick={() => [setSelectedTeam(match?.localTeam), toggleGoalsModal()]}><AiFillAlert className='goalIcon' color='rgb(7, 78, 200)' size={30} />GOL ANOTADO</button>
                        <button className='incidencesButton' onClick={() => [setSelectedTeam(match?.localTeam), togglePenaltiesModal()]}><GiWhistle className='whistleIcon' color='rgb(7, 78, 200)' size={30} />FALTA COMETIDA</button>
                        <button className='incidencesButton' onClick={() => [setSelectedTeam(match?.localTeam), toggleTimeoutModal()]}><MdTimer className='timeoutIcon' color='rgb(7, 78, 200)' size={30} />TIEMPO MUERTO</button>
                    </div>
                </div>
                <div id="incidencesVisitingTeamDiv" className='incidencesTeamDiv'>
                    <div id='indicencesVisitingTeamImageDiv' className='incidencesTeamImageDiv'>
                        <img id='indicencesVisitingTeamImage' className='incidencesTeamImage' src={match?.visitingTeam.logo ? `/logos/${match?.visitingTeam.logo}` : basicLogo} alt={match?.visitingTeam.name} />
                    </div>
                    <div id='visitingTeamIncidencesButtonsDiv' className='incidencesButtonsDiv'>
                        <button className='incidencesButton' onClick={() => [setSelectedTeam(match?.visitingTeam), toggleGoalsModal()]}><AiFillAlert className='goalIcon' color='rgb(7, 78, 200)' size={30} />GOL ANOTADO</button>
                        <button className='incidencesButton' onClick={() => [setSelectedTeam(match?.visitingTeam), togglePenaltiesModal()]}><GiWhistle className='whistleIcon' color='rgb(7, 78, 200)' size={30} />FALTA COMETIDA</button>
                        <button className='incidencesButton' onClick={() => [setSelectedTeam(match?.visitingTeam), toggleTimeoutModal()]}><MdTimer className='timeoutIcon' color='rgb(7, 78, 200)' size={30} />TIEMPO MUERTO</button>
                    </div>
                </div>
                <div id='saveIncidencesButtonDiv'>
                    <button id='saveIncidencesButton' onClick={() => finishEditingMatchEvents()}>GUARDAR</button>
                    <button id='returnButton' onClick={() => navigate(`/matches/${match?.id}/start_match`, { state: { matchPeriod: location.state.matchPeriod, matchEvents: matchEvents, selectedClubTeamId: location?.state?.selectedClubTeamId } })}>VOLVER</button>
                </div>
                {
                    (penaltiesModal &&
                        <PenaltiesModal
                            teamPenalty={selectedTeam}
                            onClose={() => togglePenaltiesModal()}
                            matchEvents={matchEvents}
                            setMatchEvents={setMatchEvents}
                            match={match}
                        />
                    )
                }
                {
                    (goalsModal &&
                        <GoalsModal
                            teamGoal={selectedTeam}
                            onClose={() => toggleGoalsModal()}
                            matchEvents={matchEvents}
                            setMatchEvents={setMatchEvents}
                            match={match}
                        />
                    )
                }
                {
                    (timeoutModal &&
                        <TimeoutModal
                            teamTimeout={selectedTeam}
                            onClose={() => toggleTimeoutModal()}
                            matchEvents={matchEvents}
                            setMatchEvents={setMatchEvents}
                        />
                    )
                }
            </div>
        </>
    )
}