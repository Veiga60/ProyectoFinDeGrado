import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../style/StartMatchTeam.css'

export default function StartMatchTeam() {
    const SERVER_URL = 'http://localhost:8081';
    const { matchId } = useParams();
    const navigate = useNavigate();

    const [teamMatchStats, setTeamMatchStats] = useState();

    const [powerPlayGoals, setPowerPlayGoals] = useState(0);
    const [powerPlayNoGoals, setPowerPlayNoGoals] = useState(0);
    const [penaltyKillGoals, setPenaltyKillGoals] = useState(0);
    const [penaltyKillNoGoals, setPenaltyKillNoGoals] = useState(0);
    const [oneVsZero, setOneVsZero] = useState(0);
    const [oneVsOne, setOneVsOne] = useState(0);
    const [twoVsOne, setTwoVsOne] = useState(0);
    const [twoVsTwo, setTwoVsTwo] = useState(0);
    const [threeVsOne, setThreeVsOne] = useState(0);
    const [threeVsTwo, setThreeVsTwo] = useState(0);

    var teamMatchStatsBody = {
        powerPlayGoals: powerPlayGoals,
        powerPlayNoGoals: powerPlayNoGoals,
        penaltyKillGoals: penaltyKillGoals,
        penaltyKillNoGoals: penaltyKillNoGoals,
        oneVsZero: oneVsZero,
        oneVsOne: oneVsOne,
        twoVsOne: twoVsOne,
        twoVsTwo: twoVsTwo,
        threeVsOne: threeVsOne,
        threeVsTwo: threeVsTwo
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <div id='mainContentDiv'>
                <div id='matchTeamDiv'>
                    <div id='matchTeamImageDiv'>
                        <img id='matchTeamImage' src={'/logos/metropolitanohc.png'} alt={'Metropolitano HC'} />
                    </div>
                </div>
                <div id='matchPlayerStatsDiv'>
                    <div className='statDiv'>
                        <p className='statTitle'>GOLES POWER PLAY</p>
                        <div className='matchStatDiv'>
                            <button className='minusButton' onClick={() => (powerPlayGoals > 0) && setPowerPlayGoals(powerPlayGoals - 1)}>-</button>
                            <p className='matchStat'>{powerPlayGoals}</p>
                            <button className='plusButton' onClick={() => setPowerPlayGoals(powerPlayGoals + 1)}>+</button>
                        </div>
                    </div>
                    <div className='statDiv'>
                        <p className='statTitle'>POWER PLAY SIN GOLES</p>
                        <div className='matchStatDiv'>
                            <button className='minusButton' onClick={() => (powerPlayNoGoals > 0) && setPowerPlayNoGoals(powerPlayNoGoals - 1)}>-</button>
                            <p className='matchStat'>{powerPlayNoGoals}</p>
                            <button className='plusButton' onClick={() => setPowerPlayNoGoals(powerPlayNoGoals + 1)}>+</button>
                        </div>
                    </div>
                    <div className='statDiv'>
                        <p className='statTitle'>GOLES ENCAJADOS PENALTY KILL</p>
                        <div className='matchStatDiv'>
                            <button className='minusButton' onClick={() => (penaltyKillGoals > 0) && setPenaltyKillGoals(penaltyKillGoals - 1)}>-</button>
                            <p className='matchStat'>{penaltyKillGoals}</p>
                            <button className='plusButton' onClick={() => setPenaltyKillGoals(penaltyKillGoals + 1)}>+</button>
                        </div>
                    </div>
                    <div className='statDiv'>
                        <p className='statTitle'>PENALTY KILL EXITOSOS</p>
                        <div className='matchStatDiv'>
                            <button className='minusButton' onClick={() => (penaltyKillNoGoals > 0) && setPenaltyKillNoGoals(penaltyKillNoGoals - 1)}>-</button>
                            <p className='matchStat'>{penaltyKillNoGoals}</p>
                            <button className='plusButton' onClick={() => setPenaltyKillNoGoals(penaltyKillNoGoals + 1)}>+</button>
                        </div>
                    </div>
                    <div className='statDiv'>
                        <p className='statTitle'>1VS0</p>
                        <div className='matchStatDiv'>
                            <button className='minusButton' onClick={() => setOneVsZero(oneVsZero - 1)}>-</button>
                            <p className='matchStat'>{oneVsZero}</p>
                            <button className='plusButton' onClick={() => setOneVsZero(oneVsZero + 1)}>+</button>
                        </div>
                    </div>
                    <div className='statDiv'>
                        <p className='statTitle'>1VS1</p>
                        <div className='matchStatDiv'>
                            <button className='minusButton' onClick={() => setOneVsOne(oneVsOne - 1)}>-</button>
                            <p className='matchStat'>{oneVsOne}</p>
                            <button className='plusButton' onClick={() => setOneVsOne(oneVsOne + 1)}>+</button>
                        </div>
                    </div>
                    <div className='statDiv'>
                        <p className='statTitle'>2VS1</p>
                        <div className='matchStatDiv'>
                            <button className='minusButton' onClick={() => setTwoVsOne(twoVsOne - 1)}>-</button>
                            <p className='matchStat'>{twoVsOne}</p>
                            <button className='plusButton' onClick={() => setTwoVsOne(twoVsOne + 1)}>+</button>
                        </div>
                    </div>
                    <div className='statDiv'>
                        <p className='statTitle'>2VS2</p>
                        <div className='matchStatDiv'>
                            <button className='minusButton' onClick={() => setTwoVsTwo(twoVsTwo - 1)}>-</button>
                            <p className='matchStat'>{twoVsTwo}</p>
                            <button className='plusButton' onClick={() => setTwoVsTwo(twoVsTwo + 1)}>+</button>
                        </div>
                    </div>
                    <div className='statDiv'>
                        <p className='statTitle'>3VS1</p>
                        <div className='matchStatDiv'>
                            <button className='minusButton' onClick={() => setThreeVsOne(threeVsOne - 1)}>-</button>
                            <p className='matchStat'>{threeVsOne}</p>
                            <button className='plusButton' onClick={() => setThreeVsOne(threeVsOne + 1)}>+</button>
                        </div>
                    </div>
                    <div className='statDiv'>
                        <p className='statTitle'>3VS2</p>
                        <div className='matchStatDiv'>
                            <button className='minusButton' onClick={() => setThreeVsTwo(threeVsTwo - 1)}>-</button>
                            <p className='matchStat'>{threeVsTwo}</p>
                            <button className='plusButton' onClick={() => setThreeVsTwo(threeVsTwo + 1)}>+</button>
                        </div>
                    </div>
                    <button onClick={() => saveMatchStats(player)}>GUARDAR</button>
                </div>
            </div>
        </>
    )
}