import Header from '../components/Header.jsx'
import MatchCard from '../components/MatchCard.jsx'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../style/Calls.css'
import ClubTeamSelector from '../components/ClubTeamSelector.jsx'
import { AuthContext } from '../components/AuthContext.jsx'

export default function Calls() {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();
    const location = useLocation();

    const { authenticatedUser } = useContext(AuthContext);
    const [matches, setMatches] = useState([]);
    const [callsOfPlayer, setCallsOfPlayer] = useState([]);

    const [errorMessage, setErrorMessage] = useState(null);

    const [clubTeamId, setClubTeamId] = useState();

    const getNextMatches = async () => {
        try {
            if (!clubTeamId) return;
            const response = await axios.get(`${SERVER_URL}/matches/next/clubTeam/${clubTeamId}`, { withCredentials: true });
            setErrorMessage(null);
            setMatches(response.data);
        } catch (error) {
            if (error.status == 404) {
                setErrorMessage('La temporada ha terminado');
            }
            console.log('Error fetching next match: ', error);
        }
    }

    const getCallsOfPlayer = async (playerId) => {
        try {
            const response = await axios.get(`${SERVER_URL}/calls/player/${playerId}`, { withCredentials: true });
            let tempCallsOfPlayer = [];
            for (let i = 0; i < response.data.length; i++) {
                tempCallsOfPlayer.push({ match: response.data[i]?.match.id, callStatus: response.data[i].callPlayerStatus[location.state.authenticatedUserPlayerId] });
            }
            setCallsOfPlayer(tempCallsOfPlayer);
        } catch (error) {
            console.log('Error fetching your calls: ', error);
        }
    }

    useEffect(() => {
        if (authenticatedUser?.isCoach == false) {
            getCallsOfPlayer(location.state?.authenticatedUserPlayerId);
        }
        getNextMatches();
    }, []);

    useEffect(() => {
        if (authenticatedUser?.isCoach == false) {
            getCallsOfPlayer(authenticatedUser?.player?.id);
        }
        getNextMatches();
    }, [clubTeamId]);

    useEffect(() => {
        setClubTeamId(authenticatedUser?.player?.clubTeams[0].id);
    }, [authenticatedUser]);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state.authenticatedUserPlayerId}
                isCoach={location.state.isCoach}
            />
            <ClubTeamSelector
                clubTeams={authenticatedUser?.player?.clubTeams}
                setClubTeamId={setClubTeamId}
            />
            <div id='callsMainDiv'>
                <div id='nextMatchesDiv'>
                    {
                        (errorMessage) ? (
                            <div id='callsErrorDiv'>
                                <p id='callsErrorText'>{`${errorMessage}`}</p>
                            </div>
                        ) : (
                            matches.map((match) => {
                                let pendingCall = false;
                                for (let i = 0; i < callsOfPlayer.length; i++) {
                                    if (callsOfPlayer[i].match == match.id && callsOfPlayer[i].callStatus == 'PENDING') {
                                        pendingCall = true;
                                    }
                                }
                                return <MatchCard
                                    key={match.id}
                                    match={match}
                                    onClick={() => navigate(`/calls/match/${match.id}`, { state: { authenticatedUserPlayerId: location.state?.authenticatedUserPlayerId, isCoach: location.state?.isCoach, clubTeamId: clubTeamId } })}
                                    className={(pendingCall) ? ('pendingCall') : (undefined)}
                                />
                            }
                            )
                        )}
                </div>
            </div>
        </>
    )
}