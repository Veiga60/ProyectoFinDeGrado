import { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import Match from '../components/Match.jsx'
import axios from 'axios'

export default function Matches() {

    const SERVER_URL = 'http://localhost:8081'
    const [matches, setMatches] = useState([]);

    const getMatches = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches`, { withCredentials: true });
            console.log(response.data);
            setMatches(response.data);
        } catch (error) {
            console.log('Error al cargar los partidos: ', error);
        }
    }

    useEffect(() => {
        getMatches();
    }, []);

    return (
        <>
            <Header />
            <div>
                {matches.map((match) =>
                    <Match
                        key={match.id}
                        localTeam={match.localTeam}
                        localTeamGoals={match.localTeamGoals}
                        visitingTeam={match.visitingTeam}
                        visitingTeamGoals={match.visitingTeamGoals}
                        date={match.date}
                        time={match.time}
                        bonusPoint={match.bonusPoint}
                    />
                )}
            </div>
        </>
    )
}