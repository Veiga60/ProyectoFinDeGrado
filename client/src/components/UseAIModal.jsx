import axios from 'axios'
import '../style/UseAIModal.css'
import SERVER_URL from '../config.js'

export default function UseAIModal({ onClose, onMatchFinished, prompt, matchId }) {

    const getRecomendations = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/ai/recomendations`, { prompt: prompt }, { withCredentials: true });
            const objectResponse = JSON.parse(String(response.data).replace('```json', '').replace('```', ''));

            const teamRecomendations = objectResponse.equipo;
            const playerRecomendations = Object.assign(objectResponse.jugadores, objectResponse.porteros);

            return { teamRecomendations, playerRecomendations };
        } catch (error) {
            console.log('Error generating recomendations: ', error);
        }
    }

    const saveRecomendations = async (teamRecomendations, playerRecomendations) => {
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
            }

            for (const [playerId, playerRecomendation] of Object.entries(playerRecomendations)) {
                for (const [playerRecomendationArea, playerRecomendationDesc] of Object.entries(playerRecomendation)) {
                    const playerRecomendationToSave = {
                        area: playerRecomendationArea,
                        description: playerRecomendationDesc,
                        player: {
                            id: playerId
                        },
                        match: {
                            id: matchId
                        }
                    }

                    await axios.post(`${SERVER_URL}/ai/recomendations/player`, playerRecomendationToSave, { withCredentials: true });
                }
            }
        } catch (error) {
            console.log('Error saving recomendations: ', error);
        }
    }

    const handleUseAI = async () => {
        document.getElementById("useAIText").innerHTML = 'Generando respuesta... Espera, por favor.'
        document.getElementById("useAIModalButtonsDiv").style.display = 'none';
        document.getElementById("useAIModalLastButtonsDiv").style.display = 'none';
        const recomendations = await getRecomendations();
        if (recomendations) {
            await saveRecomendations(recomendations.teamRecomendations, recomendations.playerRecomendations);
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
                        <button className='useAIModalButton' onClick={async () => { await handleUseAI(); onMatchFinished() }}>SI</button>
                        <button className='useAIModalButton' onClick={() => { onClose(); onMatchFinished() }}>NO</button>
                    </div>
                    <div id='useAIModalLastButtonsDiv'>
                        <button className='useAIModalButton' onClick={() => { onClose(); }}>VOLVER</button>
                    </div>
                </div>
            </div>
        </>
    )
}