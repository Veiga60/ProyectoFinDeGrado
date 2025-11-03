import './style/Signup.css'

function Signup({changeHasAccount}) {
    return(
        <div id='mainDiv'>
            <div id='signupTextDiv'>
                <p id='signupText'>BIENVENIDO</p>
            </div>
            <div id='inputsDiv'>
                <input id='nameInput' type="text" placeholder='Nombre'/>
                <input id='emailInput' type="text" placeholder='Email'/>
                <input id='passwordInput' type="password" placeholder='Contraseña'/>
            </div>
            <div id='signupButtonDiv'>
                <button>CREAR CUENTA</button>
            </div>
            <div id='alreadyHaveAccountDiv'>
                <p id='alreadyHaveAccount' onClick={changeHasAccount}>¿Ya tienes una cuenta? Inicia sesión.</p>
            </div>
        </div>
    )
}

export default Signup