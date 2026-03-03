import '../style/UseAIModal.css'

export default function UseAIModal({ onClose, onMatchFinished }) {

    return (
        <>
            <div id='useAIModalMainDiv'>
                <div id='useAIMainDiv'>
                    <div>
                        <p id='useAIText'>¿Quieres recibir recomendaciones de áreas a entrenar?</p>
                    </div>
                    <div>
                        <button onClick={() => { [onClose()] }}>SI</button>
                        <button onClick={() => { [onClose(), onMatchFinished()] }}>NO</button>
                    </div>
                </div>
            </div>
        </>
    )
}