import Header from '../components/Header.jsx'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../style/Home.css'

export default function Home() {

    const SERVER_URL = 'http://localhost:8081';
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    const whoAmI = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/me`, { withCredentials: true });
            console.log(response.data);
            setAuthenticatedUser(response.data);
            localStorage.setItem('isCoach', response.data.isCoach);
        } catch (error) {
            console.log('Error al obtener la información del usuario: ', error);
        }
    }

    useEffect(() => {
        whoAmI();
    }, []);

    return (
        <>
            <Header />
            {(authenticatedUser != null) &&
                <div id='homePageContentDiv'>
                    <div id='greetingDiv'>
                        <div id='greetingTextDiv'>
                            <p id='greetingText'>¡Bienvenido, {authenticatedUser.username}!</p>
                        </div>
                        <div id='playerImageDiv'>
                            <img id='playerImage' src={`/players/${authenticatedUser.player.photo}`} alt="" />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}