import '../style/MatchCompressed.css'
import basicLogo from '../assets/images/basicLogo.png'

export default function MatchCompressed({ match }) {
    return (
        <>
            <div id="matchCompressedDiv">
                <div id='infoContainer'>
                    <div id='localTeamDiv'>
                        <div className='compressedTeamLogoDiv'>
                            <img src={match?.localTeam.logo ? `/logos/${match?.localTeam.logo}` : basicLogo} alt={match?.localTeam.name} />
                        </div>
                    </div>
                    <div id='localTeamGoalsDiv' style={{ border: (match?.bonusPoint == match?.localTeam.id) && '2px solid rgb(7, 78, 200)' }}>
                        <p className='matchGoals'>{match?.localTeamGoals}</p>
                    </div>
                    <div id='compressedCentralDiv'>
                        <p id='compressedMatchDate'>{match?.date.split('-').reverse().join('/')}</p>
                        <p className='matchText'> - </p>
                        <p id='matchTime'>{match?.time?.substring(0, 5)}</p>
                    </div>
                    <div id='visitingTeamGoalsDiv' style={{ border: (match?.bonusPoint == match?.visitingTeam.id) && '2px solid rgb(7, 78, 200)' }}>
                        <p className='matchGoals'>{match?.visitingTeamGoals}</p>
                    </div>
                    <div id="visitingTeamDiv">
                        <div className='compressedTeamLogoDiv'>
                            <img src={match?.visitingTeam.logo ? `/logos/${match?.visitingTeam.logo}` : basicLogo} alt={match?.visitingTeam.name} />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}