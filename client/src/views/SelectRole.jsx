import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/SelectRole.css'
import axios from 'axios'
import player from '../assets/images/player.png'
import coach from '../assets/images/coach.png'

export default function SelectRole() {

    const navigate = useNavigate();

    const SERVER_URL = 'http://localhost:8081'

    const [authenticatedUser, setAuthenticatedUser] = useState({})

    const whoAmI = async () => {
        const response = await axios.get(`${SERVER_URL}/me`, { withCredentials: true });
        setAuthenticatedUser(response.data);
    }

    const setCoachRole = async (isCoach) => {
        const response = await axios.post(`${SERVER_URL}/me/role?isCoach=${isCoach}&email=${authenticatedUser.email}`,
            {
                isCoach: isCoach,
                email: authenticatedUser.email
            },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        navigate("/home")

    }

    useEffect(() => {
        whoAmI();
    }, []);

    return (
        <>
            <div id="optionsDiv">
                <div className="option" onClick={() => setCoachRole(true)}>
                    <img id='hockeyCoachPhoto' src={coach} alt="Coach" /><p className="selectText">ENTRENADOR</p>
                </div>
                <div className="option" onClick={() => navigate("/home")}>
                    <img id='hockeyPlayerPhoto' src={player} alt="Player" /><p id='playerText' className="selectText">JUGADOR</p>
                </div>
            </div>
        </>
    )
}