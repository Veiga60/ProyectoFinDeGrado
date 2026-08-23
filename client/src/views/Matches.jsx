import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Match from '../components/Match.jsx'
import '../style/Matches.css'
import axios from 'axios'
import MatchCompressed from '../components/MatchCompressed.jsx'
import ClubTeamSelector from '../components/ClubTeamSelector.jsx'
import { AuthContext } from '../components/AuthContext.jsx'
import SERVER_URL from '../config.js'

export default function Matches() {
    const location = useLocation();

    const [matches, setMatches] = useState([]);
    const { authenticatedUser } = useContext(AuthContext);
    const [clubTeamId, setClubTeamId] = useState();
    const [width, setWidth] = useState(window.innerWidth)

    const getMatches = async () => {
        try {
            if (!clubTeamId) return;
            const response = await axios.get(`${SERVER_URL}/matches/clubTeam/${clubTeamId}`, { withCredentials: true });
            setMatches(response.data);
        } catch (error) {
            console.log('Error al cargar los partidos: ', error);
        }
    }

    useEffect(() => {

        const defaultClubTeams = authenticatedUser?.isCoach
            ? authenticatedUser?.coach?.clubTeams
            : authenticatedUser?.player?.clubTeams;
        if (defaultClubTeams?.length > 0 && !clubTeamId) {
            setClubTeamId(defaultClubTeams[0].id);
        }

        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        getMatches();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        getMatches();
    }, [clubTeamId])

    useEffect(() => {
        setClubTeamId(authenticatedUser?.player?.clubTeams[0].id);
    }, [authenticatedUser]);

    return (
        <>
            <Header />
            {
                ((authenticatedUser?.player?.clubTeams.length > 1) || (authenticatedUser?.coach?.clubTeams.length > 1)) ?

                    <ClubTeamSelector
                        clubTeams={(authenticatedUser?.isCoach == true) ? (authenticatedUser?.coach?.clubTeams) : (authenticatedUser?.player?.clubTeams)}
                        setClubTeamId={setClubTeamId}
                    />

                    :

                    (null)

            }
            <div id='matchesDiv' onClick={() => console.log(clubTeamId)}>
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