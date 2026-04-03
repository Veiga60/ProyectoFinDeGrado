import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../style/HamburgerMenu.css'

export default function HamburgerMenu({ authenticatedUserPlayerId, isCoach }) {

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
        <>
            <div id='hamburgerMenuDiv'>
                <div id='menuHomeDiv' className='menuDiv' onClick={() => navigate('/home', { state: { authenticatedUserPlayerId: authenticatedUserPlayerId, isCoach: isCoach } })}>
                    <p id='menuHomeText' className='menuText'>INICIO</p>
                </div>
                <div id='menuMatchesDiv' className='menuDiv' onClick={() => navigate('/matches', { state: { authenticatedUserPlayerId: authenticatedUserPlayerId, isCoach: isCoach } })}>
                    <p id='menuMatchesText' className='menuText'>PARTIDOS</p>
                </div>
                <div id='menuStatsDiv' className='menuDiv' onClick={() => navigate('/stats', { state: { authenticatedUserPlayerId: authenticatedUserPlayerId, isCoach: isCoach } })}>
                    <p id='menuStatsText' className='menuText'>ESTADÍSTICAS</p>
                </div>
                <div id='menuCallsDiv' className='menuDiv' onClick={() => navigate('/calls', { state: { authenticatedUserPlayerId: authenticatedUserPlayerId, isCoach: isCoach } })}>
                    <p id='menuCallsText' className='menuText'>CONVOCATORIAS</p>
                </div>
                <div id='menuForumDiv' className='menuDiv' onClick={() => navigate('/forum', { state: { authenticatedUserPlayerId: authenticatedUserPlayerId, isCoach: isCoach } })}>
                    <p id='menuForumText' className='menuText'>FORO</p>
                </div>
                <div id='menuOrdersDiv' className='menuDiv' onClick={() => navigate('/orders', { state: { authenticatedUserPlayerId: authenticatedUserPlayerId, isCoach: isCoach } })}>
                    <p id='menuOrdersText' className='menuText'>PEDIDOS</p>
                </div>
                <div id='menuLogoutDiv' className='menuDiv' onClick={logout}>
                    <p id='menuLogoutText' className='menuText'>CERRAR SESIÓN</p>
                </div>
            </div>
        </>
    )
}