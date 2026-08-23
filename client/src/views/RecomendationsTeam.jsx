import { useLocation, useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import Header from '../components/Header.jsx'
import logo from '../assets/images/logo-metropolitanohc-negro-transparente.png'
import '../style/RecomendationsTeam.css'
import SERVER_URL from '../config.js'

export default function RecomendationsTeam() {
    const location = useLocation();
    const { matchId } = useParams();

    const [teamRecomendations, setTeamRecomendations] = useState([]);

    const getTeamRecomendations = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/recomendations/matches/${matchId}/team`, { withCredentials: true })
            setTeamRecomendations(response.data);
        } catch (error) {
            console.log('Error fetching recomendations of team.', error);
        }
    }

    useEffect(() => {
        getTeamRecomendations();
    }, []);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state?.authenticatedUserPlayerId}
                isCoach={location.state?.isCoach}
            />
            <div id="teamRecomendationsMainDiv">
                <div id='teamRecomendationsLeftDiv'>
                    <div id="teamRecomendationsPlayerImageDiv">
                        <img id="teamRecomendationsPlayerImage" src={logo} alt='Metropolitano HC' />
                    </div>
                </div>
                <div id='teamRecomendationsRightDiv'>
                    <div id="teamRecomendationsDiv">
                        {
                            teamRecomendations?.map((teamRecomendation) => {
                                return (
                                    <div key={teamRecomendation.id} id="teamRecomendation">
                                        <div id="teamRecomendationTitleDiv">
                                            <p id="teamRecomendationTitleText">{`${teamRecomendation.area}`.replace('_', ' ').toUpperCase()}</p>
                                        </div>
                                        <div id="teamRecomendationDescriptionDiv">
                                            <p id="teamRecomendationDescriptionText">{teamRecomendation.description}</p>
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