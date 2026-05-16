import { useLocation, useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import Header from '../components/Header.jsx'
import '../style/RecomendationsPlayer.css'
import basicUser from '../assets/images/basicUser.png'

export default function RecomendationsPlayer() {

    const SERVER_URL = 'http://localhost:8081';
    const location = useLocation();
    const { matchId } = useParams();
    const { playerId } = useParams();

    const [playerRecomendations, setPlayerRecomendations] = useState([]);

    const getPlayerRecomendations = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/recomendations/matches/${matchId}/players/${playerId}`, { withCredentials: true })
            setPlayerRecomendations(response.data);
        } catch (error) {
            console.log('Error fetching recomendations of player.', error);
        }
    }

    useEffect(() => {
        getPlayerRecomendations();
    }, []);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state?.authenticatedUserPlayerId}
                isCoach={location.state?.isCoach}
            />
            <div id="playerRecomendationsMainDiv">
                <div id='playerRecomendationsLeftDiv'>
                    <div id="playerRecomendationsPlayerImageDiv">
                        <img id="playerRecomendationsPlayerImage" src={playerRecomendations[0]?.player?.photo ? `/players/${playerRecomendations[0]?.player?.photo}` : basicUser} alt={`${playerRecomendations[0]?.player?.name} ${playerRecomendations[0]?.player?.lastName1} ${playerRecomendations[0]?.player?.lastName2}`} />
                    </div>
                </div>
                <div id='playerRecomendationsRightDiv'>
                    <div id="playerRecomendationsDiv">
                        {
                            playerRecomendations?.map((playerRecomendation) => {
                                return (
                                    <div key={playerRecomendation.id} id="playerRecomendation">
                                        <div id="playerRecomendationTitleDiv">
                                            <p id="playerRecomendationTitleText">{`${playerRecomendation.area}`.replace('_', ' ').toUpperCase()}</p>
                                        </div>
                                        <div id="playerRecomendationDescriptionDiv">
                                            <p id="playerRecomendationDescriptionText">{playerRecomendation.description}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}