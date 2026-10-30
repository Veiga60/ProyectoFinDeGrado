import '../style/Login.css'
import Header from '../components/Header.jsx'
import { useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import googleLogo from '../assets/images/google.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { AuthContext } from '../context/AuthContext.jsx'
import { useClub } from '../context/ClubContext.jsx'
import SERVER_URL from '../config.js'

export default function Login() {
    const navigate = useNavigate()
    const { login: loginContext } = useContext(AuthContext);

    const { clearClub, refreshClub } = useClub();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const login = async () => {
        try {
            const user = await loginContext(username, password);
            if ((user?.isCoach == true) && (user?.coach?.clubTeams == null || user?.coach?.clubTeams.length == 0)) {
                await refreshClub();
                navigate("/select_clubTeams")
            } else {
                await refreshClub();
                navigate("/home");
            }
        } catch (error) {
            if (error.status == 403) {
                setError('Usuario y/o contraseña incorrectos');
            } else {
                setError('Error al iniciar sesión');
            }
            console.log('Failed logging in', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
    }

    const googleLogin = () => {
        window.location.href = `${SERVER_URL}/oauth2/authorization/google`
    }

    useEffect(() => {
        clearClub();
    }, [clearClub]);

    return (
        <>
            <Header />
            <main id='loginPage'>
                <div id='loginMainDiv'>
                    <div id='welcomeTextDiv'>
                        <h1 id='welcomeText'>Bienvenido</h1>
                        <p id='welcomeSubtext'>Inicia sesión para continuar</p>
                    </div>

                    {error && (
                        <p id='loginErrorText' role='alert'>{error}</p>
                    )}

                    <form id='loginForm' onSubmit={handleSubmit}>
                        <div className='loginField'>
                            <input
                                id='usernameInput'
                                className='loginInput'
                                type='text'
                                placeholder='Nombre de usuario'
                                autoComplete='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className='loginField'>
                            <div className='loginInputWrapper'>
                                <input
                                    id='passwordInput'
                                    className='loginInput'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Contraseña'
                                    autoComplete='current-password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type='button'
                                    className='eyeButton'
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showPassword ? <FaEyeSlash size={17} /> : <FaEye size={17} />}
                                </button>
                            </div>
                        </div>

                        <button id='loginButton' className='loginButton' type='submit'>
                            Iniciar sesión
                        </button>
                    </form>

                    <div id='loginDivider'>o</div>

                    <button id='googleButton' className='loginButton' type='button' onClick={googleLogin}>
                        <img id='googleLogo' src={googleLogo} alt='' />
                        Continuar con Google
                    </button>

                    <div id='notHaveAccountDiv'>
                        <p id='notHaveAccount'>
                            ¿No tienes una cuenta?{' '}
                            <button id='signupLink' type='button' onClick={() => navigate('/signup')}>
                                Crea una
                            </button>
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}
