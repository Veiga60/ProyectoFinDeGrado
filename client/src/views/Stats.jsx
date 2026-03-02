import Header from '../components/Header'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import '../style/Stats.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import PlayerCard from '../components/PlayerCard';
import { useNavigate, useLocation } from 'react-router-dom';
import logoMetropolitano from '../assets/images/logo-metropolitanohc-negro-transparente.png'

export default function Stats() {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();
    const location = useLocation();

    const [players, setPlayers] = useState([]);
    const [teamStats, setTeamStats] = useState({});

    const getPlayers = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/players`, { withCredentials: true });
            setPlayers(response.data);
        } catch (error) {
            console.log('Error al cargar los jugadores: ', error);
        }
    }

    const getTeamStats = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/team/stats`, { withCredentials: true });
            setTeamStats(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('Error al cargar las estadísticas del equipo: ', error);
        }
    }

    useEffect(() => {
        getPlayers();
        getTeamStats();
    }, []);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state?.authenticatedUserPlayerId}
                isCoach={location.state?.isCoach}
            />
            <div id='tabsDiv'>
                <Tabs id='statsTabs' default='0'>
                    <TabList>
                        <Tab>Jugadores</Tab>
                        <Tab>Equipo</Tab>
                    </TabList>
                    <TabPanel id='playersTab'>
                        {players.map(player =>
                            <PlayerCard
                                id='playerCard'
                                key={player.id}
                                player={player}
                                onClick={() => navigate(`/stats/players/${player.id}`)}
                                enableHover={'true'}
                            />
                        )}
                    </TabPanel>
                    <TabPanel id='teamTab'>
                        <div className='statDiv'>
                            <p className='statText'>Puntos</p>
                            <p className='statValue'>{(3 * teamStats.gamesWon) + teamStats.gamesTied + teamStats.bonusPoints}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>Partidos jugados</p>
                            <p className='statValue'>{teamStats.gamesWon + teamStats.gamesLost + teamStats.gamesTied}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>Partidos ganados</p>
                            <p className='statValue'>{teamStats.gamesWon}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>Partidos perdidos</p>
                            <p className='statValue'>{teamStats.gamesLost}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>Partidos empatados</p>
                            <p className='statValue'>{teamStats.gamesTied}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>Bonus</p>
                            <p className='statValue'>{teamStats.bonusPoints}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>Goles a favor</p>
                            <p className='statValue'>{teamStats.goalsFor}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>Goles en contra</p>
                            <p className='statValue'>{teamStats.goalsAgainst}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>Goal average</p>
                            <p className='statValue'>{teamStats.goalsFor - teamStats.goalsAgainst}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>Power Play %</p>
                            <p className='statValue'>{teamStats.powerPlayPercentage?.toFixed(2)}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>Penalty Kill %</p>
                            <p className='statValue'>{teamStats.penaltyKillPercentage?.toFixed(2)}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>1vs0 +-</p>
                            <p className='statValue'>{teamStats.oneVsZero}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>1vs1 +-</p>
                            <p className='statValue'>{teamStats.oneVsOne}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>2vs1 +-</p>
                            <p className='statValue'>{teamStats.twoVsOne}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>2vs2 +-</p>
                            <p className='statValue'>{teamStats.twoVsTwo}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>3vs1 +-</p>
                            <p className='statValue'>{teamStats.threeVsOne}</p>
                        </div>
                        <div className='statDiv'>
                            <p className='statText'>3vs2 +-</p>
                            <p className='statValue'>{teamStats.threeVsTwo}</p>
                        </div>
                        <div id='logoImageDiv'>
                            <img id='logoImage' src={logoMetropolitano} alt="Escudo Metropolitano HC" />
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}