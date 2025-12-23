import '../style/PlayerCard.css'
import axios from 'axios'

export default function PlayerCard({ player, onClick }) {

    return (
        <>
            <div id="playerCardDiv" onClick={onClick}>
                <div id="playerPhotoDiv">
                    <img id="playerPhoto" src={`/players/${player.photo}`} alt={`${player.name} ${player.lastName1} ${player.lastName2}`} />
                </div>
                <p id="playerName">{player.name} {player.lastName1} {player.lastName2}</p>
            </div>
        </>
    )
}