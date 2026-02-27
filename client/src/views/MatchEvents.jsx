import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import '../style/MatchEvents.css'
import PenaltiesModal from '../components/PenaltiesModal';
import GoalsModal from '../components/GoalsModal';
import TimeoutModal from '../components/TimeoutModal';

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
        navigate(`/matches/${match.id}/start_match`, { state: { matchEvents: matchEvents } });
    }

    useEffect(() => {
        setMatch(location.state.match);
        setMatchEvents(location.state.matchEvents);
        console.log('Hola', location.state.matchEvents);
    }, []);

    return (
        <>
            <div id="incidencesMainDiv">
                <div id="incidencesLocalTeamDiv">
                    <div id='indicencesLocalTeamImageDiv'>
                        <img id='indicencesLocalTeamImage' src={`/logos/${match?.localTeam.logo}`} alt={match?.localTeam.name} />
                    </div>
                    <button onClick={() => [setSelectedTeam(match?.localTeam), toggleGoalsModal()]}>GOL</button>
                    <button onClick={() => [setSelectedTeam(match?.localTeam), togglePenaltiesModal()]}>PENALIZACIÓN</button>
                    <button onClick={() => [setSelectedTeam(match?.localTeam), toggleTimeoutModal()]}>TIEMPO MUERTO</button>
                </div>
                <div id="incidencesVisitingTeamDiv">
                    <div id='indicencesLocalTeamImageDiv'>
                        <img id='indicencesLocalTeamImage' src={`/logos/${match?.visitingTeam.logo}`} alt={match?.visitingTeam.name} />
                    </div>
                    <button onClick={() => [setSelectedTeam(match?.visitingTeam), toggleGoalsModal()]}>GOL</button>
                    <button onClick={() => [setSelectedTeam(match?.visitingTeam), togglePenaltiesModal()]}>PENALIZACIÓN</button>
                    <button onClick={() => [setSelectedTeam(match?.visitingTeam), toggleTimeoutModal()]}>TIEMPO MUERTO</button>
                </div>
                <button onClick={() => finishEditingMatchEvents()}>GUARDAR</button>
                {
                    (penaltiesModal &&
                        <PenaltiesModal
                            teamPenalty={selectedTeam}
                            onClose={() => togglePenaltiesModal()}
                            matchEvents={matchEvents}
                            setMatchEvents={setMatchEvents}
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