import Header from '../components/Header.jsx'
import axios from 'axios'
import { useEffect } from 'react';

export default function Home() {

    const SERVER_URL = 'http://localhost:8081';

    const whoAmI = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/me`, { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.log('Error al obtener la información del usuario: ', error);
        }
    }

    useEffect(() => {
        whoAmI();
    }, []);

    return (
        <>
            <Header />
        </>
    )
}