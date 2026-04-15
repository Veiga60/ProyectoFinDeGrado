import { GiWhistle } from "react-icons/gi";
import '../style/PenaltyEvent.css'

export default function PenaltyEvent({ matchPeriod, matchTime, team, player, penaltyTime, penaltyType }) {
    var period;

    if (matchPeriod == 'period1') {
        period = 'Periodo 1';
    } else if (matchPeriod == 'period2') {
        period = 'Periodo 2'
    } else if (matchPeriod == 'overtime') {
        period = 'Overtime'
    }

    return (
        <>
            <div id="penaltyEventDiv">
                <div id="periodAndTimeDiv">
                    <div id="periodDiv">
                        <p id="timeText">{matchTime}</p>
                    </div>
                    <div id="timeDiv">
                        <p id="periodText">{period}</p>
                    </div>
                </div>
                {
                    (team?.name == 'Metropolitano HC')
                        ? (
                            <>
                                <div id="penaltyEventInfoDivMyTeam">
                                    <GiWhistle color="rgb(7, 78, 200)" size={40} />
                                    <p id="penaltyText">PENALIZACIÓN</p>
                                </div>
                                <div id="penaltyAndPlayerInfoDivMyTeam">
                                    <div id="penaltyTeamImageDivMyTeam">
                                        <img id="penaltyTeamImageMyTeam" src={`/logos/${team.logo}`} alt={team.logo} />
                                    </div>
                                    <div id="penaltyPlayerNumberAndNameInfo">
                                        <div id='penaltyPlayerNumberAndNameDiv'>
                                            <p id="penaltyPlayerText">{`${player?.name} ${player?.lastName1} ${player?.lastName2}`}</p>
                                        </div>
                                        <div id="penaltyTypeAndTimeMyTeamDiv">
                                            <div id="penaltyTimeDivMyTeam">
                                                <p id='penaltyTimeTextMyTeam'>{`${penaltyTime}'`}</p>
                                            </div>
                                            <p id="penaltyTypeTextMyTeam">{penaltyType}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div id="penaltyEventInfoDiv">
                                    <GiWhistle color="rgb(7, 78, 200)" size={40} />
                                    <p id="penaltyText">PENALIZACIÓN</p>
                                </div>
                                <div id="teamPenaltyDiv">
                                    <div id="penaltyTeamImageDiv">
                                        <img id="penaltyTeamImage" src={`/logos/${team.logo}`} alt={team.name} />
                                    </div>
                                    <div id="penaltyInfoDiv">
                                        <div id="penaltyTeamNameDiv">
                                            <p id="penaltyTeamNameText">{team?.name}</p>
                                        </div>
                                        <div id="penaltyTypeAndTimeDiv">
                                            <div id="penaltyTimeDiv">
                                                <p id="penaltyTimeText">{`${penaltyTime}'`}</p>
                                            </div>
                                            <p id="penaltyTypeText">{penaltyType}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                }
            </div >
        </>
    )
}