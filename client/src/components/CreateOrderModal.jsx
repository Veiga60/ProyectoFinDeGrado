import { useState } from 'react'
import axios from 'axios'
import '../style/CreateOrderModal.css'

export default function CreatOrderModal({ orderTypes, onClose }) {

    const SERVER_URL = 'http://localhost:8081';

    const [deadline, setDeadline] = useState();
    const [orderType, setOrderType] = useState(orderTypes[0].id);

    const createOrder = async () => {
        let type = orderTypes.find((element) => element.id == orderType);
        console.log(deadline);
        console.log(orderType);
        console.log(type);
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
        } catch (error) {
            console.log('Error creating the order: ', error);
        }
    }

    return (
        <>
            <div id='createOrderModalMainDiv'>
                <div id='createOrderMainDiv'>
                    <div id='createOrder'>
                        <p id='createOrderText'>NUEVO PEDIDO</p>
                    </div>
                    <input type="date" placeholder='Fecha límite' id="deadline" onChange={(e) => { setDeadline(e.target.value) }} />
                    <select name="orderType" id="orderType" onChange={(e) => setOrderType(e.target.value)}>
                        {
                            orderTypes.map((orderType) => {
                                return <option key={orderType.id} value={orderType.id}>{orderType.description}</option>
                            })
                        }
                    </select>
                    <button onClick={async () => (deadline) && ([await createOrder(), await onClose()])}>CREAR</button>
                    <button onClick={() => onClose()}>CERRAR</button>
                </div>
            </div >
        </>
    )
}