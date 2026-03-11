import Header from '../components/Header.jsx'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ForumDebates() {

    const SERVER_URL = 'http://localhost:8081'
    const location = useLocation();
    const { category } = useParams();

    const [debates, setDebates] = useState([]);

    const getDebates = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/debates/categories/${category}`, { withCredentials: true })
            setDebates(response.data);
        } catch (error) {
            console.log('Error fetching debates: ', error);
        }
    }

    const createDebate = async () => {
        try {
            await axios.post(`${SERVER_URL}/debates`, { withCredentials: true })
        } catch (error) {
            console.log('Error creating debate: ', error)
        }
    }

    useEffect(() => {
        getDebates()
    }, []);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state.authenticatedUserPlayerId}
                isCoach={location.state.isCoach}
            />
            <div>
                <div>
                    {(location.state.isCoach) &&
                        (
                            <button>CREAR DEBATE</button>
                        )
                    }
                </div>
                <div>
                    {
                        debates.map((debate) => {
                            <div key={debate.id}>
                                {debate.title}
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}