import Header from '../components/Header.jsx'
import Match from '../components/Match.jsx'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../style/CallDetail.css'

export default function CallDetail() {

    const SERVER_URL = 'http://localhost:8081';
    const { matchId } = useParams();

    const [match, setMatch] = useState();

    const getMatch = async () => {
        try {
            console.log(matchId);
            const response = await axios.get(`${SERVER_URL}/matches/${matchId}`, { withCredentials: true });
            setMatch(response.data);
        } catch (error) {
            console.log('Error fetching selected match: ', error);
        }
    }

    useEffect(() => {
        getMatch();
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
            </div>
        </>
    )
}