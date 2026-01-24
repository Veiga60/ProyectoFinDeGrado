import '../style/ScoreBoard.css'

export default function ScoreBoard({ match, localTeamGoals, visitingTeamGoals }) {
    return (
        <div id='scoreBoardDiv'>
            <div id='localDiv'>
                <div id='localImageDiv' className='teamImageDiv'>
                    <img src={`/logos/${match?.localTeam.logo}`} alt={match?.localTeam.name} />
                </div>
                <div>
                    <p>{match?.localTeam.name}</p>
                </div>
                <div>
                    <p>{localTeamGoals}</p>
                </div>
            </div>
            <p> - </p>
            <div id='visitingDiv'>
                <div>
                    <p>{visitingTeamGoals}</p>
                </div>
                <div>
                    <p>{match?.visitingTeam.name}</p>
                </div>
                <div id='visitingImageDiv' className='teamImageDiv'>
                    <img src={`/logos/${match?.visitingTeam.logo}`} alt={match?.visitingTeam.name} />
                </div>
            </div>
        </div>
    )
}