import '../style/Header.css'
import logo from '../assets/images/tigre-transparente.png'

function Header() {
    return (
        <div id='headerDiv'>
            <div id='titleDiv'>
                <img id='logo' src={logo} alt="logoApp" />
                <h1 id='title'>METROPOLITANO HC</h1>
            </div>
        </div>
    )
}

export default Header