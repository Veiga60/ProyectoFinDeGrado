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
    const [passwordInputType, setPasswordInputType] = useState('password');


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
                setError('Correo eléctronico no permitido');
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
            <div id='signupMainDiv'>
                <div id='signupTextDiv'>
                    <p id='signupText'>BIENVENIDO</p>
                </div>
                {
                    (error !== undefined && error !== '') && (
                        <p id='signupErrorText'>{error}</p>
                    )
                }
                <div id='signupInputsDiv'>
                    <input
                        id='nameInput'
                        className='signupInput'
                        type="text"
                        placeholder='Nombre'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        id='emailInput'
                        className='signupInput'
                        type="text"
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div id='signupPasswordInputDiv'>
                        <input
                            id='passwordInput'
                            className='signupInput'
                            type={passwordInputType}
                            placeholder='Contraseña'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {
                            (showPassword) ? (<FaEyeSlash className='eyeIcon' onClick={toggleShowPassword} />) : (<FaEye className='eyeIcon' onClick={toggleShowPassword} />)
                        }
                    </div>
                    <div id='isTrainerDiv'>
                        <input
                            id='isTrainerInput'
                            className='signupInput'
                            type="checkbox"
                            onChange={(e) => setIsCoach(e.target.checked)}
                        />
                        <label htmlFor='isTrainerInput' id='checkBoxLabel'>Soy entrenador</label>
                    </div>
                </div>
                <div id='signupButtonDiv'>
                    <button className='signupButton' onClick={signup}>CREAR CUENTA</button>
                </div>
                <div id='alreadyHaveAccountDiv'>
                    <p id='alreadyHaveAccount' onClick={() => navigate("/")}>¿Ya tienes una cuenta? Inicia sesión.</p>
                </div>
            </div>
        </>
    )
}