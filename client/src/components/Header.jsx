import '../style/Header.css'
import logo from '../assets/images/tigre-transparente.png'
import NavBar from '../components/NavBar.jsx'
import { useLocation } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useState, useEffect } from 'react'


function Header({ authenticatedUserPlayerId, isCoach }) {

    const location = useLocation();

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div id='headerDiv'>
            <div id='titleDiv'>
                <img id='logo' src={logo} alt="logoApp" />
                {
                    (width > 400) && (
                        <h1 id='title'>METROPOLITANO HC</h1>
                    )
                }
                {
                    (width <= 1050) && (
                        <RxHamburgerMenu className='menuIcon' size={35} />
                    )
                }
            </div>
            {((location.pathname != '/' && location.pathname != '/signup' && location.pathname != '/error/unauthorized') && (width > 1050)) &&
                <div id='navbar'>
                    <NavBar
                        authenticatedUserPlayerId={authenticatedUserPlayerId}
                        isCoach={isCoach}
                    />
                </div>
            }
        </div>
    )
}

export default Header