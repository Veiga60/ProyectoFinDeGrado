import { useNavigate } from 'react-router-dom'
import '../style/StartMatchModal.css'

export default function StartMatchModal({ onClose, matchId }) {

    const navigate = useNavigate();

    return (
        <>
            <div id='startMatchModalMainDiv'>
                <div id='startMatchModal'>
                    <div id='startMatchModalTitleDiv'>
                        <p id='startMatchModalTitleText'>¿DESEAS EMPEZAR EL PARTIDO?</p>
                    </div>
                    <div id='startMatchModalContentDiv'>
                        <p id='startMatchModalContentText'>No podrás volver hasta finalizarlo</p>
                    </div>
                    <div id='startMatchModalButtonsDiv'>
                        <button className='startMatchModalButton' onClick={() => { navigate(`/matches/${matchId}/start_match`); onClose(); }}>EMPEZAR</button>
                        <button className='startMatchModalButton' onClick={() => onClose()}>VOLVER</button>
                    </div>
                </div>
            </div >
        </>
    )
}