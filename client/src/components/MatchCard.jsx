import '../style/MatchCard.css'

export default function MatchCard({ match, onClick }) {

    const rivalTeam = (match.localTeam.name != 'Metropolitano HC') ? (match.localTeam) : (match.visitingTeam);

    return (
        <div id="cardDiv" onClick={onClick}>
            <div id='selectButtonDiv'>
                <button id='selectButton'>SELECCIONAR</button>
            </div>
            <div id="dateTimeDiv">
                <p id='dateTimeText'>{match?.date.split("-").reverse().join("/")} - {match?.time.substring(0, 5)}</p>
            </div>
            <div id="teamDiv">
                <p id='vsText'>VS</p>
                <div id='rivalTeamImageDiv'>
                    <img id='rivalTeamImage' src={`/logos/${rivalTeam.logo}`} alt={rivalTeam.name} />
                </div>
            </div>
        </div>
    )
}