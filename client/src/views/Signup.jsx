import '../style/Signup.css'
import Header from '../components/Header.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

export default function Signup() {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCoach, setIsCoach] = useState(false);


    const signup = async () => {

        try {
            const response = await axios.post(`${SERVER_URL}/users`,
                {
                    'userName': name,
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
            console.error('Failed creating new user');
            console.error(error);
        }
    }


    return (
        <>
            <Header />
            <div id='signupMainDiv'>
                <div id='signupTextDiv'>
                    <p id='signupText'>BIENVENIDO</p>
                </div>
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
                    <input
                        id='passwordInput'
                        className='signupInput'
                        type="password"
                        placeholder='Contraseña'
                        onChange={(e) => setPassword(e.target.value)}
                    />
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