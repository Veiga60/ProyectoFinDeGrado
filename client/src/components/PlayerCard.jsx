import '../style/PlayerCard.css'
import axios from 'axios'

export default function PlayerCard({ player, onClick, status, enableHover }) {

    return (
        <>
            <div id="playerCardDiv" className={(enableHover == 'true') ? ("playerCardHover") : (undefined)} onClick={onClick}>
                <div id="playerPhotoDiv" className={(status != undefined) ? (status == 'PENDING' && 'playerPendingDiv') || (status == 'CONFIRMED' && 'playerConfirmedDiv') || (status == 'OUT' && 'playerOutDiv') || (status == 'NOT CALLED' && 'playerNotCalledDiv') : (undefined)}>
                    <img id="playerPhoto" src={`/players/${player.photo}`} alt={`${player.name} ${player.lastName1} ${player.lastName2}`} />
                </div>
                <p id="playerName">{player.name} {player.lastName1} {player.lastName2}</p>
            </div>
        </>
    )
}