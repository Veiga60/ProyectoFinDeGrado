import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Match from '../components/Match.jsx'
import '../style/Matches.css'
import axios from 'axios'
import MatchCompressed from '../components/MatchCompressed.jsx'

export default function Matches() {

    const SERVER_URL = 'http://localhost:8081'
    const [matches, setMatches] = useState([]);
    const location = useLocation();

    const getMatches = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches`, { withCredentials: true });
            console.log(response.data);
            setMatches(response.data);
        } catch (error) {
            console.log('Error al cargar los partidos: ', error);
        }
    }

    useEffect(() => {
        console.log(window.innerWidth);
        getMatches();
    }, []);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state?.authenticatedUserPlayerId}
                isCoach={location.state?.isCoach}
            />
            <div id='matchesDiv'>
                {matches.map((match) =>
                    (window.innerWidth >= 600) ? (
                        <Match
                            key={match.id}
                            match={match}
                        />
                    ) : (
                        <MatchCompressed
                            key={match.id}
                            match={match}
                        />
                    )
                )}
            </div>
        </>
    )
}