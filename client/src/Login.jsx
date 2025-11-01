import './style/Login.css'

function Login() {
    return(
        <div id='mainDiv'>
            <div id='welcomeTextDiv'>
                <p id='welcomeText'>BIENVENIDO</p>
            </div>
            <div id='inputsDiv'>
                <input id='emailInput' type="text" placeholder='Email'/>
                <input id='passwordInput' type="text" placeholder='Contraseña'/>
            </div>
            <div id='loginButtonDiv'>
                <button>INICIAR SESIÓN</button>
            </div>
            <div id='notHaveAccountDiv'>
                <p id='notHaveAccount'>No tengo una cuenta</p>
            </div>
        </div>
    )
}

export default Login