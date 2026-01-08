import Header from '../components/Header'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import '../style/Stats.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import PlayerCard from '../components/PlayerCard';
import { useNavigate } from 'react-router-dom';
import logoMetropolitano from '../assets/images/logo-metropolitanohc-negro-transparente.png'

export default function Stats() {

    const SERVER_URL = 'http://localhost:8081';
    const navigate = useNavigate();

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
            <Header />
            <div id='tabsDiv'>
                <Tabs id='statsTabs' default='0'>
                    <TabList>
                        <Tab>Jugadores</Tab>
                        <Tab>Equipo</Tab>
                    </TabList>
                    <TabPanel id='playersTab'>
                        {players.map(player =>
                            <PlayerCard
                                key={player.id}
                                player={player}
                                onClick={() => navigate(`/stats/players/${player.id}`)}
                            />
                        )}
                    </TabPanel>
                    <TabPanel id='teamTab'>
                        <div>
                            <p>Puntos</p>
                            <p>{(3 * teamStats.gamesWon) + teamStats.gamesTied + teamStats.bonusPoints}</p>
                        </div>
                        <div>
                            <p>Partidos jugados</p>
                            <p>{teamStats.gamesWon + teamStats.gamesLost + teamStats.gamesTied}</p>
                        </div>
                        <div>
                            <p>Partidos ganados</p>
                            <p>{teamStats.gamesWon}</p>
                        </div>
                        <div>
                            <p>Partidos perdidos</p>
                            <p>{teamStats.gamesLost}</p>
                        </div>
                        <div>
                            <p>Partidos empatados</p>
                            <p>{teamStats.gamesTied}</p>
                        </div>
                        <div>
                            <p>Bonus</p>
                            <p>{teamStats.bonusPoints}</p>
                        </div>
                        <div>
                            <p>Goles a favor</p>
                            <p>{teamStats.goalsFor}</p>
                        </div>
                        <div>
                            <p>Goles en contra</p>
                            <p>{teamStats.goalsAgainst}</p>
                        </div>
                        <div>
                            <p>Goal average</p>
                            <p>{teamStats.goalsFor - teamStats.goalsAgainst}</p>
                        </div>
                        <div>
                            <p>Power Play %</p>
                            <p>{teamStats.powerPlayPercentage?.toFixed(2)}</p>
                        </div>
                        <div>
                            <p>Penalty Kill %</p>
                            <p>{teamStats.penaltyKillPercentage?.toFixed(2)}</p>
                        </div>
                        <div>
                            <p>1vs0 +-</p>
                            <p>{teamStats.oneVsZero}</p>
                        </div>
                        <div>
                            <p>1vs1 +-</p>
                            <p>{teamStats.oneVsOne}</p>
                        </div>
                        <div>
                            <p>2vs1 +-</p>
                            <p>{teamStats.twoVsOne}</p>
                        </div>
                        <div>
                            <p>2vs2 +-</p>
                            <p>{teamStats.twoVsTwo}</p>
                        </div>
                        <div>
                            <p>3vs1 +-</p>
                            <p>{teamStats.threeVsOne}</p>
                        </div>
                        <div>
                            <p>3vs2 +-</p>
                            <p>{teamStats.threeVsTwo}</p>
                        </div>
                        <div>
                            <img src={logoMetropolitano} alt="Escudo Metropolitano HC" />
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}