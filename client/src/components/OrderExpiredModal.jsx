import '../style/OrderExpiredModal.css'

export default function OrderExpiredModal({ onClose }) {
    return (
        <>
            <div id='orderExpiredModalMainDiv'>
                <div id='orderExpiredMainDiv'>
                    <div id='orderExpired'>
                        <p id='orderExpiredErrorText'>ERROR</p>
                    </div>
                    <div id='orderExpiredText'>
                        <p>Este pedido ya ha expirado.</p>
                    </div>
                    <button onClick={() => onClose()}>CERRAR</button>
                </div>
            </div >
        </>
    )
}