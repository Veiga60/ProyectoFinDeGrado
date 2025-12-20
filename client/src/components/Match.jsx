import '../style/Match.css'

export default function Match({ localTeam, visitingTeam }) {
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
                    <div id='centralDiv'>
                        <p className='matchText'> - </p>
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