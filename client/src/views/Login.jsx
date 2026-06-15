import '../style/Login.css'
import Header from '../components/Header.jsx'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import googleLogo from '../assets/images/google.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Login() {

    const SERVER_URL = "http://localhost:8081"
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordInputType, setPasswordInputType] = useState('password');

    const login = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/login`,
                {
                    username: username,
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
            if (error.status == 403) {
                setError('Usuario y/o contraseña incorrectos');
            } else {
                setError('Error al iniciar sesión');
            }
            console.log('Failed logging in', error);
        }
    }

    const googleLogin = async () => {
        window.location.href = 'http://localhost:8081/oauth2/authorization/google'
    }

    const toggleShowPassword = () => {
        if (!showPassword) {
            setPasswordInputType('text');
            setShowPassword(true);
        } else {
            setPasswordInputType('password');
            setShowPassword(false);
        }
    }

    return (
        <>
            <Header />
            <div id='loginMainDiv'>
                <div id='welcomeTextDiv'>
                    <p id='welcomeText'>BIENVENIDO</p>
                </div>
                {
                    (error !== undefined && error !== '') && (
                        <p id='loginErrorText'>{error}</p>
                    )
                }
                <div id='loginInputsDiv'>
                    <input
                        id='usernameInput'
                        className='loginInput'
                        type="text"
                        placeholder='Nombre de usuario'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div id='loginPasswordInputDiv'>
                        <input
                            id='passwordInput'
                            className='loginInput'
                            type={passwordInputType}
                            placeholder='Contraseña'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {
                            (showPassword) ? (<FaEyeSlash className='eyeIcon' onClick={toggleShowPassword} />) : (<FaEye className='eyeIcon' onClick={toggleShowPassword} />)
                        }
                    </div>
                </div>
                <div id='buttonsDiv'>
                    <button className='loginButton' onClick={login}>INICIAR SESIÓN</button>
                    <button id='googleButton' className='loginButton' onClick={googleLogin}><img id='googleLogo' src={googleLogo} alt="Google" /><p id='loginGoogleText'>Continuar con Google</p></button>
                </div>
                <div id='notHaveAccountDiv'>
                    <p id='notHaveAccount' onClick={() => navigate("/signup")}>¿No tienes una cuenta? Crea una.</p>
                </div>
            </div >
        </>
    )
}