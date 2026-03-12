import Header from '../components/Header.jsx'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Messages() {

    const SERVER_URL = 'http://localhost:8081'
    const location = useLocation();
    const { debateId } = useParams();

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state.authenticatedUserPlayerId}
                isCoach={location.state.isCoach}
            />
            <div id='messagesMainDiv'>
                <div id='messagesArea'>

                </div>
                <div id='publishMessageArea'>
                    <textarea name="messageTextArea" id="messageTextArea" />
                    <button>ENVIAR</button>
                </div>
            </div >

        </>
    )
}