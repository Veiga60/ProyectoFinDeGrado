import Header from '../components/Header.jsx'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import CreateDebateModal from '../components/CreateDebateModal.jsx'
import '../style/ForumDebates.css'

export default function ForumDebates() {

    const SERVER_URL = 'http://localhost:8081'
    const location = useLocation();
    const { category } = useParams();
    const navigate = useNavigate();

    const [createDebateModal, setCreateDebateModal] = useState(false);

    const [debates, setDebates] = useState([]);
    const [title, setTitle] = useState();

    const toggleCreateDebateModal = async () => {
        await setCreateDebateModal(!createDebateModal);
    }

    const getDebates = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/debates/categories/${String(category).toUpperCase()}`, { withCredentials: true })
            setDebates(response.data);
        } catch (error) {
            console.log('Error fetching debates: ', error);
        }
    }

    const createDebate = async () => {
        try {
            await axios.post(`${SERVER_URL}/debates`,
                {
                    'title': title,
                    'category': String(category).toUpperCase()
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    withCredentials: true
                })
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
            <div id='debatesMainDiv'>
                <div id='debatesDiv'>
                    {
                        debates.map((debate) => {
                            return (
                                <div key={debate.id} className='debateDiv' onClick={() => navigate(`/forum/categories/${category}/${debate.id}`, {
                                    state: { authenticatedUserPlayerId: location.state.authenticatedUserPlayerId, isCoach: location.state.isCoach }
                                })}>
                                    <p id='debateText'>{debate.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div id='createDebateButtonDiv'>
                    {(location.state.isCoach) &&
                        (
                            <button className='createDebateButton' onClick={toggleCreateDebateModal}>NUEVO DEBATE</button>
                        )
                    }
                </div>
            </div >
            {(createDebateModal) &&
                (
                    <CreateDebateModal
                        createDebate={createDebate}
                        onClose={toggleCreateDebateModal}
                        setTitle={setTitle}
                    />
                )
            }
        </>
    )
}