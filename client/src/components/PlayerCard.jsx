import '../style/PlayerCard.css'
import axios from 'axios'

export default function PlayerCard({ player, onClick, status }) {

    return (
        <>
            <div id="playerCardDiv" onClick={onClick}>
                <div id="playerPhotoDiv" className={(status == 'PENDING' && 'playerPendingDiv') || (status == 'CONFIRMED' && 'playerConfirmedDiv') || (status == 'OUT' && 'playerOutDiv') || (status == 'NOT CALLED' && '')}>
                    <img id="playerPhoto" src={`/players/${player.photo}`} alt={`${player.name} ${player.lastName1} ${player.lastName2}`} />
                </div>
                <p id="playerName">{player.name} {player.lastName1} {player.lastName2}</p>
            </div>
        </>
    )
}