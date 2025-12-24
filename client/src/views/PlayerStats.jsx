import { useParams } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../style/PlayerStats.css'

export default function PlayerStats() {

    const SERVER_URL = 'http://localhost:8081';
    const { id } = useParams();

    const [player, setPlayer] = useState(null);

    const getPlayer = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/players/${id}`);
            console.log(response.data);
            setPlayer(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPlayer();
    }, []);

    return (
        <>
            <Header />
            <div id='contentDiv'>
                <div id='playerInfoDiv'>
                    {(player != null) &&
                        <>
                            <div id='playerPhotoDiv'>
                                <img src={`/players/${player.photo}`} alt={`${player.name} ${player.lastName1} ${player.lastName2}`} />
                            </div>
                            <div id='playerDetailsDiv'>
                                <p id='playerName'>{player.name} {player.lastName1} {player.lastName2}</p>
                            </div>
                            <div id='playerStatsDiv'>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><p>Partidos jugados</p></td>
                                            <td><p>Puntos</p></td>
                                            <td><p>Goles</p></td>
                                            <td><p>Asistencias</p></td>
                                            <td><p>+/-</p></td>
                                            <td><p>Tiros</p></td>
                                            <td><p>Pucks recuperados</p></td>
                                            <td><p>Pases completados</p></td>
                                            <td><p>Pases fallados</p></td>
                                            <td><p>Minutos sanción</p></td>
                                            <td><p>Penaltis metidos</p></td>
                                            <td><p>Penaltis fallados</p></td>
                                        </tr>
                                        <tr>
                                            <td><p>{player.stats.gamesPlayed}</p></td>
                                            <td><p>{player.stats.points}</p></td>
                                            <td><p>{player.stats.goals}</p></td>
                                            <td><p>{player.stats.assists}</p></td>
                                            <td><p>{player.stats.plusMinus}</p></td>
                                            <td><p>{player.stats.shots}</p></td>
                                            <td><p>{player.stats.recoveredPucks}</p></td>
                                            <td><p>{player.stats.goodPasses}</p></td>
                                            <td><p>{player.stats.badPasses}</p></td>
                                            <td><p>{player.stats.penaltyMins}</p></td>
                                            <td><p>{player.stats.penaltyShotGoals}</p></td>
                                            <td><p>{player.stats.penaltyShotMisses}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    }
                </div>

            </div>
        </>
    )
}