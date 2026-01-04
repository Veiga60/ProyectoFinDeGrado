import '../style/Match.css'

export default function Match({ localTeam, localTeamGoals, visitingTeam, visitingTeamGoals, date, time, bonusPoint }) {
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
                    <div id='localTeamGoalsDiv' style={{ border: (bonusPoint == localTeam.id) && '2px solid rgb(7, 78, 200)' }}>
                        <p className='matchGoals'>{localTeamGoals}</p>
                    </div>
                    <div id='centralDiv'>
                        <p id='matchDate'>{date.split('-').reverse().join('/')}</p>
                        <p className='matchText'> - </p>
                        <p id='matchTime'>{time.substring(0, 5)}</p>
                    </div>
                    <div id='visitingTeamGoalsDiv' style={{ border: (bonusPoint == visitingTeam.id) && '2px solid rgb(7, 78, 200)' }}>
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