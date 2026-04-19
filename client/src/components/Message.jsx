import '../style/Message.css'
import coachPhoto from '../assets/images/coachPhoto.png'

export default function Message({ message }) {
    return (
        <>
            <div id="mainMessageDiv">
                <div id='messageUserInfoDiv'>
                    {
                        (message.user.isCoach)
                            ? (
                                <>
                                    <img id='messageUserPlayerPhoto' src={coachPhoto} alt={`${message.user.username}`} />
                                    <p id='messageUserPlayerText'>{message.user.username}</p>
                                </>
                            ) : (
                                <>
                                    <img id='messageUserPlayerPhoto' src={`/players/${message.user.player?.photo}`} alt={`${message.user.player?.name} ${message.user.player?.lastName1} ${message.user.player?.lastName2}`} />
                                    <p id='messageUserPlayerText'>{message.user.player?.name} {message.user.player?.lastName1}</p>
                                </>
                            )
                    }
                </div>
                <div id='messageContainerDiv'>
                    <div id='messageDiv'>
                        <p id='messageText'>{message.text}</p>
                    </div>
                </div>
            </div>
        </>
    )
}