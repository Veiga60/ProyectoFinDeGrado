import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import '../style/StartMatchTeam.css'
import SERVER_URL from '../config.js'

export default function StartMatchTeam() {
    const { matchId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

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
        matchResult: null,
        bonusPoint: false,
        goalsFor: 0,
        goalsAgainst: 0,
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

    const saveMatchStats = async (matchId) => {
        try {
            await axios.put(`${SERVER_URL}/matchStats/matches/${matchId}/team`, teamMatchStatsBody, {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            });
            navigate(`/matches/${matchId}/start_match`, { state: { matchPeriod: location.state.matchPeriod, matchEvents: location.state.matchEvents, teamStatsEdited: true } });
        } catch (error) {
            console.log(`Error saving the stats of player: `, error);
        }
    }

    const getTeamMatchStats = async (matchId) => {
        try {
            const response = await axios.get(`${SERVER_URL}/matchStats/matches/${matchId}/team`, { withCredentials: true });
            setPowerPlayGoals(response?.data?.powerPlayGoals);
            setPowerPlayNoGoals(response?.data?.powerPlayNoGoals);
            setPenaltyKillGoals(response?.data?.penaltyKillGoals);
            setPenaltyKillNoGoals(response?.data?.penaltyKillNoGoals);
            setOneVsZero(response?.data?.oneVsZero);
            setOneVsOne(response?.data?.oneVsOne);
            setTwoVsOne(response?.data?.twoVsOne);
            setTwoVsTwo(response?.data?.twoVsTwo);
            setThreeVsOne(response?.data?.threeVsOne);
            setThreeVsTwo(response?.data?.threeVsTwo);
        } catch (error) {
            console.log('Error fetching the stats of the team: ', error);
        }
    }

    useEffect(() => {
        getTeamMatchStats(matchId);
    }, []);

    return (
        <>
            <div id='mainContentDiv'>
                <div id='matchStatsTeamDiv'>
                    <div id='matchStatsTeamImageDiv'>
                        <img id='matchStatsTeamImage' src={'/logos/metropolitanohc.png'} alt={'Metropolitano HC'} />
                    </div>
                </div>
                <div id='matchStatsTeamRightDiv'>
                    <div id='matchTeamStatsDiv'>
                        <div className='statDiv'>
                            <div className='matchStatDiv'>
                                <FaCaretDown className='arrowDownIcon' color='rgb(7, 78, 200)' size={40} onClick={() => (powerPlayGoals > 0) && setPowerPlayGoals(powerPlayGoals - 1)} />
                                <div className='matchStatTextDiv'>
                                    <p className='matchStatText'>{powerPlayGoals}</p>
                                </div>
                                <FaCaretUp className='arrowUpIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setPowerPlayGoals(powerPlayGoals + 1)} />
                            </div>
                            <p className='statTitle'>GOLES POWER PLAY</p>
                        </div>
                        <div className='statDiv'>
                            <div className='matchStatDiv'>
                                <FaCaretDown className='arrowDownIcon' color='rgb(7, 78, 200)' size={40} onClick={() => (powerPlayNoGoals > 0) && setPowerPlayNoGoals(powerPlayNoGoals - 1)} />
                                <div className='matchStatTextDiv'>
                                    <p className='matchStatText'>{powerPlayNoGoals}</p>
                                </div>
                                <FaCaretUp className='arrowUpIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setPowerPlayNoGoals(powerPlayNoGoals + 1)} />
                            </div>
                            <p className='statTitle'>POWER PLAY SIN GOLES</p>
                        </div>
                        <div className='statDiv'>
                            <div className='matchStatDiv'>
                                <FaCaretDown className='arrowDownIcon' color='rgb(7, 78, 200)' size={40} onClick={() => (penaltyKillGoals > 0) && setPenaltyKillGoals(penaltyKillGoals - 1)} />
                                <div className='matchStatTextDiv'>
                                    <p className='matchStatText'>{penaltyKillGoals}</p>
                                </div>
                                <FaCaretUp className='arrowUpIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setPenaltyKillGoals(penaltyKillGoals + 1)} />
                            </div>
                            <p className='statTitle'>GOLES ENCAJADOS PENALTY KILL</p>
                        </div>
                        <div className='statDiv'>
                            <div className='matchStatDiv'>
                                <FaCaretDown className='arrowDownIcon' color='rgb(7, 78, 200)' size={40} onClick={() => (penaltyKillNoGoals > 0) && setPenaltyKillNoGoals(penaltyKillNoGoals - 1)} />
                                <div className='matchStatTextDiv'>
                                    <p className='matchStatText'>{penaltyKillNoGoals}</p>
                                </div>
                                <FaCaretUp className='arrowUpIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setPenaltyKillNoGoals(penaltyKillNoGoals + 1)} />
                            </div>
                            <p className='statTitle'>PENALTY KILL EXITOSOS</p>
                        </div>
                        <div className='statDiv'>
                            <div className='matchStatDiv'>
                                <FaCaretDown className='arrowDownIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setOneVsZero(oneVsZero - 1)} />
                                <div className='matchStatTextDiv'>
                                    <p className='matchStatText'>{oneVsZero}</p>
                                </div>
                                <FaCaretUp className='arrowUpIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setOneVsZero(oneVsZero + 1)} />
                            </div>
                            <p className='statTitle'>1VS0</p>
                        </div>
                        <div className='statDiv'>
                            <div className='matchStatDiv'>
                                <FaCaretDown className='arrowDownIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setOneVsOne(oneVsOne - 1)} />
                                <div className='matchStatTextDiv'>
                                    <p className='matchStatText'>{oneVsOne}</p>
                                </div>
                                <FaCaretUp className='arrowUpIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setOneVsOne(oneVsOne + 1)} />
                            </div>
                            <p className='statTitle'>1VS1</p>
                        </div>
                        <div className='statDiv'>
                            <div className='matchStatDiv'>
                                <FaCaretDown className='arrowDownIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setTwoVsOne(twoVsOne - 1)} />
                                <div className='matchStatTextDiv'>
                                    <p className='matchStatText'>{twoVsOne}</p>
                                </div>
                                <FaCaretUp className='arrowUpIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setTwoVsOne(twoVsOne + 1)} />
                            </div>
                            <p className='statTitle'>2VS1</p>
                        </div>
                        <div className='statDiv'>
                            <div className='matchStatDiv'>
                                <FaCaretDown className='arrowDownIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setTwoVsTwo(twoVsTwo - 1)} />
                                <div className='matchStatTextDiv'>
                                    <p className='matchStatText' >{twoVsTwo}</p>
                                </div>
                                <FaCaretUp className='arrowUpIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setTwoVsTwo(twoVsTwo + 1)} />
                            </div>
                            <p className='statTitle'>2VS2</p>
                        </div>
                        <div className='statDiv'>
                            <div className='matchStatDiv'>
                                <FaCaretDown className='arrowDownIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setThreeVsOne(threeVsOne - 1)} />
                                <div className='matchStatTextDiv'>
                                    <p className='matchStatText'>{threeVsOne}</p>
                                </div>
                                <FaCaretUp className='arrowUpIcon' color='rgb(7, 78, 200)' size={30} onClick={() => setThreeVsOne(threeVsOne + 1)} />
                            </div>
                            <p className='statTitle'>3VS1</p>
                        </div>
                        <div className='statDiv'>
                            <div className='matchStatDiv'>
                                <FaCaretDown className='arrowDownIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setThreeVsTwo(threeVsTwo - 1)} />
                                <div className='matchStatTextDiv'>
                                    <p className='matchStatText'>{threeVsTwo}</p>
                                </div>
                                <FaCaretUp className='arrowUpIcon' color='rgb(7, 78, 200)' size={40} onClick={() => setThreeVsTwo(threeVsTwo + 1)} />
                            </div>
                            <p className='statTitle'>3VS2</p>
                        </div>
                    </div>
                    <div id='startMatchTeamButtonsDiv'>
                        <button className='startMatchTeamButton' onClick={() => saveMatchStats(matchId)}>GUARDAR</button>
                        <button className='startMatchTeamButton' onClick={() => navigate(`/matches/${matchId}/start_match`, { state: { matchPeriod: location.state.matchPeriod, matchEvents: location.state.matchEvents, teamStatsEdited: false } })}>VOLVER</button>
                    </div>
                </div>
            </div>
        </>
    )
}