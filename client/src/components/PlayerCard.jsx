import '../style/PlayerCard.css'

export default function PlayerCard({ player }) {
    return (
        <>
            <div id="playerCardDiv">
                <div id="playerPhotoDiv">
                    <img id="playerPhoto" src={`/players/${player.photo}`} alt={`${player.name} ${player.lastName1} ${player.lastName2}`} />
                </div>
                <p id="playerName">{player.name} {player.lastName1} {player.lastName2}</p>
            </div>
        </>
    )
}