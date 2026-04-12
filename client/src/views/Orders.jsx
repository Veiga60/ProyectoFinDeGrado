import Header from '../components/Header.jsx'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import axios from 'axios'
import CreateOrderModal from '../components/CreateOrderModal.jsx'
import OrderExpiredModal from '../components/OrderExpiredModal.jsx'
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import '../style/Orders.css'

export default function Orders() {

    const SERVER_URL = 'http://localhost:8081';
    const location = useLocation();

    const [wheelModels, setWheelModels] = useState([]);
    const [wheelHardnesses, setWheelHardnesses] = useState([]);
    const [wheelSizes, setWheelSizes] = useState([]);

    const [stickModels, setStickModels] = useState([]);
    const [stickLengths, setStickLengths] = useState([]);
    const [stickWeights, setStickWeights] = useState([]);
    const [stickBlades, setStickBlades] = useState([]);
    const [stickFlexes, setStickFlexes] = useState([]);
    const [stickKickpoints, setStickKickpoints] = useState([]);
    const [stickGrips, setStickGrips] = useState([]);

    const [orderTypes, setOrderTypes] = useState([]);

    const [stickNextOrder, setStickNextOrder] = useState();
    const [wheelNextOrder, setWheelNextOrder] = useState();

    const wheelOrderType = orderTypes.find((orderType) => orderType.description == 'Ruedas');
    const stickOrderType = orderTypes.find((orderType) => orderType.description == 'Sticks');

    const [wheelModel, setWheelModel] = useState();
    const [wheelHardness, setWheelHardness] = useState();
    const [wheelSize, setWheelSize] = useState();

    const [stickModel, setStickModel] = useState();
    const [stickLength, setStickLength] = useState();
    const [stickWeight, setStickWeight] = useState();
    const [stickBlade, setStickBlade] = useState();
    const [stickFlex, setStickFlex] = useState();
    const [stickKickpoint, setStickKickpoint] = useState();
    const [stickGrip, setStickGrip] = useState();

    const [wheelOrders, setWheelOrders] = useState([]);
    const [stickOrders, setStickOrders] = useState([]);

    const [wheelOrderPhoneNumber, setWheelOrderPhoneNumber] = useState('');
    const [wheelAmount, setWheelAmount] = useState(0);

    const [stickOrderPhoneNumber, setStickOrderPhoneNumber] = useState('');
    const [stickSide, setStickSide] = useState('Right');
    const [stickAmount, setStickAmount] = useState(0);
    const [stickNametag, setStickNametag] = useState('');

    const [wheelExcelDownloaded, setWheelExcelDownloaded] = useState(false);
    const [stickExcelDownloaded, setStickExcelDownloaded] = useState(false);

    const [createOrderModal, setCreateOrderModal] = useState(false);
    const [orderExpiredModal, setOrderExpiredModal] = useState(false);

    const currentDate = new Date(Date.now());
    const wheelOrderExpired = (wheelNextOrder) ? (currentDate > new Date(wheelNextOrder?.deadline)) : (false);
    const stickOrderExpired = (stickNextOrder) ? (currentDate > new Date(stickNextOrder?.deadline)) : (false);

    const toggleCreateOrderModal = () => {
        setCreateOrderModal(!createOrderModal);
    }

    const toggleOrderExpiredModal = () => {
        setOrderExpiredModal(!orderExpiredModal);
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

    const getSticksOptions = async () => {
        const stickModels = await axios.get(`${SERVER_URL}/stickModels/all`, { withCredentials: true });
        const stickLengths = await axios.get(`${SERVER_URL}/stickLengths/all`, { withCredentials: true });
        const stickWeights = await axios.get(`${SERVER_URL}/stickWeights/all`, { withCredentials: true });
        const stickBlades = await axios.get(`${SERVER_URL}/stickBlades/all`, { withCredentials: true });
        const stickFlexes = await axios.get(`${SERVER_URL}/stickFlexes/all`, { withCredentials: true });
        const stickKickpoints = await axios.get(`${SERVER_URL}/stickKickpoints/all`, { withCredentials: true });
        const stickGrips = await axios.get(`${SERVER_URL}/stickGrips/all`, { withCredentials: true });
        await setStickModels(stickModels.data);
        await setStickLengths(stickLengths.data);
        await setStickWeights(stickWeights.data);
        await setStickBlades(stickBlades.data);
        await setStickFlexes(stickFlexes.data);
        await setStickKickpoints(stickKickpoints.data);
        await setStickGrips(stickGrips.data);
        await setStickModel(stickModels.data[0].id);
        await setStickLength(stickLengths.data[0].id);
        await setStickWeight(stickWeights.data[0].id);
        await setStickBlade(stickBlades.data[0].id);
        await setStickFlex(stickFlexes.data[0].id);
        await setStickKickpoint(stickKickpoints.data[0].id);
        await setStickGrip(stickGrips.data[0].id);
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
        const currentDate = new Date(Date.now());
        const orderExpired = (wheelNextOrder) ? (currentDate > new Date(wheelNextOrder?.deadline)) : (false);
        if (orderExpired) {
            toggleOrderExpiredModal()
            return false;
        } else {
            try {
                await axios.post(`${SERVER_URL}/orders/wheels`, {
                    player: {
                        id: location.state.authenticatedUserPlayerId
                    },
                    phoneNumber: wheelOrderPhoneNumber,
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
                    amount: wheelAmount
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });

                return true;
            } catch (error) {
                if (error.response.status == 403) {
                    toggleOrderExpiredModal();
                }
                console.log('Error creating the player order: ', error);

                return false;
            }
        }
    }

    const createStickOrder = async () => {
        const currentDate = new Date(Date.now());
        const orderExpired = (stickNextOrder) ? (currentDate > new Date(stickNextOrder?.deadline)) : (false);
        if (orderExpired) {
            toggleOrderExpiredModal();
            return false;
        } else {
            try {
                await axios.post(`${SERVER_URL}/orders/sticks`, {
                    player: {
                        id: location.state.authenticatedUserPlayerId
                    },
                    phoneNumber: stickOrderPhoneNumber,
                    order: {
                        id: stickNextOrder.id
                    },
                    model: {
                        id: stickModel
                    },
                    length: {
                        id: stickLength
                    },
                    weight: {
                        id: stickWeight
                    },
                    side: stickSide,
                    blade: {
                        id: stickBlade
                    },
                    flex: {
                        id: stickFlex
                    },
                    kickpoint: {
                        id: stickKickpoint
                    },
                    grip: {
                        id: stickGrip
                    },
                    amount: stickAmount,
                    nametag: stickNametag
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });

                return true;
            } catch (error) {
                if (error.response.status == 403) {
                    toggleOrderExpiredModal();
                }
                console.log('Error creating the player order: ', error);

                return false;
            }
        }
    }

    const getWheelOrders = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/orders/wheels/${wheelNextOrder?.id}`, { withCredentials: true });
            setWheelOrders(response.data);
        } catch (error) {
            console.log('Error fetching wheel orders: ', error);
        }
    }

    const getStickOrders = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/orders/sticks/${stickNextOrder?.id}`, { withCredentials: true });
            setStickOrders(response.data);
        } catch (error) {
            console.log('Error fetching stick orders: ', error);
        }
    }

    const exportOrdersToExcel = async (orderType) => {
        try {
            var filename;
            var response;
            if (orderType === 'WHEELS') {

                filename = 'pedido_ruedas.xls';
                const wheelOrdersIds = [];

                for (let i = 0; i < wheelOrders.length; i++) {
                    wheelOrdersIds.push(wheelOrders[i].id);
                }

                response = await axios.get(`${SERVER_URL}/orders/wheels/next/excel`, {
                    params: {
                        wheelOrders: wheelOrdersIds.join(',')
                    },
                    responseType: 'blob',
                    withCredentials: true
                });

                await axios.put(`${SERVER_URL}/orders/${wheelNextOrder.id}`, {}, {
                    params: {
                        isExcelDownloaded: true
                    },
                    withCredentials: true
                });

                setWheelExcelDownloaded(true);

            } else if (orderType === 'STICKS') {
                filename = 'pedido_sticks.xls';
                const stickOrdersIds = [];

                for (let i = 0; i < stickOrders.length; i++) {
                    stickOrdersIds.push(stickOrders[i].id);
                }

                response = await axios.get(`${SERVER_URL}/orders/sticks/next/excel`, {
                    params: {
                        stickOrders: stickOrdersIds.join(',')
                    },
                    responseType: 'blob',
                    withCredentials: true
                });

                await axios.put(`${SERVER_URL}/orders/${stickNextOrder.id}`, {}, {
                    params: {
                        isExcelDownloaded: true
                    },
                    withCredentials: true
                });

                setStickExcelDownloaded(true);
            }

            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(link.href);

        } catch (error) {
            console.log('Error exporting order to Excel.', error);
        }
    }

    useEffect(() => {
        getWheelsOptions();
        getSticksOptions();
        getOrderTypes();
    }, []);

    useEffect(() => {
        if (wheelNextOrder) getWheelOrders();
        if (stickNextOrder) getStickOrders();
    }, [wheelNextOrder, stickNextOrder]);

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
                <div id='ordersTabDiv'>
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
                                {
                                    (wheelNextOrder) ? (
                                        <>
                                            <div className='deadlineDiv'>
                                                <p className='deadlineText'>{'Fecha límite: ' + `${wheelNextOrder?.deadline}`.replace('T', ' a las ')}</p>
                                            </div>
                                            <div id='wheelOrdersDiv'>
                                                <table id='wheelOrdersTable'>
                                                    <thead id='wheelOrdersTableHead'>
                                                        <tr>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Jugador</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Nº tfno</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Modelo</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Dureza</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Tamaño</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Cantidad</p></td>
                                                        </tr>
                                                    </thead>
                                                    <tbody id='wheelOrdersTableBody'>
                                                        {
                                                            wheelOrders.map((wheelOrder) => {
                                                                return <tr key={wheelOrder.id}>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{wheelOrder.player.name} {wheelOrder.player.lastName1} {wheelOrder.player.lastName2}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{wheelOrder.phoneNumber}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{wheelOrder.model?.description}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{wheelOrder.hardness?.description}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{wheelOrder.size?.description}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{wheelOrder.amount}</p></td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='noActiveOrdersDiv'>
                                                <p className='noActiveOrdersText'>Ningún pedido activo ahora mismo</p>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    (wheelNextOrder) && (
                                        (!location.state.isCoach) && (
                                            (!wheelOrderExpired) ? (
                                                <div className='inputsDiv'>
                                                    <input id='wheelPhoneNumberInput' className='wheelOrderInput' type="text" placeholder='Nº tfno.' onChange={(e) => setWheelOrderPhoneNumber(e.target.value)} />
                                                    <select name='wheelModels' id='wheelModels' className='orderSelect' onChange={(e) => { setWheelModel(e.target.value) }}>
                                                        {
                                                            wheelModels.map((wheelModel) => {
                                                                return <option key={wheelModel.id} value={wheelModel.id}>{wheelModel.description}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <select name='wheelHardnesses' id='wheelHardnesses' className='orderSelect' onChange={(e) => { setWheelHardness(e.target.value) }}>
                                                        {
                                                            wheelHardnesses.map((wheelHardness) => {
                                                                return <option key={wheelHardness.id} value={wheelHardness.id}>{wheelHardness.description}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <select name='wheelSizes' id='wheelSizes' className='orderSelect' onChange={(e) => { setWheelSize(e.target.value) }}>
                                                        {
                                                            wheelSizes.map((wheelSize) => {
                                                                return <option key={wheelSize.id} value={wheelSize.id}>{wheelSize.description}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <input id='wheelAmountInput' className='orderInput' type="number" min={0} placeholder='Cantidad' onChange={(e) => setWheelAmount(e.target.value)} />
                                                    <button id='wheelOderButton' className='orderButton' onClick={async () => { var refresh = await createWheelOrder(); if (refresh) window.location.reload(); }}>PEDIR</button>
                                                </div>
                                            ) : (
                                                <div className='orderExpiredDiv'>
                                                    <p className='orderExpiredText'>Este pedido ya ha expirado</p>
                                                </div>
                                            )
                                        )
                                    )
                                }
                                {
                                    (location.state.isCoach) && (
                                        <div className='ordersButtonsDiv'>
                                            <button id='newOrderButton' className='orderButton' onClick={toggleCreateOrderModal}>NUEVO PEDIDO</button>
                                            <button id='excelButton' className='orderButton' onClick={() => exportOrdersToExcel('WHEELS')}><PiMicrosoftExcelLogoFill /><p>EXCEL</p></button>
                                        </div>
                                    )
                                }
                            </TabPanel>
                            <TabPanel className='playerOrdersTab' id='stickOrdersTab'>
                                {
                                    (stickNextOrder) ? (
                                        <>
                                            <div className='deadlineDiv'>
                                                <p className='deadlineText'>Fecha límite: {stickNextOrder?.deadline}</p>
                                            </div>
                                            <div id='stickOrdersDiv'>
                                                <table id='wheelOrdersTable'>
                                                    <thead id='wheelOrdersTableHead'>
                                                        <tr>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Jugador</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Nº tfno</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Modelo</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Largura</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Peso</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Lado</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Pala</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Flex</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Kickpoint</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Grip</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Cantidad</p></td>
                                                            <td className='ordersTableHeadDiv'><p className='ordersTableHeadText'>Nametag</p></td>
                                                        </tr>
                                                    </thead>
                                                    <tbody id='wheelOrdersTableBody'>
                                                        {
                                                            stickOrders.map((stickOrder) => {
                                                                return <tr key={stickOrder.id}>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{stickOrder.player.name} {stickOrder.player.lastName1} {stickOrder.player.lastName2}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{stickOrder.phoneNumber}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{stickOrder.model?.description}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{stickOrder.length?.description}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{stickOrder.weight?.description}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{stickOrder.side}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{stickOrder.blade?.description}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{stickOrder.flex?.description}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{stickOrder.kickpoint?.description}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{stickOrder.grip?.description}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{stickOrder.amount}</p></td>
                                                                    <td className='ordersTableBodyDiv'><p className='ordersTableBodyText'>{stickOrder.nametag}</p></td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='noActiveOrdersDiv'>
                                                <p className='noActiveOrdersText'>Ningún pedido activo ahora mismo</p>
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    (stickNextOrder) && (
                                        (!location.state.isCoach) && (
                                            (!stickOrderExpired) ? (
                                                <div id='stickInputsDiv' className='inputsDiv'>
                                                    <input className='orderInput' type="text" placeholder='Nº tfno.' onChange={(e) => setStickOrderPhoneNumber(e.target.value)} />
                                                    <select name='stickModels' id='stickModels' className='orderSelect' onChange={(e) => { setStickModel(e.target.value) }}>
                                                        {
                                                            stickModels.map((stickModel) => {
                                                                return <option key={stickModel.id} value={stickModel.id}>{stickModel.description}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <select name='stickLengths' id='stickLengths' className='orderSelect' onChange={(e) => { setStickLength(e.target.value) }}>
                                                        {
                                                            stickLengths.map((stickLength) => {
                                                                return <option key={stickLength.id} value={stickLength.id}>{stickLength.description}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <select name='stickWeights' id='stickWeights' className='orderSelect' onChange={(e) => { setStickWeight(e.target.value) }}>
                                                        {
                                                            stickWeights.map((stickWeight) => {
                                                                return <option key={stickWeight.id} value={stickWeight.id}>{stickWeight.description}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <select name='stickSides' id='stickSides' className='orderSelect' onChange={(e) => { setStickSide(e.target.value) }}>
                                                        <option value="Right">Right</option>
                                                        <option value="Left">Left</option>
                                                    </select>
                                                    <select name='stickBlades' id='stickBlades' className='orderSelect' onChange={(e) => { setStickBlade(e.target.value) }}>
                                                        {
                                                            stickBlades.map((stickBlade) => {
                                                                return <option key={stickBlade.id} value={stickBlade.id}>{stickBlade.description}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <select name='stickFlexes' id='stickFlexes' className='orderSelect' onChange={(e) => { setStickFlex(e.target.value) }}>
                                                        {
                                                            stickFlexes.map((stickFlex) => {
                                                                return <option key={stickFlex.id} value={stickFlex.id}>{stickFlex.description}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <select name='stickKickpoints' id='stickKickpoints' className='orderSelect' onChange={(e) => { setStickKickpoint(e.target.value) }}>
                                                        {
                                                            stickKickpoints.map((stickKickpoint) => {
                                                                return <option key={stickKickpoint.id} value={stickKickpoint.id}>{stickKickpoint.description}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <select name='stickGrips' id='stickGrips' className='orderSelect' onChange={(e) => { setStickGrip(e.target.value) }}>
                                                        {
                                                            stickGrips.map((stickGrip) => {
                                                                return <option key={stickGrip.id} value={stickGrip.id}>{stickGrip.description}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <input type="number" placeholder='Cantidad' id='stickAmountInput' className='orderInput' onChange={(e) => setStickAmount(e.target.value)} />
                                                    <input type="text" placeholder='Nametag' className='orderInput' onChange={(e) => setStickNametag(e.target.value)} />
                                                    <button className='orderButton' onClick={async () => { var refresh = await createStickOrder(); if (refresh) window.location.reload(); }}>PEDIR</button>
                                                </div>
                                            ) : (
                                                <div className='orderExpiredDiv'>
                                                    <p className='orderExpiredText'>Este pedido ya ha expirado</p>
                                                </div>
                                            )
                                        )
                                    )
                                }
                                {
                                    (location.state.isCoach) && (
                                        <div className='ordersButtonsDiv'>
                                            <button id='sticksNewOrderButton' className='orderButton' onClick={toggleCreateOrderModal}>NUEVO PEDIDO</button>
                                            <button id='sticksExcelButton' className='orderButton' onClick={() => exportOrdersToExcel('STICKS')}><PiMicrosoftExcelLogoFill /><p>EXCEL</p></button>
                                        </div>
                                    )
                                }
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
                        wheelNextOrder={wheelNextOrder}
                        stickNextOrder={stickNextOrder}
                        wheelExcelDownloaded={wheelExcelDownloaded}
                        stickExcelDownloaded={stickExcelDownloaded}
                    />
                )
            }
            {
                orderExpiredModal && (
                    <OrderExpiredModal onClose={toggleOrderExpiredModal} />
                )
            }
        </>
    )
}