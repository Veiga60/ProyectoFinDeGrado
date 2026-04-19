import Header from '../components/Header.jsx'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../style/Forum.css'

export default function Forum() {

    const SERVER_URL = 'http://localhost:8081';
    const location = useLocation();
    const navigate = useNavigate();

    const categories = ['LIGA PLATA', 'TEMAS COMUNES'];

    const [debates, setDebates] = useState();

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state.authenticatedUserPlayerId}
                isCoach={location.state.isCoach}
            />
            <div id='forumMainDiv'>
                {
                    categories.map((category, index) => (
                        <div key={index} className='categoryDiv' onClick={() => navigate(`/forum/categories/${category.replace(' ', '_').toLowerCase()}`, { state: { authenticatedUserPlayerId: location.state.authenticatedUserPlayerId, isCoach: location.state.isCoach } })}>
                            <p className='categoryText'>{category}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}