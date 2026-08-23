import { useState } from 'react'
import axios from 'axios'
import DownloadExcelModal from '../components/DownloadExcelModal.jsx'
import '../style/CreateOrderModal.css'
import SERVER_URL from '../config.js'

export default function CreatOrderModal({ orderTypes, onClose, wheelNextOrder, stickNextOrder, wheelExcelDownloaded, stickExcelDownloaded }) {

    const [deadline, setDeadline] = useState();
    const [orderType, setOrderType] = useState(orderTypes[0].id);
    const [downloadExcelModal, setDownloadExcelModal] = useState(false);

    const toggleDownloadExcelModal = () => {
        setDownloadExcelModal(!downloadExcelModal);
    }

    const createOrder = async () => {
        let type = orderTypes.find((element) => element.id == orderType);

        const currentDate = new Date(Date.now());
        const wheelOrderDeadline = new Date(wheelNextOrder?.deadline);
        const stickOrderDeadline = new Date(stickNextOrder?.deadline);

        if (type.description === 'Ruedas' && (currentDate > wheelOrderDeadline) && !wheelExcelDownloaded) {
            toggleDownloadExcelModal();
            return false;
        } else if (type.description === 'Sticks' && (currentDate > stickOrderDeadline) && !stickExcelDownloaded) {
            toggleDownloadExcelModal();
            return false;
        } else {
            try {
                await axios.post(`${SERVER_URL}/orders`,
                    {
                        'deadline': deadline,
                        'type': {
                            'id': type.id,
                            'description': type.description
                        }
                    },
                    {
                        headers:
                        {
                            'Content-Type': 'application/json'
                        },

                        withCredentials: true
                    });

                return true;
            } catch (error) {
                console.log('Error creating the order: ', error);
                return false;
            }
        }

    }

    return (
        <>
            <div id='createOrderModalMainDiv'>
                <div id='createOrderMainDiv'>
                    <div id='createOrder'>
                        <p id='createOrderText'>NUEVO PEDIDO</p>
                    </div>
                    <div id='createOrderModalInputsDiv'>
                        <input type="datetime-local" placeholder='Fecha límite' id="deadline" onChange={(e) => { setDeadline(e.target.value) }} />
                        <select name="orderType" id="orderType" onChange={(e) => setOrderType(e.target.value)}>
                            {
                                orderTypes.map((orderType) => {
                                    return <option key={orderType.id} value={orderType.id}>{orderType.description}</option>
                                })
                            }
                        </select>
                    </div>
                    <div id='createOrderModalButtons'>
                        <button id='createOrderButton' className='createOrderModalButton' onClick={async () => {
                            var refresh;
                            if (deadline) {
                                refresh = await createOrder();
                            }

                            if (refresh) {
                                await onClose();
                                window.location.reload();
                            }
                        }}>CREAR</button>
                        <button id='closeCreateOrderModalButton' className='createOrderModalButton' onClick={() => onClose()}>CERRAR</button>
                    </div>
                </div>
            </div >
            {
                (downloadExcelModal) && (
                    <DownloadExcelModal
                        onClose={toggleDownloadExcelModal}
                    />
                )
            }
        </>
    )
}