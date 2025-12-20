import '../style/Match.css'

export default function Match({ localTeam, visitingTeam }) {
    return (
        <>
            <div id="matchDiv">
                <div id='infoContainer'>
                    <div id='localTeamDiv'>
                        <img src={`/logos/${localTeam.logo}`} alt={localTeam.name} />
                        <p>{localTeam.name}</p>
                    </div>
                    <div>
                        <p> - </p>
                    </div>
                    <div id="visitingTeamDiv">
                        <img src={`/logos/${visitingTeam.logo}`} alt={visitingTeam.name} />
                        <p>{visitingTeam.name}</p>
                    </div>
                </div>
            </div >
        </>
    )
}