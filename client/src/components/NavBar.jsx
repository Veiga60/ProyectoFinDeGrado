import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../style/NavBar.css'
import { FiLogOut } from "react-icons/fi";

export default function NavBar({ authenticatedUserPlayerId, isCoach }) {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.post(`${SERVER_URL}/exit`, {}, { withCredentials: true });
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
            <div id="homeNavDiv" className="navbarSectionDiv" onClick={() => navigate('/home', { state: { authenticatedUserPlayerId: authenticatedUserPlayerId, isCoach: isCoach } })}>
                <p id="homeNavText" className="navbarText">INICIO</p>
            </div>
            <div id="matchesNavDiv" className="navbarSectionDiv" onClick={() => navigate('/matches', { state: { authenticatedUserPlayerId: authenticatedUserPlayerId, isCoach: isCoach } })}>
                <p id="matchesNavText" className="navbarText">PARTIDOS</p>
            </div>
            <div id="statsNavDiv" className="navbarSectionDiv" onClick={() => navigate('/stats', { state: { authenticatedUserPlayerId: authenticatedUserPlayerId, isCoach: isCoach } })}>
                <p id="statsNavText" className="navbarText">ESTADÍSTICAS</p>
            </div>
            <div id="callsNavDiv" className="navbarSectionDiv" onClick={() => navigate('/calls', { state: { authenticatedUserPlayerId: authenticatedUserPlayerId, isCoach: isCoach } })}>
                <p id="callsNavText" className="navbarText">CONVOCATORIAS</p>
            </div>
            <div id="forumNavDiv" className="navbarSectionDiv" onClick={() => navigate('/forum', { state: { authenticatedUserPlayerId: authenticatedUserPlayerId, isCoach: isCoach } })}>
                <p id="forumNavText" className="navbarText">FORO</p>
            </div>
            <div id="ordersNavDiv" className="navbarSectionDiv" onClick={() => navigate('/orders', { state: { authenticatedUserPlayerId: authenticatedUserPlayerId, isCoach: isCoach } })}>
                <p id="ordersNavText" className="navbarText">PEDIDOS</p>
            </div>
            <FiLogOut className='logoutIcon' onClick={logout} size={30} color='white' />
        </div>
    )
}