import Header from '../components/Header.jsx'
import MatchCard from '../components/MatchCard.jsx'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../style/Calls.css'

export default function Calls() {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();
    const location = useLocation();

    const [matches, setMatches] = useState([]);

    const getNextMatches = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/next`, { withCredentials: true });
            setMatches(response.data);
        } catch (error) {
            console.log('Error fetching next match: ', error);
        }
    }

    const getCallsOfPlayer = async (playerId) => {
        try {
            const response = await axios.get(`${SERVER_URL}/calls/player/${playerId}`, { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.log('Error fetching your calls: ', error);
        }
    }

    useEffect(() => {
        if (location.state?.isCoach == false) {
            getCallsOfPlayer(location.state?.authenticatedUserPlayerId);
        }
        console.log(location.state);
        getNextMatches();
    }, []);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state.authenticatedUserPlayerId}
                isCoach={location.state.isCoach}
            />
            <div id='callsMainDiv'>
                <div id='nextMatchesDiv'>
                    {matches.map((match) =>
                        <MatchCard
                            key={match.id}
                            match={match}
                            onClick={() => navigate(`/calls/match/${match.id}`, { state: { authenticatedUserPlayerId: location.state?.authenticatedUserPlayerId, isCoach: location.state?.isCoach } })}
                        />
                    )}
                </div>
            </div>
        </>
    )
}