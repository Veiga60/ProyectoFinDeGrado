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
                {players.map(player =>
                    (match.call.callPlayerStatus[player.id] == 'CONFIRMED') && (
                        <PlayerCard
                            player={player}
                        />
                    )
                )}
            </div>
        </>
    )
}