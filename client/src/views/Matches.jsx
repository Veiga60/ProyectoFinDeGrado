import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Match from '../components/Match.jsx'
import '../style/Matches.css'
import axios from 'axios'
import MatchCompressed from '../components/MatchCompressed.jsx'

export default function Matches() {

    const SERVER_URL = 'http://localhost:8081'
    const location = useLocation();

    const [matches, setMatches] = useState([]);
    const [width, setWidth] = useState(window.innerWidth)

    const getMatches = async () => {
        try {
            console.log(`${SERVER_URL}/matches/clubTeam/${location?.state?.authenticatedUser?.player?.clubTeams[0].id}`);
            const response = await axios.get(`${SERVER_URL}/matches/clubTeam/${location?.state?.authenticatedUser?.player?.clubTeams[0].id}`, { withCredentials: true });
            setMatches(response.data);
        } catch (error) {
            console.log('Error al cargar los partidos: ', error);
        }
    }

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        getMatches();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state?.authenticatedUserPlayerId}
                isCoach={location.state?.isCoach}
            />
            <div id='matchesDiv'>
                {matches.map((match) =>
                    (width >= 600) ? (
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