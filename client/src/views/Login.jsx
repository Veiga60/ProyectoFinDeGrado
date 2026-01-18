import '../style/Login.css'
import Header from '../components/Header.jsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import googleLogo from '../assets/images/google.png'

export default function Login() {

    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const SERVER_URL = "http://localhost:8081"

    const login = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/login`,
                {
                    userName: username,
                    password: password
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            localStorage.setItem('jwt', response.data);
            navigate("/home");
        } catch (error) {
            console.error("Failed logging in");
            console.error(error);
        }
    }

    const googleLogin = async () => {
        window.location.href = 'http://localhost:8081/oauth2/authorization/google'
    }

    return (
        <>
            <Header />
            <div id='mainDiv'>
                <div id='welcomeTextDiv'>
                    <p id='welcomeText'>BIENVENIDO</p>
                </div>
                <div id='inputsDiv'>
                    <input
                        id='usernameInput'
                        type="text"
                        placeholder='Nombre de usuario'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        id='passwordInput'
                        type="password"
                        placeholder='Contraseña'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div id='loginButtonDiv'>
                    <button onClick={login}>INICIAR SESIÓN</button>
                </div>
                <div id='googleLoginButtonDiv'>
                    <button id='googleButton' onClick={googleLogin}><img id='googleLogo' src={googleLogo} alt="Google" /><p id='loginGoogleText'>Continuar con Google</p></button>
                </div>
                <div id='notHaveAccountDiv'>
                    <p id='notHaveAccount' onClick={() => navigate("/signup")}>¿No tienes una cuenta? Crea una.</p>
                </div>
            </div >
        </>
    )
}