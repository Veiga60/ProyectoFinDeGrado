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
    const [orderTypes, setOrderTypes] = useState([]);

    const [wheelModel, setWheelModel] = useState();
    const [wheelHardness, setWheelHardness] = useState();
    const [wheelSize, setWheelSize] = useState();

    const getWheelsOptions = async () => {
        try {
            const wheelModels = await axios.get(`${SERVER_URL}/wheelModels/all`, { withCredentials: true });
            const wheelHardnesses = await axios.get(`${SERVER_URL}/wheelHardnesses/all`, { withCredentials: true });
            const wheelSizes = await axios.get(`${SERVER_URL}/wheelSizes/all`, { withCredentials: true });
            await setWheelModels(wheelModels.data);
            await setWheelHardnesses(wheelHardnesses.data);
            await setWheelSizes(wheelSizes.data);
        } catch (error) {
            console.log('Error fetching wheel options:', error)
        }
    }

    const getOrderTypes = async () => {
        try {
            const orderTypes = await axios.get(`${SERVER_URL}/orders/types/all`, { withCredentials: true });
            await setOrderTypes(orderTypes.data);
        } catch (error) {
            console.log('Error fetching order types: ', error)
        }
    }

    useEffect(() => {
        getWheelsOptions();
        getOrderTypes();
    }, []);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state.authenticatedUserPlayerId}
                isCoach={location.state.isCoach}
            />
            <div id='ordersMainDiv'>
                <div>
                    <button></button>
                </div>
                <div>
                    <Tabs id='ordersTab' default='0'>
                        <TabList>
                            {
                                orderTypes.map((orderType) => {
                                    return <Tab key={orderType.id}>{orderType.description}</Tab>
                                })
                            }
                        </TabList>
                        <TabPanel className='playerOrdersTab' id='wheelOrdersTab'>
                            <input type="text" placeholder='Nº tfno.' />
                            <select name='wheelModels' id='wheelModels' onChange={(e) => { setWheelModel(e.target.value) }}>
                                {
                                    wheelModels.map((wheelModel) => {
                                        return <option key={wheelModel.id}>{wheelModel.description}</option>
                                    })
                                }
                            </select>
                            <select name='wheelHardnesses' id='wheelHardnesses' onChange={(e) => { setWheelHardness(e.target.value) }}>
                                {
                                    wheelHardnesses.map((wheelHardness) => {
                                        return <option key={wheelHardness.id}>{wheelHardness.description}</option>
                                    })
                                }
                            </select>
                            <select name='wheelSizes' id='wheelSizes' onChange={(e) => { setWheelSize(e.target.value) }}>
                                {
                                    wheelSizes.map((wheelSize) => {
                                        return <option key={wheelSize.id}>{wheelSize.description}</option>
                                    })
                                }
                            </select>
                            <input type="number" placeholder='Cantidad' />
                        </TabPanel>
                        <TabPanel className='playerOrdersTab' id='stickOrdersTab'>

                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    )
}