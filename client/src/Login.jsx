import './style/Login.css'
import Header from './Header.jsx'
import { Link } from 'react-router-dom'

function Login() {
    return(
        <>
        <Header />
        <div id='mainDiv'>
            <div id='welcomeTextDiv'>
                <p id='welcomeText'>BIENVENIDO</p>
            </div>
            <div id='inputsDiv'>
                <input id='emailInput' type="text" placeholder='Email' />
                <input id='passwordInput' type="password" placeholder='Contraseña' />
            </div>
            <div id='loginButtonDiv'>
                <button>INICIAR SESIÓN</button>
            </div>
            <div id='notHaveAccountDiv'>
               <Link to={"/signup"}><p id='notHaveAccount'>¿No tienes una cuenta? Crea una.</p></Link>
            </div>
        </div>
        </>
    )
}

export default Login