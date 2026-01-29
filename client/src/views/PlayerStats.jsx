import { useParams } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../style/PlayerStats.css'

export default function PlayerStats() {

    const SERVER_URL = 'http://localhost:8081';
    const { playerId } = useParams();

    const [player, setPlayer] = useState(null);

    const getPlayer = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/players/${playerId}`, { withCredentials: true });
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
                                <img id='photo' src={`/players/${player.photo}`} alt={`${player.name} ${player.lastName1} ${player.lastName2}`} />
                            </div>
                            <div id='playerDetailsDiv'>
                                <p id='name'>{player.name} {player.lastName1} {player.lastName2}</p>
                                <p id='birthDate'>{player.birthDate.split('-').reverse().join('/')}</p>
                                <p id='number'>#{player.number}#</p>
                            </div>
                        </div>
                        <div id='playerStatsDiv'>
                            <table>
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
                                                    <td className='bodyCell'><p>{player.playerStats.gamesPlayed}</p></td>
                                                    <td className='bodyCell'><p>{player.playerStats.goals + player.playerStats.assists}</p></td>
                                                    <td className='bodyCell'><p>{player.playerStats.goals}</p></td>
                                                    <td className='bodyCell'><p>{player.playerStats.assists}</p></td>
                                                    <td className='bodyCell'><p>{player.playerStats.plusMinus}</p></td>
                                                    <td className='bodyCell'><p>{player.playerStats.shots}</p></td>
                                                    <td className='bodyCell'><p>{player.playerStats.recoveredPucks}</p></td>
                                                    <td className='bodyCell'><p>{player.playerStats.lostPucks}</p></td>
                                                    <td className='bodyCell'><p>{player.playerStats.goodPasses}</p></td>
                                                    <td className='bodyCell'><p>{player.playerStats.badPasses}</p></td>
                                                    <td className='bodyCell'><p>{player.playerStats.penaltyMins}</p></td>
                                                    <td className='bodyCell'><p>{player.playerStats.penaltyShotGoals}</p></td>
                                                    <td className='bodyCell'><p>{player.playerStats.penaltyShotMisses}</p></td>
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
                                                    <td className='bodyCell'><p>{player.goalieStats.gamesPlayed}</p></td>
                                                    <td className='bodyCell'><p>{((player.goalieStats.shotsReceived - player.goalieStats.goalsReceived) / player.goalieStats.shotsReceived).toFixed(3)}</p></td>
                                                    <td className='bodyCell'><p>{player.goalieStats.shotsReceived}</p></td>
                                                    <td className='bodyCell'><p>{player.goalieStats.goalsReceived}</p></td>
                                                    <td className='bodyCell'><p>{player.goalieStats.penaltyMins}</p></td>
                                                    <td className='bodyCell'><p>{player.goalieStats.penaltyShotGoals}</p></td>
                                                    <td className='bodyCell'><p>{player.goalieStats.penaltyShotSaves}</p></td>
                                                </tr>
                                            </tbody>
                                        </>
                                    )
                                }
                            </table>
                        </div>
                    </>
                }
            </div>
        </>
    )
}