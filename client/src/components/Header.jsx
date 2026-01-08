import '../style/Header.css'
import logo from '../assets/images/tigre-transparente.png'
import NavBar from '../components/NavBar.jsx'
import { useLocation } from 'react-router-dom'

function Header() {

    const location = useLocation();

    return (
        <div id='headerDiv'>
            <div id='titleDiv'>
                <img id='logo' src={logo} alt="logoApp" />
                <h1 id='title'>METROPOLITANO HC</h1>
            </div>
            {(location.pathname != '/' && location.pathname != '/signup') &&
                <div id='navbar'>
                    <NavBar />
                </div>
            }
        </div>
    )
}

export default Header