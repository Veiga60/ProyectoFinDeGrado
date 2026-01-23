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
            localStorage.removeItem('playerId');
            navigate('/');
        } catch (error) {
            console.log('Error al cerrar sesión: ', error);
        }
    }

    return (
        <div id="navbarDiv">
            <div id="homeNavDiv" className="navbarSectionDiv" onClick={() => navigate('/home')}>
                <p id="homeNavText" className="navbarText">INICIO</p>
            </div>
            <div id="matchesNavDiv" className="navbarSectionDiv" onClick={() => navigate('/matches')}>
                <p id="matchesNavText" className="navbarText">PARTIDOS</p>
            </div>
            <div id="statsNavDiv" className="navbarSectionDiv" onClick={() => navigate('/stats')}>
                <p id="statsNavText" className="navbarText">ESTADÍSTICAS</p>
            </div>
            <div id="callsNavDiv" className="navbarSectionDiv" onClick={() => navigate('/calls')}>
                <p id="callsNavText" className="navbarText">CONVOCATORIAS</p>
            </div>
            <div id='logoutButtonDiv' onClick={() => logout()}>
                <img id='logoutImage' src={logoutDoor} alt="Logout" />
            </div>
        </div>
    )
}