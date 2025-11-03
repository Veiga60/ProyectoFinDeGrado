import './style/Login.css'
import eyeOpened from './assets/icons/password-eye-opened.png'

function Login({changeHasAccount}) {
    return(
        <div id='mainDiv'>
            <div id='welcomeTextDiv'>
                <p id='welcomeText'>BIENVENIDO</p>
            </div>
            <div id='inputsDiv'>
                <input id='emailInput' type="text" placeholder='Email'/>
                <input id='passwordInput' type="password" placeholder='Contraseña'/>
            </div>
            <div id='loginButtonDiv'>
                <button>INICIAR SESIÓN</button>
            </div>
            <div id='notHaveAccountDiv'>
                <p id='notHaveAccount' onClick={changeHasAccount}>¿No tienes una cuenta? Crea una.</p>
            </div>
        </div>
    )
}

export default Login