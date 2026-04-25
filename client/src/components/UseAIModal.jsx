import axios from 'axios'
import '../style/UseAIModal.css'

export default function UseAIModal({ onClose, onMatchFinished, prompt, matchId }) {

    const SERVER_URL = 'http://localhost:8081';

    const getRecomendations = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/ai/recomendations`, { prompt: prompt }, { withCredentials: true });
            const objectResponse = JSON.parse(String(response.data).replace('```json', '').replace('```', ''));
            console.log(objectResponse);

            const teamRecomendations = objectResponse.equipo;
            const playerRecomendations = objectResponse.jugadores;

            console.log('Players: ', playerRecomendations);
            console.log('Team: ', teamRecomendations);

            return { teamRecomendations, playerRecomendations };
        } catch (error) {
            console.log('Error generating recomendations: ', error);
        }
    }

    const saveRecomendations = async (teamRecomendations) => {
        try {
            for (const [teamRecomendationArea, teamRecomendationDesc] of Object.entries(teamRecomendations)) {

                const teamRecomendationToSave = {
                    area: teamRecomendationArea,
                    description: teamRecomendationDesc,
                    match: {
                        id: matchId
                    }
                }

                await axios.post(`${SERVER_URL}/ai/recomendations/team`, teamRecomendationToSave, { withCredentials: true });
                console.log('Team recomendations saved');
            }
        } catch (error) {
            console.log('Error saving recomendations: ', error);
        }
    }

    const handleUseAI = async () => {
        document.getElementById("useAIText").innerHTML = 'Generando respuesta... Espera, por favor.'
        document.getElementById("useAIModalButtonsDiv").style.display = 'none';
        const recomendations = await getRecomendations();
        if (recomendations) {
            console.log(recomendations);
            await saveRecomendations(recomendations.teamRecomendations);
        }
        onClose();
    }

    return (
        <>
            <div id='useAIModalMainDiv'>
                <div id='useAIMainDiv'>
                    <div id='useAITextDiv'>
                        <p id='useAIText'>¿Quieres recibir recomendaciones de áreas a entrenar?</p>
                    </div>
                    <div id='useAIModalButtonsDiv'>
                        <button className='useAIModalButton' onClick={handleUseAI}>SI</button>
                        <button className='useAIModalButton' onClick={() => { [onClose(), onMatchFinished()] }}>NO</button>
                    </div>
                </div>
            </div>
        </>
    )
}