import Header from '../components/Header.jsx'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';

export default function ForumDebates() {

    const SERVER_URL = 'http://localhost:8081'
    const location = useLocation();
    const { category } = useParams();

    useEffect(() => {
        // getDebates
    }, []);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state.authenticatedUserPlayerId}
                isCoach={location.state.isCoach}
            />
            <div>
                <div>
                    <button>CREAR DEBATE</button>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}