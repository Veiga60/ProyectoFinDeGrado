import axios from 'axios'
import '../style/UseAIModal.css'

export default function UseAIModal({ onClose, onMatchFinished, prompt }) {

    const SERVER_URL = 'http://localhost:8081';

    const getRecomendations = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/ai/recomendations`, { prompt: prompt }, { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.log('Error al generar las recomendaciones: ', error);
        }
    }

    return (
        <>
            <div id='useAIModalMainDiv'>
                <div id='useAIMainDiv'>
                    <div id='useAITextDiv'>
                        <p id='useAIText'>¿Quieres recibir recomendaciones de áreas a entrenar?</p>
                    </div>
                    <div id='useAIModalButtonsDiv'>
                        <button className='useAIModalButton' onClick={() => { [onClose(), getRecomendations()] }}>SI</button>
                        <button className='useAIModalButton' onClick={() => { [onClose(), onMatchFinished()] }}>NO</button>
                    </div>
                </div>
            </div>
        </>
    )
}