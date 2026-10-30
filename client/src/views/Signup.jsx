import '../style/Signup.css'
import Header from '../components/Header.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import SERVER_URL from '../config.js'

export default function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCoach, setIsCoach] = useState(false);

    const [error, setError] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const signup = async () => {
        try {
            await axios.post(`${SERVER_URL}/users`,
                {
                    'username': name,
                    'email': email,
                    'password': password,
                    'isCoach': isCoach
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            setName('');
            setEmail('');
            setPassword('');
            setIsCoach(false);

            navigate('/');

        } catch (error) {
            if (error.status == 401) {
                setError('Correo electrónico no permitido');
            } else if (error.status == 409) {
                setError('Nombre de usuario ya en uso');
            } else if (error.status == 403) {
                setError('Contraseña no válida');
            } else {
                setError('Error al crear cuenta de usuario');
            }
            console.log('Failed creating new user', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signup();
    }

    return (
        <>
            <Header />
            <main id='signupPage'>
                <div id='signupMainDiv'>
                    <div id='signupTextDiv'>
                        <h1 id='signupText'>Crea tu cuenta</h1>
                        <p id='signupSubtext'>Rellena tus datos para empezar</p>
                    </div>

                    {error && (
                        <p id='signupErrorText' role='alert'>{error}</p>
                    )}

                    <form id='signupForm' onSubmit={handleSubmit}>
                        <div className='signupField'>
                            <input
                                id='nameInput'
                                className='signupInput'
                                type='text'
                                placeholder='Nombre de usuario'
                                autoComplete='username'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='signupField'>
                            <input
                                id='emailInput'
                                className='signupInput'
                                type='email'
                                placeholder='tu@email.com'
                                autoComplete='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='signupField'>
                            <div className='signupInputWrapper'>
                                <input
                                    id='signupPasswordInput'
                                    className='signupInput'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Contraseña'
                                    autoComplete='new-password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type='button'
                                    className='signupEyeButton'
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showPassword ? <FaEyeSlash size={17} /> : <FaEye size={17} />}
                                </button>
                            </div>
                        </div>

                        <div id='isTrainerDiv'>
                            <input
                                id='isTrainerInput'
                                type='checkbox'
                                checked={isCoach}
                                onChange={(e) => setIsCoach(e.target.checked)}
                            />
                            <label htmlFor='isTrainerInput' id='checkBoxLabel'>Soy entrenador</label>
                        </div>

                        <button id='signupButton' type='submit'>
                            Crear cuenta
                        </button>
                    </form>

                    <div id='alreadyHaveAccountDiv'>
                        <p id='alreadyHaveAccount'>
                            ¿Ya tienes una cuenta?{' '}
                            <button id='loginLink' type='button' onClick={() => navigate('/')}>
                                Inicia sesión
                            </button>
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}
