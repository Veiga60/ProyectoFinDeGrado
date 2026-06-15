import '../style/MatchCard.css'
import basicLogo from '../assets/images/basicLogo.png'

export default function MatchCard({ match, onClick, className }) {

    const rivalTeam = (match.localTeam.name != 'Metropolitano HC') ? (match.localTeam) : (match.visitingTeam);

    return (
        <div id="cardDiv" className={className} onClick={onClick}>
            <div id='selectButtonDiv'>
                <button id='selectButton'>SELECCIONAR</button>
            </div>
            <div id="dateTimeDiv">
                <p id='dateTimeText'>{match?.date.split("-").reverse().join("/")} - {match?.time.substring(0, 5)}</p>
            </div>
            <div id="teamDiv">
                <p id='vsText'>VS</p>
                <div id='rivalTeamImageDiv'>
                    <img id='rivalTeamImage' src={rivalTeam.logo ? `/logos/${rivalTeam.logo}` : basicLogo} alt={rivalTeam.name} />
                </div>
            </div>
        </div>
    )
}