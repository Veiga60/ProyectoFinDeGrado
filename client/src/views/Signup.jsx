import '../style/Signup.css'
import Header from '../components/Header.jsx'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCoach, setIsCoach] = useState(false);

    const SERVER_URL = 'http://localhost:8081'

    const signup = async () => {

        try {
            const response = await axios.post(`${SERVER_URL}/users`,
                {
                    'name': name,
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
            setName('');
            setName('');
            setIsCoach(false);

            return response;
        } catch (error) {
            console.error('Failed creating new user');
            console.error(error);
        }
    }


    return (
        <>
            <Header />
            <div id='mainDiv'>
                <div id='signupTextDiv'>
                    <p id='signupText'>BIENVENIDO</p>
                </div>
                <div id='inputsDiv'>
                    <input
                        id='nameInput'
                        type="text"
                        placeholder='Nombre'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        id='emailInput'
                        type="text"
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        id='passwordInput'
                        type="password"
                        placeholder='Contraseña'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div id='isTrainerDiv'>
                        <input
                            id='isTrainerInput'
                            type="checkbox"
                            onChange={(e) => setIsCoach(e.target.value)}
                        />
                        <label htmlFor='isTrainerInput' id='checkBoxLabel'>Soy entrenador</label>
                    </div>
                </div>
                <div id='signupButtonDiv'>
                    <Link to={"/"}><button onClick={signup}>CREAR CUENTA</button></Link>
                </div>
                <div id='alreadyHaveAccountDiv'>
                    <Link to={"/"}><p id='alreadyHaveAccount'>¿Ya tienes una cuenta? Inicia sesión.</p></Link>
                </div>
            </div>
        </>
    )
}

export default Signup