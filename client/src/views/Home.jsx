import Header from '../components/Header.jsx'
import Match from '../components/Match.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/Home.css'

export default function Home() {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();

    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [nextMatch, setNextMatch] = useState();

    const whoAmI = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/me`, { withCredentials: true });
            console.log(response.data);
            setAuthenticatedUser(response.data);
        } catch (error) {
            console.log('Error al obtener la información del usuario: ', error);
        }
    }

    const getNextMatch = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/next`, { withCredentials: true });
            setNextMatch(response.data[0]);
            console.log(response.data[0]);
        } catch (error) {
            console.log('Error fetching next match: ', error);
        }
    }

    useEffect(() => {
        whoAmI();
        getNextMatch();
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
                            <Match
                                match={nextMatch}
                            />
                            {(localStorage.getItem('isCoach') == 'true') &&
                                (
                                    <div id='startMatchDiv'>
                                        <button id='startMatchButton' onClick={() => navigate(`/matches/${nextMatch.id}/start_match`)}>EMPEZAR PARTIDO</button>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}