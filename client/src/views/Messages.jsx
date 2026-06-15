import Header from '../components/Header.jsx'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../style/Messages.css'
import { IoSend } from "react-icons/io5";
import Message from '../components/Message.jsx'

export default function Messages() {

    const SERVER_URL = 'http://localhost:8081'
    const location = useLocation();
    const { debateId } = useParams();

    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    const getMessages = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/debates/${debateId}/messages`, { withCredentials: true });
            setMessages(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('Error fetching messages: ', error);
        }
    }

    const publishMessage = async () => {
        try {
            const user = await axios.get(`${SERVER_URL}/me`, { withCredentials: true });
            await axios.post(`${SERVER_URL}/debates/${debateId}/messages`,
                {
                    'text': text,
                    'user': { 'email': user.data.email }
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    withCredentials: true
                });
        } catch (error) {
            console.log('Error publishing message: ', error);
        }
    }

    useEffect(() => {
        getMessages()
    }, []);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state.authenticatedUserPlayerId}
                isCoach={location.state.isCoach}
            />
            <div id='messagesMainDiv'>
                <div id='messagesArea'>
                    {
                        messages.map((message) => {
                            return (
                                <Message
                                    key={message.id}
                                    message={message}
                                />
                            )
                        })
                    }
                </div>
                <div id='publishMessageArea'>
                    <div id='textAreaDiv'>
                        <textarea placeholder='Escribe tu mensaje' name="messageTextArea" id="messageTextArea" onChange={(e) => setText(e.target.value)} />
                        <IoSend className='sendIcon' color='white' size={30} onClick={async () => { await publishMessage(), window.location.reload() }} />
                    </div>
                </div>
            </div >

        </>
    )
}