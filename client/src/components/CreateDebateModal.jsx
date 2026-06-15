import '../style/CreateDebateModal.css'

export default function CreateDebateModal({ createDebate, onClose, setTitle }) {
    return (
        <>
            <div id='createDebateModalMainDiv'>
                <div id='createDebateMainDiv'>
                    <div id='createDebate'>
                        <p id='createDebateText'>NUEVO DEBATE</p>
                    </div>
                    <div id='createDebateInputDiv'>
                        <input className='createDebateInput' type="text" placeholder='Título' id="debateTitle" onChange={(e) => { setTitle(e.target.value) }} />
                    </div>
                    <div id='createDebateButtonsDiv'>
                        <button className='createDebateModalButton' onClick={async () => { await createDebate(); await onClose(); window.location.reload() }}>CREAR</button>
                        <button className='createDebateModalButton' onClick={() => onClose()}>CERRAR</button>
                    </div>
                </div>
            </div >
        </>
    )
}