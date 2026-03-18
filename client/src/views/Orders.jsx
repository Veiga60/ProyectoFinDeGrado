import Header from '../components/Header.jsx'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import axios from 'axios'
import '../style/Orders.css'

export default function Orders() {

    const SERVER_URL = 'http://localhost:8081';
    const location = useLocation();

    const [wheelModels, setWheelModels] = useState([]);
    const [wheelHardnesses, setWheelHardnesses] = useState([]);
    const [wheelSizes, setWheelSizes] = useState([]);

    const getWheelsOptions = async () => {
        try {
            const wheelModels = await axios.get(`${SERVER_URL}/wheelModels/all`, { withCredentials: true });
            const wheelHardnesses = await axios.get(`${SERVER_URL}/wheelHardnesses/all`, { withCredentials: true });
            const wheelSizes = await axios.get(`${SERVER_URL}/wheelSizes/all`, { withCredentials: true });
            await setWheelModels(wheelModels.data);
            await setWheelHardnesses(wheelHardnesses.data);
            await setWheelSizes(wheelSizes.data);

        } catch (error) {
            console.log('Error obteniendo las opciones de elección de ruedas: ', error)
        }
    }

    useEffect(() => {
        getWheelsOptions();
    }, []);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state.authenticatedUserPlayerId}
                isCoach={location.state.isCoach}
            />
            <div id='ordersMainDiv'>
                <Tabs id='ordersTab' default='0'>
                    <TabList>
                        <Tab>Sticks</Tab>
                        <Tab>Ruedas</Tab>
                    </TabList>
                    <TabPanel className='playerOrdersTab' id='stickOrdersTab'>

                    </TabPanel>
                    <TabPanel className='playerOrdersTab' id='wheelOrdersTab'>
                        <input type="text" placeholder='Nº tfno.' />
                        <select name='wheelModels' id='wheelModels'>
                            {
                                wheelModels.map((wheelModel) => {
                                    return <option key={wheelModel.id}>{wheelModel.description}</option>
                                })
                            }
                        </select>
                        <select name='wheelHardnesses' id='wheelHardnesses'>
                            {
                                wheelHardnesses.map((wheelHardness) => {
                                    return <option key={wheelHardness.id}>{wheelHardness.description}</option>
                                })
                            }
                        </select><select name='wheelSizes' id='wheelSizes'>
                            {
                                wheelSizes.map((wheelSize) => {
                                    return <option key={wheelSize.id}>{wheelSize.description}</option>
                                })
                            }
                        </select>
                        <input type="number" placeholder='Cantidad' />
                    </TabPanel>
                </Tabs>
            </div>
        </>
    )
}