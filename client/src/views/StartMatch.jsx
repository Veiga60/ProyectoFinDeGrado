import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScoreBoard from '../components/ScoreBoard.jsx'
import PlayerCard from '../components/PlayerCard.jsx'
import axios from 'axios'
import '../style/StartMatch.css'


export default function StartMatch() {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();

    const [match, setMatch] = useState();
    const [localTeamGoals, setLocalTeamGoals] = useState(0);
    const [visitingTeamGoals, setVisitingTeamGoals] = useState(0);
    const [players, setPlayers] = useState([]);

    const getNextMatch = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/next`, { withCredentials: true });
            setMatch(response.data[0]);
            setPlayers(response.data[0].call.players);
            console.log(response.data[0]);
        } catch (error) {
            console.log('Error fetching next match: ', error);
        }
    }

    useEffect(() => {
        getNextMatch();
    }, []);

    return (
        <>
            <ScoreBoard
                match={match}
                localTeamGoals={localTeamGoals}
                visitingTeamGoals={visitingTeamGoals}
            />
            <div id='matchMainDiv'>
                <div id='calledPlayersDiv'>
                    <table id='calledPlayersTable'>
                        <caption className='tableTitle'>JUGADORES</caption>
                        <tbody id='calledPlayersTableBody'>
                            {players.map(player =>
                                ((match.call.callPlayerStatus[player.id] == 'CONFIRMED') && player.playerType == 'RINK_PLAYER') && (
                                    <tr key={player.id} className='calledPlayerRow'>
                                        <td className='calledPlayerNumber' onClick={() => navigate(`/matches/next/start_match/players/${player.id}`)}>
                                            {player.number}
                                        </td>
                                        <td className='calledPlayerName' onClick={() => navigate(`/matches/next/start_match/players/${player.id}`)}>
                                            {player.name} {player.lastName1} {player.lastName2}
                                        </td>
                                    </tr>
                                )
                            )}

                        </tbody>
                    </table>

                    <table id='calledGoaliesTable'>
                        <caption className='tableTitle'>PORTEROS</caption>
                        <tbody id='calledGoaliesTableBody'>
                            {players.map(player =>
                                ((match.call.callPlayerStatus[player.id] == 'CONFIRMED') && player.playerType == 'GOALIE') && (
                                    <tr key={player.id} className='calledGoalieRow'>
                                        <td className='calledGoalieNumber' onClick={() => navigate(`/matches/next/start_match/players/${player.id}`)}>
                                            {player.number}
                                        </td>
                                        <td className='calledGoalieName' onClick={() => navigate(`/matches/next/start_match/players/${player.id}`)}>
                                            {player.name} {player.lastName1} {player.lastName2}
                                        </td>
                                    </tr>
                                )
                            )}

                        </tbody>
                    </table>
                </div>
                <div id='matchEventsContainer'>
                    <p id='matchEventsText'>ACTA DEL PARTIDO</p>
                    <div id='matchEventsDiv'>

                    </div>
                </div>
            </div>
        </>
    )
}