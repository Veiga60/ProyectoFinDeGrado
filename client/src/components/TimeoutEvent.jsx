import { MdTimer } from "react-icons/md";
import '../style/TimeoutEvent.css'
import basicLogo from '../assets/images/basicLogo.png'

export default function TimeoutEvent({ matchPeriod, matchTime, team }) {
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
            <div id="timeoutEventDiv">
                <div id="periodAndTimeDiv">
                    <div id="periodDiv">
                        <p id="timeoutEventTimeText">{matchTime}</p>
                    </div>
                    <div id="timeDiv">
                        <p id="periodText">{period}</p>
                    </div>
                </div>
                <div id="timeoutEventInfoDiv">
                    <MdTimer color="rgb(7, 78, 200)" size={40} />
                    <p id="timeoutText">TIEMPO MUERTO</p>
                </div>
                <div id="timeoutTeamDiv">
                    <div id="timeoutTeamImageDiv">
                        <img id="timeoutTeamImage" src={team.logo ? `/logos/${team.logo}` : basicLogo} alt={team.name} />
                    </div>
                    <div id="timeoutTeamNameDiv">
                        <p id="timeoutTeamNameText">{team?.name}</p>
                    </div>
                </div>
            </div>
        </>
    )
}