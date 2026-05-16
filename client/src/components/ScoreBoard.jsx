import '../style/ScoreBoard.css'
import basicLogo from '../assets/images/basicLogo.png'

export default function ScoreBoard({ match, localTeamGoals, visitingTeamGoals }) {
    return (
        <div id='scoreBoardDiv'>
            <div id='localDiv'>
                <div id='localImageDiv' className='teamImageDiv'>
                    <img src={localTeam.logo ? `/logos/${match?.localTeam.logo}` : basicLogo} alt={match?.localTeam.name} />
                </div>
                <div id='localNameDiv'>
                    <p id='localNameText'>{match?.localTeam.name}</p>
                </div>
                <div id='localGoalsDiv'>
                    <p id='localGoalsText'>{localTeamGoals}</p>
                </div>
            </div>
            <div id='sepratorTextDiv'>
                <p id='separatorText'> - </p>
            </div>
            <div id='visitingDiv'>
                <div id='visitingGoalsDiv'>
                    <p id='visitingGoalsText'>{visitingTeamGoals}</p>
                </div>
                <div id='visitingNameDiv'>
                    <p id='visitingNameText'>{match?.visitingTeam.name}</p>
                </div>
                <div id='visitingImageDiv' className='teamImageDiv'>
                    <img src={visitingTeam.logo ? `/logos/${match?.visitingTeam.logo}` : basicLogo} alt={match?.visitingTeam.name} />
                </div>
            </div>
        </div>
    )
}