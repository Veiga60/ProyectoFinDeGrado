import { useLocation, useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Header from '../components/Header.jsx'
import '../style/RecomendationsPlayer.css'
import basicUser from '../assets/images/basicUser.png'
import SERVER_URL from '../config.js'

export default function RecomendationsPlayer() {
    const location = useLocation();
    const { matchId } = useParams();
    const { playerId } = useParams();

    const [playerRecomendations, setPlayerRecomendations] = useState([]);
    const [playerLastPlayedMatchStats, setPlayerLastPlayedMatchStats] = useState();

    const getPlayerRecomendations = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/recomendations/matches/${matchId}/players/${playerId}`, { withCredentials: true })
            setPlayerRecomendations(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('Error fetching recomendations of player.', error);
        }
    }

    const getPlayerLastPlayedMatchStats = async () => {
        try {
            let response;
            if (location?.state?.player?.playerType == 'RINK_PLAYER') {
                response = await axios.get(`${SERVER_URL}/playersMatchStats/matches/clubTeams/${playerRecomendations[0]?.match?.clubTeam?.id}/lastPlayed/players/${playerId}`, { withCredentials: true })
            } else {
                response = await axios.get(`${SERVER_URL}/playersMatchStats/matches/clubTeams/${playerRecomendations[0]?.match?.clubTeam?.id}/lastPlayed/goalies/${playerId}`, { withCredentials: true })
            }
            setPlayerLastPlayedMatchStats(response.data);
        } catch (error) {
            console.log('Error recuperando estadísticas del último partido: ', error);
        }
    }

    useEffect(() => {
        getPlayerRecomendations();
    }, []);

    useEffect(() => {
        if (playerRecomendations[0]?.match?.clubTeam?.id)
            getPlayerLastPlayedMatchStats();
    }, [playerRecomendations])

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
                    <Tabs id="playerRecomendationsDiv" defaultIndex={0}>
                        <TabList>
                            <Tab>Recomendaciones</Tab>
                            <Tab>Estadísticas</Tab>
                        </TabList>
                        <TabPanel id="playerRecomendationsPanel">
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
                        </TabPanel>
                        <TabPanel id="playerStatsPanel">
                            {
                                (playerRecomendations[0]?.player.playerType == 'RINK_PLAYER')
                                    ?
                                    (<>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.goals}</p>
                                            </div>
                                            <p className='playerStatsTitle'>GOLES</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.assists}</p>
                                            </div>
                                            <p className='playerStatsTitle'>ASISTENCIAS</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{(Number(playerLastPlayedMatchStats?.goals) + Number(playerLastPlayedMatchStats?.assists)) || 0}</p>
                                            </div>
                                            <p className='playerStatsTitle'>PUNTOS</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.plusMinus}</p>
                                            </div>
                                            <p className='playerStatsTitle'>+/-</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.shots}</p>
                                            </div>
                                            <p className='playerStatsTitle'>TIROS</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.recoveredPucks}</p>
                                            </div>
                                            <p className='playerStatsTitle'>PUCKS RECUPERADOS</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.lostPucks}</p>
                                            </div>
                                            <p className='playerStatsTitle'>PUCKS PERDIDOS</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.goodPasses}</p>
                                            </div>
                                            <p className='playerStatsTitle'>PASES DETERMINANTES</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.badPasses}</p>
                                            </div>
                                            <p className='playerStatsTitle'>PASES FALLADOS</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.penaltyMins}</p>
                                            </div>
                                            <p className='playerStatsTitle'>MINUTOS SANCIÓN</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.penaltyShotGoals}</p>
                                            </div>
                                            <p className='playerStatsTitle'>PENALTIS METIDOS</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.penaltyShotMisses}</p>
                                            </div>
                                            <p className='playerStatsTitle'>PENALTIS FALLADOS</p>
                                        </div>
                                    </>)
                                    :
                                    (<>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{(playerLastPlayedMatchStats?.shotsReceived > 0) ? ((Number(playerLastPlayedMatchStats?.shotsReceived) - Number(playerLastPlayedMatchStats?.goalsReceived)) / Number(playerLastPlayedMatchStats?.shotsReceived)).toFixed(3) : '-'}</p>
                                            </div>
                                            <p className='playerStatsTitle'>% PARADAS</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.shotsReceived}</p>
                                            </div>
                                            <p className='playerStatsTitle'>TIROS RECIBIDOS</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.goalsReceived}</p>
                                            </div>
                                            <p className='playerStatsTitle'>GOLES RECIBIDOS</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.penaltyMins}</p>
                                            </div>
                                            <p className='playerStatsTitle'>MINUTOS DE SANCIÓN</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.penaltyShotGoals}</p>
                                            </div>
                                            <p className='playerStatsTitle'>PENALTIS ENCAJADOS</p>
                                        </div>
                                        <div className='playerStat'>
                                            <div className='playerStatDiv'>
                                                <p className='playerStatText'>{playerLastPlayedMatchStats?.penaltyShotSaves}</p>
                                            </div>
                                            <p className='playerStatsTitle'>PENALTIS PARADOS</p>
                                        </div>
                                    </>)
                            }
                        </TabPanel>
                    </Tabs>
                </div>
            </div >
        </>
    )
}