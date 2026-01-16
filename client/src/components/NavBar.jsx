import { useNavigate } from 'react-router-dom'
import logoutDoor from '../assets/images/logout.png'
import axios from 'axios'
import '../style/NavBar.css'

export default function NavBar() {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/exit`, {}, { withCredentials: true });
            localStorage.removeItem('jwt');
            localStorage.removeItem('isCoach');
            navigate('/');
        } catch (error) {
            console.log('Error al cerrar sesión: ', error);
        }
    }

    return (
        <div id="navbarDiv">
            <div id="matchesDiv" className="navbarSectionDiv" onClick={() => navigate('/home')}>
                <p id="matchesText" className="navbarText">INICIO</p>
            </div>
            <div id="matchesDiv" className="navbarSectionDiv" onClick={() => navigate('/matches')}>
                <p id="matchesText" className="navbarText">PARTIDOS</p>
            </div>
            <div id="statsDiv" className="navbarSectionDiv" onClick={() => navigate('/stats')}>
                <p id="statsText" className="navbarText">ESTADÍSTICAS</p>
            </div>
            <div id='logoutButtonDiv' onClick={() => logout()}>
                <img id='logoutImage' src={logoutDoor} alt="Logout" />
            </div>
        </div>
    )
}