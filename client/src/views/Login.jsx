import '../style/Login.css'
import Header from '../components/Header.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const SERVER_URL = "http://localhost:8081"

    const login = async () => {
        try {
            const token = await axios.post(`${SERVER_URL}/login`,
                {
                    email: email,
                    password: password
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            navigate("/matches")
            return token;
        } catch (error) {
            console.error("Failed logging in");
            console.error(error)
        }
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
                </div>
                <div id='loginButtonDiv'>
                    <button onClick={login}>INICIAR SESIÓN</button>
                </div>
                <div id='notHaveAccountDiv'>
                    <Link to={"/signup"}><p id='notHaveAccount'>¿No tienes una cuenta? Crea una.</p></Link>
                </div>
            </div>
        </>
    )
}

export default Login