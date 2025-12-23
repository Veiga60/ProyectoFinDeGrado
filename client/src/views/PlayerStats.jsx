import { useParams } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import '../style/PlayerStats.css'

export default function PlayerStats() {

    const SERVER_URL = 'http://localhost:8081';
    const { id } = useParams();

    const getPlayer = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/players/${id}`);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPlayer();
    }, []);

    return (
        <>
            <Header />
        </>
    )
}