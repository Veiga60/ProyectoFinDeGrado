import './style/Signup.css'
import Header from './Header.jsx'
import { Link } from 'react-router-dom'

function Signup() {
    return(
        <>
        <Header />
        <div id='mainDiv'>
            <div id='signupTextDiv'>
                <p id='signupText'>BIENVENIDO</p>
            </div>
            <div id='inputsDiv'>
                <input id='nameInput' type="text" placeholder='Nombre'/>
                <input id='emailInput' type="text" placeholder='Email'/>
                <input id='passwordInput' type="password" placeholder='Contraseña'/>
                <div id='isTrainerDiv'>
                    <input id='isTrainerInput' type="checkbox"/>
                    <label for='isTrainerInput' id='checkBoxLabel'>Soy entrenador</label>
                </div>
            </div>
            <div id='signupButtonDiv'>
                <Link to={"/"}><button>CREAR CUENTA</button></Link>
            </div>
            <div id='alreadyHaveAccountDiv'>
                <Link to={"/"}><p id='alreadyHaveAccount'>¿Ya tienes una cuenta? Inicia sesión.</p></Link>
            </div>
        </div>
        </>
    )
}

export default Signup