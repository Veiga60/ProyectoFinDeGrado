import '../style/PlayerCard.css'
import basicUser from '../assets/images/basicUser.png'

export default function PlayerCard({ player, onClick, status, enableHover }) {

    return (
        <>
            <div id="playerCardDiv" className={(enableHover == true && (status != 'PENDING' && status != 'OUT' && status != 'CONFIRMED')) ? ("playerCardHover") : (undefined)} onClick={onClick}>
                <div id="playerPhotoDiv" className={(status != undefined) ? (status == 'PENDING' && 'playerPendingDiv') || (status == 'CONFIRMED' && 'playerConfirmedDiv') || (status == 'OUT' && 'playerOutDiv') || (status == 'NOT CALLED' && 'playerNotCalledDiv') : (undefined)}>
                    <img id="playerPhoto" src={player.photo ? `/players/${player.photo}` : basicUser} alt={`${player.name} ${player.lastName1} ${player.lastName2}`} />
                </div>
                <p id="playerName">{player.name} {player.lastName1} {player.lastName2}</p>
            </div>
        </>
    )
}