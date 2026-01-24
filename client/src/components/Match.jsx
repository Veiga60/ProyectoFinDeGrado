import '../style/Match.css'

export default function Match({ match }) {
    return (
        <>
            <div id="matchDiv">
                <div id='infoContainer'>
                    <div id='localTeamDiv'>
                        <div className='teamLogoDiv'>
                            <img src={`/logos/${match?.localTeam.logo}`} alt={match?.localTeam.name} />
                        </div>
                        <p className='matchText'>{match?.localTeam.name}</p>
                    </div>
                    <div id='localTeamGoalsDiv' style={{ border: (match?.bonusPoint == match?.localTeam.id) && '2px solid rgb(7, 78, 200)' }}>
                        <p className='matchGoals'>{match?.localTeamGoals}</p>
                    </div>
                    <div id='centralDiv'>
                        <p id='matchDate'>{match?.date.split('-').reverse().join('/')}</p>
                        <p className='matchText'> - </p>
                        <p id='matchTime'>{match?.time.substring(0, 5)}</p>
                    </div>
                    <div id='visitingTeamGoalsDiv' style={{ border: (match?.bonusPoint == match?.visitingTeam.id) && '2px solid rgb(7, 78, 200)' }}>
                        <p className='matchGoals'>{match?.visitingTeamGoals}</p>
                    </div>
                    <div id="visitingTeamDiv">
                        <div className='teamLogoDiv'>
                            <img src={`/logos/${match?.visitingTeam.logo}`} alt={match?.visitingTeam.name} />
                        </div>
                        <p className='matchText'>{match?.visitingTeam.name}</p>
                    </div>
                </div>
            </div >
        </>
    )
}