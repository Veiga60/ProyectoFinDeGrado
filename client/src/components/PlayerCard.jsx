import '../style/PlayerCard.css'
import axios from 'axios'

export default function PlayerCard({ player }) {

    const SERVER_URL = 'http://localhost:8081';

    const getPlayer = async () => {
        try {
            console.log('Id: ' + player.id);
            const response = await axios.get(`${SERVER_URL}/players/${player.id}`);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div id="playerCardDiv" onClick={getPlayer}>
                <div id="playerPhotoDiv">
                    <img id="playerPhoto" src={`/players/${player.photo}`} alt={`${player.name} ${player.lastName1} ${player.lastName2}`} />
                </div>
                <p id="playerName">{player.name} {player.lastName1} {player.lastName2}</p>
            </div>
        </>
    )
}