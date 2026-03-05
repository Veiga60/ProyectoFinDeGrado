import axios from 'axios'
import '../style/UseAIModal.css'

export default function UseAIModal({ onClose, onMatchFinished }) {

    const SERVER_URL = 'http://localhost:8081';

    const getRecomendations = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/ai/recomendations`, { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.log('Error al generar las recomendaciones: ', error);
        }
    }

    return (
        <>
            <div id='useAIModalMainDiv'>
                <div id='useAIMainDiv'>
                    <div>
                        <p id='useAIText'>¿Quieres recibir recomendaciones de áreas a entrenar?</p>
                    </div>
                    <div>
                        <button onClick={() => { [onClose(), getRecomendations()] }}>SI</button>
                        <button onClick={() => { [onClose(), onMatchFinished()] }}>NO</button>
                    </div>
                </div>
            </div>
        </>
    )
}