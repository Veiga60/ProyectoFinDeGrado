import '../style/Header.css'
import logo from '../assets/images/tigre-transparente.png'
import logoutDoor from '../assets/images/logout.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Header() {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/exit`, {}, { withCredentials: true });
            localStorage.removeItem('jwt');
            navigate('/')
        } catch (error) {
            console.log('Error al cerrar sesión: ', error);
        }
    }

    return (
        <div id='headerDiv'>
            <div id='titleDiv'>
                <img id='logo' src={logo} alt="logoApp" />
                <h1 id='title'>METROPOLITANO HC</h1>
            </div>
            <div id='navButtonsDiv'>
                <div id='logoutButtonDiv' onClick={() => logout()}>
                    <img id='logoutImage' src={logoutDoor} alt="Logout" />
                </div>
            </div>
        </div>
    )
}

export default Header