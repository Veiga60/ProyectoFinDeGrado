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
                                    <div id="goalTeamImageDivMyTeam">
                                        <img id="goalTeamImageMyTeam" src={`/logos/${team.logo}`} alt={team.name} />
                                    </div>
                                </div>
                                <div id="scorerAndAssisterInfoDiv">
                                    <div id='scorerNumberDiv'>
                                        <p id='scorerNumberText'>{scorer.number}</p>
                                    </div>
                                    <div id="scorerAndAssisterDiv">
                                        <p id="scorerText">{`${scorer.name} ${scorer.lastName1} ${scorer.lastName2}`}</p>
                                        {
                                            (assister) && (<p id="assisterText">{`${assister.name} ${assister.lastName1} ${assister.lastName2} #` + `${assister.number}`.padStart(2, '0') + `#`}</p>)
                                        }
                                    </div>
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
                                        <img id="goalTeamImage" src={`/logos/${team.logo}`} alt={team.name} />
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