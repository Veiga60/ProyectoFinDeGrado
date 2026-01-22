import Header from '../components/Header.jsx'
import MatchCard from '../components/MatchCard.jsx'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/Calls.css'

export default function Calls() {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);


    const getNextMatches = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/next`, { withCredentials: true });
            setMatches(response.data);
        } catch (error) {
            console.log('Error fetching next match: ', error);
        }
    }

    const onClick = (matchId) => {
        const isCoach = localStorage.getItem('isCoach');
        console.log(isCoach);
        if (isCoach == 'true') {
            navigate(`/calls/match/${matchId}`);
        } else {
            return;
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
        if (localStorage.getItem('isCoach') == 'false') {
            getCallsOfPlayer(Number(localStorage.getItem('playerId')));
        }
        getNextMatches();
    }, []);

    return (
        <>
            <Header />
            <div id='callsMainDiv'>
                <div id='nextMatchesDiv'>
                    {matches.map((match) =>
                        <MatchCard
                            key={match.id}
                            match={match}
                            onClick={() => onClick(match.id)}
                        />
                    )}
                </div>
            </div>
        </>
    )
}