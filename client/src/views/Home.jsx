import Header from '../components/Header.jsx'
import Match from '../components/Match.jsx'
import MatchCompressed from '../components/MatchCompressed.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../style/Home.css'

export default function Home() {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();
    const location = useLocation();

    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [nextMatch, setNextMatch] = useState();
    const [width, setWidth] = useState(window.innerWidth);

    const [lastPlayedMatch, setLastPlayedMatch] = useState(null);

    const whoAmI = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/me`, { withCredentials: true });
            setAuthenticatedUser(response.data);
        } catch (error) {
            console.log('Error al obtener la información del usuario: ', error);
        }
    }

    const getNextMatch = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/next`, { withCredentials: true });
            setNextMatch(response.data[0]);
        } catch (error) {
            console.log('Error fetching next match: ', error);
        }
    }

    const getLastPlayedMatch = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/lastPlayed`, { withCredentials: true });
            setLastPlayedMatch(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('Error getting last played match: ', error);
        }
    }

    useEffect(() => {
        getLastPlayedMatch();
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        whoAmI();
        getNextMatch();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Header
                authenticatedUserPlayerId={authenticatedUser?.player?.id}
                isCoach={authenticatedUser?.isCoach}
            />
            {(authenticatedUser != null) &&
                <div id='homePageContentDiv'>
                    <div id='leftDiv'>
                        <div id='greetingDiv'>
                            <div id='greetingTextDiv'>
                                <p id='greetingText'>¡Bienvenido, {authenticatedUser.username}!</p>
                            </div>
                            <div id='playerImageDiv'>
                                <img id='playerImage' src={`/players/${authenticatedUser.player?.photo}`} alt="" />
                            </div>
                        </div>
                        <div id='nextMatchDiv'>
                            <div id='nextMatchAndTextDiv'>
                                <div id='nextMatchTextDiv'>
                                    <p id='nextMatchText'>Próximo partido</p>
                                </div>
                                {
                                    (width < 660)
                                        ? (<MatchCompressed match={nextMatch} />)
                                        : (<Match match={nextMatch} />)
                                }

                            </div>
                            {(authenticatedUser.isCoach == true) &&
                                (
                                    <div id='startMatchDiv'>
                                        <button id='startMatchButton' onClick={() => navigate(`/matches/${nextMatch.id}/start_match`)}>EMPEZAR PARTIDO</button>
                                    </div>
                                )}
                        </div>
                    </div>
                    {
                        (authenticatedUser.isCoach == true) && (
                            <div id='rightDiv'>
                                <div id='recomendationsDiv'>
                                    <p id='recomendationsText'>RECOMENDACIONES</p>
                                    <div id='recomendations'>
                                        <p id='seeRecomendationsText'>Ver recomendaciones del partido:</p>
                                        <div id='lastPlayedMatchDiv'>
                                            <img id='lastPlayedMatchLocalTeamImage' src={`/logos/${lastPlayedMatch?.localTeam?.logo}`} alt={`${lastPlayedMatch?.localTeam?.name}`} />
                                            <p id='lastPlayedMatchVersusText'>VS</p>
                                            <img id='lastPlayedMatchVisitingTeamImage' src={`/logos/${lastPlayedMatch?.visitingTeam?.logo}`} alt={`${lastPlayedMatch?.visitingTeam?.name}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            }
        </>
    )
}