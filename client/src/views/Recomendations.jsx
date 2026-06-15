import Header from '../components/Header.jsx'
import PlayerCard from '../components/PlayerCard.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import '../style/Recomendations.css'
import { useEffect, useState } from 'react';
import logo from '../assets/images/logo-metropolitanohc-negro-transparente.png'

export default function Recomendations() {

    const location = useLocation();
    const navigate = useNavigate();

    const [match, setMatch] = useState();

    useEffect(() => {
        setMatch(location.state?.match);
    }, []);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state?.authenticatedUserPlayerId}
                isCoach={location.state?.isCoach}
            />
            <div id='recomendationsMainDiv'>
                <div id='recomendationsPlayersDiv'>
                    {
                        match?.call.players.map((player) => {
                            if (match?.call.callPlayerStatus[player.id] == 'CONFIRMED') {
                                return <PlayerCard key={player.id} player={player} onClick={() => { navigate(`players/${player.id}`, { state: { player: player } }) }} />
                            }
                        })
                    }
                    <div id='myTeamImageDiv' onClick={() => navigate('team')}>
                        <img id='myTeamImage' src={logo} alt="Metropolitano HC" />
                    </div>
                </div>
            </div>
        </>
    )
}