import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/SelectRole.css';
import axios from 'axios';
import player from '../assets/images/player.png';
import coach from '../assets/images/coach.png';
import Header from '../components/Header.jsx';
import { AuthContext } from '../components/AuthContext';

export default function SelectRole() {

    const navigate = useNavigate();
    const SERVER_URL = 'http://localhost:8081';

    const { authenticatedUser, verifyUserSession } = useContext(AuthContext);

    const setCoachRole = async (isCoach) => {
        const response = await axios.post(`${SERVER_URL}/me/role?isCoach=${isCoach}&email=${authenticatedUser?.email}`,
            {
                isCoach: isCoach,
                email: authenticatedUser?.email
            },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        // Actualizamos el usuario en AuthContext tras cambiar su rol
        await verifyUserSession();

        if (isCoach) {
            navigate("/select_clubTeams");
        } else {
            navigate("/home");
        }
    }

    return (
        <>
            <Header />
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