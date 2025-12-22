export default function PlayerCard({ player }) {
    return (
        <>
            <div>
                <div>
                    <img src={`/players/${player.photo}`} alt={`${player.name} ${player.lastName1} ${player.lastName2}`} />
                </div>
                <p>{player.name} {player.lastName1} {player.lastName2}</p>
            </div>
        </>
    )
}