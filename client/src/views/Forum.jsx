import Header from '../components/Header.jsx'
import { useLocation } from 'react-router-dom'
import '../style/Forum.css'

export default function Forum() {

    const SERVER_URL = 'http://localhost:8081'
    const location = useLocation()

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state.authenticatedUserPlayerId}
                isCoach={location.state.isCoach}
            />
            <div id='forumMainDiv'>

            </div>
        </>
    )
}