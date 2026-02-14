import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../style/MatchEvents.css'
import PenaltiesModal from '../components/PenaltiesModal';

export default function MatchEvents() {

    const SERVER_URL = 'http://localhost:8081'
    const location = useLocation();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);

    const [matchEvents, setMatchEvents] = useState([]);
    const [time, setTime] = useState('20:00');
    const [match, setMatch] = useState();

    const [teamPenalty, setTeamPenalty] = useState();

    const toggleModal = () => {
        setModal(!modal);
    }

    const setGoal = (team) => {
        if (team.name == 'Metropolitano HC') {
            return;
        } else {
            let newMatchEvents;
            if (matchEvents == undefined) {
                newMatchEvents = [{ goal: { team: team.name, time: time } }];
            } else {
                newMatchEvents = [...matchEvents, { goal: { team: team.name, time: time } }];
            }
            setMatchEvents(newMatchEvents);
        }
    }

    const finishEditingMatchEvents = async () => {
        navigate(`/matches/${match.matchId}/start_match`, { state: { matchEvents: matchEvents } });
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
                    <button onClick={() => setGoal(match?.localTeam)}>GOL</button>
                    <button onClick={() => [setTeamPenalty(match?.localTeam), toggleModal()]}>PENALIZACIÓN</button>
                </div>
                <div id="incidencesVisitingTeamDiv">
                    <div id='indicencesLocalTeamImageDiv'>
                        <img id='indicencesLocalTeamImage' src={`/logos/${match?.visitingTeam.logo}`} alt={match?.visitingTeam.name} />
                    </div>
                    <button onClick={() => setGoal(match?.visitingTeam)}>GOL</button>
                    <button onClick={() => [setTeamPenalty(match?.visitingTeam), toggleModal()]}>PENALIZACIÓN</button>
                </div>
                <button onClick={() => finishEditingMatchEvents()}>GUARDAR</button>
                {
                    (modal &&
                        <PenaltiesModal
                            teamPenalty={teamPenalty}
                            onClose={() => toggleModal()}
                        />
                    )
                }
            </div>
        </>
    )
}