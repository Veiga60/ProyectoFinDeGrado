import '../style/ScoreBoard.css'

export default function ScoreBoard({ match, localTeamGoals, visitingTeamGoals }) {
    return (
        <div id='scoreBoardDiv'>
            <div id='localDiv'>
                <div id='localImageDiv' className='teamImageDiv'>
                    <img src={`/logos/${match?.localTeam.logo}`} alt={match?.localTeam.name} />
                </div>
                <div id='localNameDiv'>
                    <p id='localNameText'>{match?.localTeam.name}</p>
                </div>
                <div id='localGoalsDiv'>
                    <p id='localGoalsText'>{localTeamGoals}</p>
                </div>
            </div>
            <div>
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
                    <img src={`/logos/${match?.visitingTeam.logo}`} alt={match?.visitingTeam.name} />
                </div>
            </div>
        </div>
    )
}