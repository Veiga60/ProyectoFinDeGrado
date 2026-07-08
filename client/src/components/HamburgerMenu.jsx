import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BiSolidHome, BiSolidMessageDetail } from "react-icons/bi";
import { GiHockey } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { FaCalendarDays, FaBox } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import '../style/HamburgerMenu.css'

export default function HamburgerMenu({ className }) {

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
            <div id='hamburgerMenuDiv' className={className}>
                <div id='navMenuDiv'>
                    <div id='menuHomeDiv' className='menuDiv' onClick={() => navigate('/home')}>
                        <BiSolidHome className='hamburgerMenuIcon' color='rgb(7, 78, 200)' size={25} />
                        <p id='menuHomeText' className='menuText'>INICIO</p>
                    </div>
                    <div id='menuMatchesDiv' className='menuDiv' onClick={() => navigate('/matches')}>
                        <GiHockey className='hamburgerMenuIcon' color='rgb(7, 78, 200)' size={25} />
                        <p id='menuMatchesText' className='menuText'>PARTIDOS</p>
                    </div>
                    <div id='menuStatsDiv' className='menuDiv' onClick={() => navigate('/stats')}>
                        <IoStatsChart className='hamburgerMenuIcon' color='rgb(7, 78, 200)' size={25} />
                        <p id='menuStatsText' className='menuText'>ESTADÍSTICAS</p>
                    </div>
                    <div id='menuCallsDiv' className='menuDiv' onClick={() => navigate('/calls')}>
                        <FaCalendarDays className='hamburgerMenuIcon' color='rgb(7, 78, 200)' size={25} />
                        <p id='menuCallsText' className='menuText'>CONVOCATORIAS</p>
                    </div>
                    <div id='menuForumDiv' className='menuDiv' onClick={() => navigate('/forum')}>
                        <BiSolidMessageDetail className='hamburgerMenuIcon' color='rgb(7, 78, 200)' size={25} />
                        <p id='menuForumText' className='menuText'>FORO</p>
                    </div>
                    <div id='menuOrdersDiv' className='menuDiv' onClick={() => navigate('/orders')}>
                        <FaBox className='hamburgerMenuIcon' color='rgb(7, 78, 200)' size={25} />
                        <p id='menuOrdersText' className='menuText'>PEDIDOS</p>
                    </div>
                    <div id='menuLogoutDiv' className='menuDiv' onClick={logout}>
                        <FiLogOut className='hamburgerMenuIcon' color='rgb(7, 78, 200)' size={25} />
                        <p id='menuLogoutText' className='menuText'>CERRAR SESIÓN</p>
                    </div>
                </div>
            </div>
        </>
    )
}