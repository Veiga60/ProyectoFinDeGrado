import Header from '../components/Header'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import '../style/Stats.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import PlayerCard from '../components/PlayerCard';
import { useNavigate } from 'react-router-dom';

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
                    <TabPanel className='tabText'>
                        {players.map(player =>
                            <PlayerCard
                                key={player.id}
                                player={player}
                                onClick={() => navigate(`/stats/players/${player.id}`)}
                            />
                        )}
                    </TabPanel>
                    <TabPanel className='tabText'>
                        {teamStats.points}
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}