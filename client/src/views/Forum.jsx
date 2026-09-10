import Header from '../components/Header.jsx'
import ClubTeamSelector from '../components/ClubTeamSelector.jsx'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../components/AuthContext.jsx'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import SERVER_URL from '../config.js'
import '../style/Forum.css'

export default function Forum() {

    const navigate = useNavigate();

    const { authenticatedUser } = useContext(AuthContext);

    const [clubTeamId, setClubTeamId] = useState();

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/categories/clubTeams/${clubTeamId}`, { withCredentials: true });
            setCategories(response.data || []);
        } catch (error) {
            console.log('Error obteniendo las categorías de debates: ', error);
            setCategories([]);
        }
    }

    useEffect(() => {
        const defaultClubTeams = authenticatedUser?.isCoach
            ? authenticatedUser?.coach?.clubTeams
            : authenticatedUser?.player?.clubTeams;
        if (defaultClubTeams?.length > 0 && !clubTeamId) {
            setClubTeamId(defaultClubTeams[0].id);
        }
    }, [authenticatedUser]);

    useEffect(() => {
        if (clubTeamId) {
            getCategories();
        }
    }, [clubTeamId]);

    return (
        <>
            <Header />
            <ClubTeamSelector
                clubTeams={(authenticatedUser?.isCoach == true) ? (authenticatedUser?.coach?.clubTeams) : (authenticatedUser?.player?.clubTeams)}
                setClubTeamId={setClubTeamId}
            />
            <div id='forumMainDiv'>
                {
                    categories?.map((category) => (
                        <div key={category.id} className='categoryDiv' onClick={() => navigate(`/forum/categories/${category.name ? category.name.replace(' ', '_').toLowerCase() : ''}`)}>
                            <p className='categoryText'>{category.name}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}