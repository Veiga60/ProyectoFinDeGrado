import Header from '../components/Header.jsx'
import Match from '../components/Match.jsx'
import PlayerCard from '../components/PlayerCard.jsx'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../style/CallDetail.css'

export default function CallDetail() {

    const SERVER_URL = 'http://localhost:8081';
    const { matchId } = useParams();

    const [match, setMatch] = useState();
    const [players, setPlayers] = useState([]);
    const [call, setCall] = useState();

    const getMatch = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/${matchId}`, { withCredentials: true });
            console.log(response.data);
            setMatch(response.data);
            console.log(response.data.call);
            if (response.data.call != null) {
                setCall(response.data.call);
            }
        } catch (error) {
            console.log('Error fetching selected match: ', error);
        }
    }

    const getPlayers = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/players`, { withCredentials: true });
            setPlayers(response.data);
        } catch (error) {
            console.log('Error fetching players: ', error);
        }
    }

    const callPlayer = async (playerId) => {
        try {
            const response = await axios.post(`${SERVER_URL}/calls/match/${match.id}/players/${playerId}`, {}, { withCredentials: true });
        } catch (error) {
            console.log('Error calling player: ', error);
        }
    }


    useEffect(() => {
        getMatch();
        getPlayers();
    }, []);

    return (
        <>
            <Header />
            <div id='callDetailContentDiv'>
                <div id='selectedMatchDiv'>
                    <Match
                        match={match}
                    />
                </div>
                <div id='playersToCallDiv'>
                    {players.map((player) =>
                        <PlayerCard
                            key={player.id}
                            player={player}
                            onClick={() => callPlayer(player.id)}
                            status={call?.callPlayerStatus[player.id]}
                        />
                    )}
                </div>
            </div>
        </>
    )
}