import { AiFillAlert } from "react-icons/ai";
import '../style/GoalEvent.css'

export default function GoalEvent({ matchPeriod, matchTime, team, scorer, assister }) {
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
            <div id="goalEventDiv">
                <div id="periodAndTimeDiv">
                    <div id="periodDiv">
                        <p id="timeText">{matchTime}</p>
                    </div>
                    <div id="timeDiv">
                        <p id="periodText">{period}</p>
                    </div>
                </div>
                {
                    (team.name == 'Metropolitano HC')
                        ? (
                            <>
                                <div id="eventInfoDivMyTeam">
                                    <AiFillAlert color="rgb(7, 78, 200)" size={40} />
                                    <p id="goalText">GOL</p>
                                    <div id="goalTeamImageDiv">
                                        <img id="goalTeamImage" src={`/logos/${team.logo}`} alt="" />
                                    </div>
                                </div>
                                <div id="scorerAndAsisterDiv">
                                </div>
                            </>
                        ) : (
                            <>
                                <div id="eventInfoDiv">
                                    <AiFillAlert color="rgb(7, 78, 200)" size={40} />
                                    <p id="goalText">GOL</p>
                                </div>
                                <div id="teamGoalDiv">
                                    <div id="goalTeamImageDiv">
                                        <img id="goalTeamImage" src={`/logos/${team.logo}`} alt="" />
                                    </div>
                                    <div>
                                        <p id="teamNameText">{team.name}</p>
                                    </div>
                                </div>
                            </>
                        )
                }


            </div >
        </>
    )
}