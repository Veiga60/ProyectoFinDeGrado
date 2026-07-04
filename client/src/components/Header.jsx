import '../style/Header.css'
import logo from '../assets/images/tigre-transparente.png'
import NavBar from '../components/NavBar.jsx'
import { useLocation } from 'react-router-dom'
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx'
import { useState, useEffect } from 'react'
import HamburgerMenu from './HamburgerMenu.jsx'


function Header({ authenticatedUserPlayerId, isCoach, authenticatedUser }) {

    const location = useLocation();

    const [width, setWidth] = useState(window.innerWidth);
    const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

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
                    (width > 420 || location.pathname == '/') && (
                        <h1 id='title'>METROPOLITANO HC</h1>
                    )
                }
                {
                    (width <= 1050) && (
                        ((location.pathname != '/' && location.pathname != '/signup' && location.pathname != '/error/unauthorized' && location.pathname != '/select_role'))
                        && ((!showHamburgerMenu)
                            ? (<RxHamburgerMenu className='menuIcon' color='white' size={35} onClick={() => setShowHamburgerMenu(true)} />)
                            : (<RxCross1 className='menuIcon' color='white' size={35} onClick={() => setShowHamburgerMenu(false)} />))
                    )
                }
            </div>
            {((location.pathname != '/' && location.pathname != '/signup' && location.pathname != '/error/unauthorized' && location.pathname != '/select_role') && (width > 1050)) &&
                <div id='navbar'>
                    <NavBar
                        authenticatedUser={authenticatedUser}
                        authenticatedUserPlayerId={authenticatedUserPlayerId}
                        isCoach={isCoach}
                    />
                </div>
            }
            {
                (width < 1050) && (
                    <HamburgerMenu
                        authenticatedUserPlayerId={authenticatedUserPlayerId}
                        isCoach={isCoach}
                        className={showHamburgerMenu ? 'menuIsOpen' : 'menuIsClosed'}
                    />
                )
            }
        </div>
    )
}

export default Header