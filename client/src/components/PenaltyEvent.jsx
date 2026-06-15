import { GiWhistle } from "react-icons/gi";
import '../style/PenaltyEvent.css'
import basicLogo from '../assets/images/basicLogo.png'

export default function PenaltyEvent({ matchPeriod, matchTime, team, player, penaltyTime, penaltyType }) {
    var period;

    if (matchPeriod == 'period1') {
        period = 'Periodo 1';
    } else if (matchPeriod == 'period2') {
        period = 'Periodo 2'
    } else if (matchPeriod == 'overtime') {
        period = 'Overtime'
    }

    const isLongFoul = penaltyType == 'GOLPEAR CON LA PUNTA DEL STICK' || penaltyType == 'GOLPEAR CON EL TACO DEL STICK';

    return (
        <>
            <div id="penaltyEventDiv">
                <div id="penaltyEventPeriodAndTimeDiv">
                    <div id="penaltyEventPeriodDiv">
                        <p id="penaltyEventTimeText">{matchTime}</p>
                    </div>
                    <div id="penaltyEventTimeDiv">
                        <p id="penaltyEventPeriodText">{period}</p>
                    </div>
                </div>
                {
                    (team?.name == 'Metropolitano HC')
                        ? (
                            <>
                                <div id="penaltyEventInfoDivMyTeam">
                                    <GiWhistle className="penaltyEventIcon" color="rgb(7, 78, 200)" size={40} />
                                    <p id="penaltyText">FALTA</p>
                                    <div id="penaltyTeamImageDivMyTeam">
                                        <img id="penaltyTeamImageMyTeam" src={team.logo ? `/logos/${team.logo}` : basicLogo} alt={team.logo} />
                                    </div>
                                </div>
                                <div id="penaltyAndPlayerInfoDivMyTeam">
                                    <div id="penaltyTimeDivMyTeam">
                                        <p id="penaltyTimeTextMyTeam">{`${penaltyTime}'`}</p>
                                    </div>
                                    <div id="penaltyPlayerNumberAndNameInfo">
                                        <p id="penaltyPlayerText">{`${player?.name} ${player?.lastName1}`}</p>
                                        <p id={isLongFoul ? 'penaltyTypeTextMyTeamSmall' : 'penaltyTypeTextMyTeam'}>{penaltyType}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div id="penaltyEventInfoDiv">
                                    <GiWhistle className="penaltyEventIcon" color="rgb(7, 78, 200)" size={40} />
                                    <p id="penaltyText">FALTA</p>
                                    <div id="penaltyTeamImageDiv">
                                        <img id="penaltyTeamImage" src={team.logo ? `/logos/${team.logo}` : basicLogo} alt={team.name} />
                                    </div>
                                </div>
                                <div id="teamPenaltyDiv">
                                    <div id="penaltyTimeDiv">
                                        <p id="penaltyTimeText">{`${penaltyTime}'`}</p>
                                    </div>
                                    <div id="penaltyInfoDiv">
                                        <p id="penaltyTeamNameText">{team?.name}</p>
                                        <p id={isLongFoul ? 'penaltyTypeTextSmall' : 'penaltyTypeText'}>{penaltyType}</p>
                                    </div>
                                </div>
                            </>
                        )
                }
            </div >
        </>
    )
}