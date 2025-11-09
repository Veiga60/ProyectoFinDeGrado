import './style/Signup.css'
import Header from './Header.jsx'

function Signup({changeHasAccount}) {
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
                <button>CREAR CUENTA</button>
            </div>
            <div id='alreadyHaveAccountDiv'>
                <p id='alreadyHaveAccount' onClick={changeHasAccount}>¿Ya tienes una cuenta? Inicia sesión.</p>
            </div>
        </div>
        </>
    )
}

export default Signup