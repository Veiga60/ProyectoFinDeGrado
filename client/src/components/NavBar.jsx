import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../style/NavBar.css'
import { FiLogOut } from "react-icons/fi";
import SERVER_URL from '../config.js'

export default function NavBar() {
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
            <div id="forumNavDiv" className="navbarSectionDiv" onClick={() => navigate('/forum')}>
                <p id="forumNavText" className="navbarText">FORO</p>
            </div>
            <div id="ordersNavDiv" className="navbarSectionDiv" onClick={() => navigate('/orders')}>
                <p id="ordersNavText" className="navbarText">PEDIDOS</p>
            </div>
            <FiLogOut className='logoutIcon' onClick={logout} size={30} color='white' />
        </div>
    )
}