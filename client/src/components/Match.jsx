import '../style/Match.css'

export default function Match({ localTeam, localTeamGoals, visitingTeam, visitingTeamGoals, date, time }) {
    return (
        <>
            <div id="matchDiv">
                <div id='infoContainer'>
                    <div id='localTeamDiv'>
                        <div className='teamImageDiv'>
                            <img src={`/logos/${localTeam.logo}`} alt={localTeam.name} />
                        </div>
                        <p className='matchText'>{localTeam.name}</p>
                    </div>
                    <div id='localTeamGoalsDiv'>
                        <p className='matchGoals'>{localTeamGoals}</p>
                    </div>
                    <div id='centralDiv'>
                        <p id='matchDate'>{date.split('-').reverse().join('/')}</p>
                        <p className='matchText'> - </p>
                        <p id='matchTime'>{time.substring(0, 5)}</p>
                    </div>
                    <div id='visitingTeamGoalsDiv'>
                        <p className='matchGoals'>{visitingTeamGoals}</p>
                    </div>
                    <div id="visitingTeamDiv">
                        <div className='teamImageDiv'>
                            <img src={`/logos/${visitingTeam.logo}`} alt={visitingTeam.name} />
                        </div>
                        <p className='matchText'>{visitingTeam.name}</p>
                    </div>
                </div>
            </div >
        </>
    )
}