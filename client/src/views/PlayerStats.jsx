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
            const response = await axios.get(`${SERVER_URL}/players/${id}`, { withCredentials: true });
            setPlayer(response.data);
            console.log(response.data);
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
                {(player != null) &&
                    <>
                        <div id='playerInfoDiv'>
                            <div id='playerPhotoDiv'>
                                <img src={`/players/${player.photo}`} alt={`${player.name} ${player.lastName1} ${player.lastName2}`} />
                            </div>
                            <div id='playerDetailsDiv'>
                                <p id='name'>{player.name} {player.lastName1} {player.lastName2}</p>
                                <p id='birthDate'>{player.birthDate}</p>
                                <p id='number'>{player.number}</p>
                            </div>
                        </div>
                        <div id='playerStatsDiv'>
                            <table>
                                <tbody>
                                    {(player.playerType == 'RINK_PLAYER') ?
                                        (
                                            <>
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
                                                    <td><p>{player.playerStats.gamesPlayed}</p></td>
                                                    <td><p>{player.playerStats.points}</p></td>
                                                    <td><p>{player.playerStats.goals}</p></td>
                                                    <td><p>{player.playerStats.assists}</p></td>
                                                    <td><p>{player.playerStats.plusMinus}</p></td>
                                                    <td><p>{player.playerStats.shots}</p></td>
                                                    <td><p>{player.playerStats.recoveredPucks}</p></td>
                                                    <td><p>{player.playerStats.goodPasses}</p></td>
                                                    <td><p>{player.playerStats.badPasses}</p></td>
                                                    <td><p>{player.playerStats.penaltyMins}</p></td>
                                                    <td><p>{player.playerStats.penaltyShotGoals}</p></td>
                                                    <td><p>{player.playerStats.penaltyShotMisses}</p></td>
                                                </tr>
                                            </>
                                        ) :
                                        (
                                            <>
                                                <tr>
                                                    <td><p>Partidos jugados</p></td>
                                                    <td><p>Tiros recibidos</p></td>
                                                    <td><p>Goles recibidos</p></td>
                                                    <td><p>Minutos de sanción</p></td>
                                                    <td><p>Penaltis encajados</p></td>
                                                    <td><p>Penaltis parados</p></td>
                                                </tr>
                                                <tr>
                                                    <td><p>{player.goalieStats.gamesPlayed}</p></td>
                                                    <td><p>{player.goalieStats.shotsReceived}</p></td>
                                                    <td><p>{player.goalieStats.goalsReceived}</p></td>
                                                    <td><p>{player.goalieStats.penaltyMins}</p></td>
                                                    <td><p>{player.goalieStats.penaltyShotGoals}</p></td>
                                                    <td><p>{player.goalieStats.penaltyShotSaves}</p></td>
                                                </tr>
                                            </>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                }
            </div>
        </>
    )
}