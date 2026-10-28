import { useLocation, useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Header from '../components/Header.jsx'
import logo from '../assets/images/logo-metropolitanohc-negro-transparente.png'
import '../style/RecomendationsTeam.css'
import SERVER_URL from '../config.js'

export default function RecomendationsTeam() {
    const location = useLocation();
    const { matchId } = useParams();

    const [teamRecomendations, setTeamRecomendations] = useState([]);
    const [lastPlayedMatchTeamMatchStats, setLastPlayedMatchTeamMatchStats] = useState([]);

    const getTeamRecomendations = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/recomendations/matches/${matchId}/team`, { withCredentials: true })
            setTeamRecomendations(response.data);
        } catch (error) {
            console.log('Error fetching recomendations of team.', error);
        }
    }

    const getLastPlayedMatchTeamMatchStats = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matchStats/clubTeams/${teamRecomendations[0]?.match.clubTeam.id}/matches/lastPlayed`, { withCredentials: true });
            setLastPlayedMatchTeamMatchStats(response.data);
        } catch (error) {
            console.log('Error obteniendo las estadísiticas del último partido');
        }
    }

    useEffect(() => {
        if (teamRecomendations && teamRecomendations.length > 0)
            getLastPlayedMatchTeamMatchStats();
    }, [teamRecomendations]);

    useEffect(() => {
        getTeamRecomendations();
        console.log(teamRecomendations);
    }, []);

    return (
        <>
            <Header />
            <div id="teamRecomendationsMainDiv">
                <div id='teamRecomendationsLeftDiv'>
                    <div id="teamRecomendationsPlayerImageDiv">
                        <img id="teamRecomendationsPlayerImage" src={logo} alt='Metropolitano HC' />
                    </div>
                </div>
                <div id='teamRecomendationsRightDiv'>
                    <Tabs id="teamRecomendationsDiv">
                        <TabList>
                            <Tab>Recomendaciones</Tab>
                            <Tab>Estadísticas</Tab>
                        </TabList>
                        <TabPanel id="teamRecomendationsPanel">
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
                        </TabPanel>
                        <TabPanel className='matchStatsPanel' id="matchStatsPanel">
                            <div id="matchStatsDiv">
                                <div className='playerStat'>
                                    <div className='playerStatDiv'>
                                        <p className='playerStatText'>{lastPlayedMatchTeamMatchStats?.goalsFor}</p>
                                    </div>
                                    <p className='playerStatsTitle'>GOLES A FAVOR</p>
                                </div>
                                <div className='playerStat'>
                                    <div className='playerStatDiv'>
                                        <p className='playerStatText'>{lastPlayedMatchTeamMatchStats?.goalsAgainst}</p>
                                    </div>
                                    <p className='playerStatsTitle'>GOLES EN CONTRA</p>
                                </div>
                                <div className='playerStat'>
                                    <div className='playerStatDiv'>
                                        <p className='playerStatText'>{lastPlayedMatchTeamMatchStats?.oneVsZero}</p>
                                    </div>
                                    <p className='playerStatsTitle'>1VS0</p>
                                </div>
                                <div className='playerStat'>
                                    <div className='playerStatDiv'>
                                        <p className='playerStatText'>{lastPlayedMatchTeamMatchStats?.oneVsOne}</p>
                                    </div>
                                    <p className='playerStatsTitle'>1VS1</p>
                                </div>
                                <div className='playerStat'>
                                    <div className='playerStatDiv'>
                                        <p className='playerStatText'>{lastPlayedMatchTeamMatchStats?.twoVsOne}</p>
                                    </div>
                                    <p className='playerStatsTitle'>2VS1</p>
                                </div>
                                <div className='playerStat'>
                                    <div className='playerStatDiv'>
                                        <p className='playerStatText'>{lastPlayedMatchTeamMatchStats?.twoVsTwo}</p>
                                    </div>
                                    <p className='playerStatsTitle'>2VS2</p>
                                </div>
                                <div className='playerStat'>
                                    <div className='playerStatDiv'>
                                        <p className='playerStatText'>{lastPlayedMatchTeamMatchStats?.threeVsOne}</p>
                                    </div>
                                    <p className='playerStatsTitle'>3VS1</p>
                                </div>
                                <div className='playerStat'>
                                    <div className='playerStatDiv'>
                                        <p className='playerStatText'>{lastPlayedMatchTeamMatchStats?.threeVsTwo}</p>
                                    </div>
                                    <p className='playerStatsTitle'>3VS2</p>
                                </div>
                                <div className='playerStat'>
                                    <div className='playerStatDiv'>
                                        <p className='playerStatText'>{lastPlayedMatchTeamMatchStats?.powerPlayGoals}</p>
                                    </div>
                                    <p className='playerStatsTitle'>GOLES POWER PLAY</p>
                                </div>
                                <div className='playerStat'>
                                    <div className='playerStatDiv'>
                                        <p className='playerStatText'>{lastPlayedMatchTeamMatchStats?.powerPlayNoGoals}</p>
                                    </div>
                                    <p className='playerStatsTitle'>POWER PLAY SIN GOLES</p>
                                </div>
                                <div className='playerStat'>
                                    <div className='playerStatDiv'>
                                        <p className='playerStatText'>{lastPlayedMatchTeamMatchStats?.penaltyKillGoals}</p>
                                    </div>
                                    <p className='playerStatsTitle'>GOLES PENALTY KILL</p>
                                </div>
                                <div className='playerStat'>
                                    <div className='playerStatDiv'>
                                        <p className='playerStatText'>{lastPlayedMatchTeamMatchStats?.penaltyKillNoGoals}</p>
                                    </div>
                                    <p className='playerStatsTitle'>PENALTY KILL SIN GOLES</p>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    )
}