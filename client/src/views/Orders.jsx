import Header from '../components/Header.jsx'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import axios from 'axios'
import CreateOrderModal from '../components/CreateOrderModal.jsx'
import '../style/Orders.css'

export default function Orders() {

    const SERVER_URL = 'http://localhost:8081';
    const location = useLocation();

    const [wheelModels, setWheelModels] = useState([]);
    const [wheelHardnesses, setWheelHardnesses] = useState([]);
    const [wheelSizes, setWheelSizes] = useState([]);
    const [orderTypes, setOrderTypes] = useState([]);

    const [stickNextOrder, setStickNextOrder] = useState();
    const [wheelNextOrder, setWheelNextOrder] = useState();

    const wheelOrderType = orderTypes.find((orderType) => orderType.description == 'Ruedas');
    const stickOrderType = orderTypes.find((orderType) => orderType.description == 'Sticks');

    const [wheelModel, setWheelModel] = useState();
    const [wheelHardness, setWheelHardness] = useState();
    const [wheelSize, setWheelSize] = useState();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState(0);

    const [createOrderModal, setCreateOrderModal] = useState(false);



    const toggleCreateOrderModal = () => {
        setCreateOrderModal(!createOrderModal);
    }

    const getWheelsOptions = async () => {
        try {
            const wheelModels = await axios.get(`${SERVER_URL}/wheelModels/all`, { withCredentials: true });
            const wheelHardnesses = await axios.get(`${SERVER_URL}/wheelHardnesses/all`, { withCredentials: true });
            const wheelSizes = await axios.get(`${SERVER_URL}/wheelSizes/all`, { withCredentials: true });
            await setWheelModels(wheelModels.data);
            await setWheelHardnesses(wheelHardnesses.data);
            await setWheelSizes(wheelSizes.data);
            await setWheelModel(wheelModels.data[0].id);
            await setWheelHardness(wheelHardnesses.data[0].id);
            await setWheelSize(wheelSizes.data[0].id);
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

    const getStickNextOrder = async () => {
        try {
            const stickNextOrder = await axios.get(`${SERVER_URL}/orders/next`, { params: { typeId: stickOrderType?.id }, withCredentials: true });
            await setStickNextOrder(stickNextOrder.data);
        } catch (error) {
            console.log('Error fetching order types: ', error)
        }
    }

    const getWheelNextOrder = async () => {
        try {
            const wheelNextOrder = await axios.get(`${SERVER_URL}/orders/next`, { params: { typeId: wheelOrderType?.id }, withCredentials: true });
            await setWheelNextOrder(wheelNextOrder.data);
        } catch (error) {
            console.log('Error fetching order types: ', error)
        }
    }

    const createWheelOrder = async () => {
        try {
            await axios.post(`${SERVER_URL}/orders/wheels`, {
                player: {
                    id: location.state.authenticatedUserPlayerId
                },
                phoneNumber: phoneNumber,
                order: {
                    id: wheelNextOrder.id
                },
                model: {
                    id: wheelModel
                },
                hardness: {
                    id: wheelHardness
                },
                size: {
                    id: wheelSize
                },
                amount: amount
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
        } catch (error) {
            console.log('Error creating the player order: ', error);
        }
    }

    useEffect(() => {
        getWheelsOptions();
        getOrderTypes();
    }, []);

    useEffect(() => {
        if (wheelOrderType) {
            getWheelNextOrder();
        }
        if (stickOrderType) {
            getStickNextOrder();
        }
    }, [wheelOrderType, stickOrderType]);

    return (
        <>
            <Header
                authenticatedUserPlayerId={location.state.authenticatedUserPlayerId}
                isCoach={location.state.isCoach}
            />
            <div id='ordersMainDiv'>
                <div>
                    {
                        (location.state.isCoach) && (
                            <button onClick={toggleCreateOrderModal}>NUEVO PEDIDO</button>
                        )
                    }
                </div>
                <div>
                    {orderTypes.length > 0 && (
                        <Tabs id='ordersTab' defaultIndex={0}>
                            <TabList>
                                {
                                    orderTypes.map((orderType) => {
                                        return <Tab key={orderType.id}>{orderType.description}</Tab>
                                    })
                                }
                            </TabList>
                            <TabPanel className='playerOrdersTab' id='wheelOrdersTab'>
                                <div className='deadlineDiv'>
                                    <p className='deadlineText'>Fecha límite: {wheelNextOrder?.deadline}</p>
                                </div>
                                <div>

                                </div>
                                <div className='inputsDiv'>
                                    <input type="text" placeholder='Nº tfno.' onChange={(e) => setPhoneNumber(e.target.value)} />
                                    <select name='wheelModels' id='wheelModels' onChange={(e) => { setWheelModel(e.target.value) }}>
                                        {
                                            wheelModels.map((wheelModel) => {
                                                return <option key={wheelModel.id} value={wheelModel.id}>{wheelModel.description}</option>
                                            })
                                        }
                                    </select>
                                    <select name='wheelHardnesses' id='wheelHardnesses' onChange={(e) => { setWheelHardness(e.target.value) }}>
                                        {
                                            wheelHardnesses.map((wheelHardness) => {
                                                return <option key={wheelHardness.id} value={wheelHardness.id}>{wheelHardness.description}</option>
                                            })
                                        }
                                    </select>
                                    <select name='wheelSizes' id='wheelSizes' onChange={(e) => { setWheelSize(e.target.value) }}>
                                        {
                                            wheelSizes.map((wheelSize) => {
                                                return <option key={wheelSize.id} value={wheelSize.id}>{wheelSize.description}</option>
                                            })
                                        }
                                    </select>
                                    <input type="number" placeholder='Cantidad' onChange={(e) => setAmount(e.target.value)} />
                                    <button className='orderButton' onClick={() => { [createWheelOrder()] }}>PEDIR</button>
                                </div>
                            </TabPanel>
                            <TabPanel className='playerOrdersTab' id='stickOrdersTab'>

                            </TabPanel>
                        </Tabs>
                    )}
                </div>
            </div>
            {
                (createOrderModal) && (
                    <CreateOrderModal
                        orderTypes={orderTypes}
                        onClose={toggleCreateOrderModal}
                    />
                )
            }
        </>
    )
}