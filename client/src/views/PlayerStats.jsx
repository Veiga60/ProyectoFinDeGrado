import { useLocation, useParams } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../style/PlayerStats.css'
import basicUser from '../assets/images/basicUser.png'
import SERVER_URL from '../config.js'

export default function PlayerStats() {
    const { playerId } = useParams();
    const location = useLocation();

    const [player, setPlayer] = useState(null);
    const [playerStats, setPlayerStats] = useState(null);

    const getPlayer = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/players/${playerId}`, { withCredentials: true });
            setPlayer(response.data);
        } catch (error) {
            console.log('Error fetching the player: ', error);
        }
    }

    const getPlayerStats = async () => {
        try {
            let response;
            if (player?.playerType == "RINK_PLAYER") {
                response = await axios.get(`${SERVER_URL}/stats/players/${playerId}/clubTeams/${location?.state?.clubTeamId}`, { withCredentials: true });
            } else if (player?.playerType == "GOALIE") {
                response = await axios.get(`${SERVER_URL}/stats/goalies/${playerId}/clubTeams/${location?.state?.clubTeamId}`, { withCredentials: true });
            }
            setPlayerStats(response?.data);
        } catch (error) {
            console.log('Error fetching the player: ', error);
        }
    }

    useEffect(() => {
        getPlayer();
    }, []);

    useEffect(() => {
        getPlayerStats();
    }, [player]);

    return (
        <>
            <Header />
            <div id='contentDiv'>
                {(player != null) &&
                    <div id='playerStatsDiv'>
                        <div id='playerInfoDiv'>
                            <div id='playerPhotoDiv'>
                                <img id='photo' src={player.photo ? `/players/${player.photo}` : basicUser} alt={`${player.name} ${player.lastName1} ${player.lastName2}`} />
                            </div>
                            <div id='playerDetailsDiv'>
                                <p id='name'>{player.name} {player.lastName1} {player.lastName2}</p>
                                <p id='birthDate'>{player.birthDate.split('-').reverse().join('/')}</p>
                                <p id='number'>{'#' + `${player.number}`.padStart(2, '0') + '#'}</p>
                            </div>
                        </div>
                        <div id='playerStatsDiv'>
                            <table id='playerStatsTable'>
                                {(player.playerType == 'RINK_PLAYER') ?
                                    (
                                        <>
                                            <thead id='tableHead'>
                                                <tr>
                                                    <td className='headCell'><p>Partidos jugados</p></td>
                                                    <td className='headCell'><p>Puntos</p></td>
                                                    <td className='headCell'><p>Goles</p></td>
                                                    <td className='headCell'><p>Asistencias</p></td>
                                                    <td className='headCell'><p>+/-</p></td>
                                                    <td className='headCell'><p>Tiros</p></td>
                                                    <td className='headCell'><p>Pucks recuperados</p></td>
                                                    <td className='headCell'><p>Pucks perdidos</p></td>
                                                    <td className='headCell'><p>Pases completados</p></td>
                                                    <td className='headCell'><p>Pases fallados</p></td>
                                                    <td className='headCell'><p>Minutos sanción</p></td>
                                                    <td className='headCell'><p>Penaltis metidos</p></td>
                                                    <td className='headCell'><p>Penaltis fallados</p></td>
                                                </tr>
                                            </thead>
                                            <tbody id='tableBody'>
                                                <tr>
                                                    <td className='bodyCell'><p>{playerStats?.gamesPlayed}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.goals + playerStats?.assists}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.goals}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.assists}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.plusMinus}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.shots}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.recoveredPucks}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.lostPucks}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.goodPasses}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.badPasses}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.penaltyMins}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.penaltyShotGoals}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.penaltyShotMisses}</p></td>
                                                </tr>
                                            </tbody>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <thead id='tableHead'>
                                                <tr>
                                                    <td className='headCell'><p>Partidos jugados</p></td>
                                                    <td className='headCell'><p>% Paradas</p></td>
                                                    <td className='headCell'><p>Tiros recibidos</p></td>
                                                    <td className='headCell'><p>Goles recibidos</p></td>
                                                    <td className='headCell'><p>Minutos de sanción</p></td>
                                                    <td className='headCell'><p>Penaltis encajados</p></td>
                                                    <td className='headCell'><p>Penaltis parados</p></td>
                                                </tr>
                                            </thead>
                                            <tbody id='tableBody'>
                                                <tr>
                                                    <td className='bodyCell'><p>{playerStats?.gamesPlayed}</p></td>
                                                    <td className='bodyCell'><p>{(((playerStats?.shotsReceived - playerStats?.goalsReceived) / playerStats?.shotsReceived).toFixed(3) == 'NaN') ? ('') : (((playerStats?.shotsReceived - playerStats?.goalsReceived) / playerStats?.shotsReceived).toFixed(3))}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.shotsReceived}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.goalsReceived}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.penaltyMins}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.penaltyShotGoals}</p></td>
                                                    <td className='bodyCell'><p>{playerStats?.penaltyShotSaves}</p></td>
                                                </tr>
                                            </tbody>
                                        </>
                                    )
                                }
                            </table>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}