import '../style/CreateDebateModal.css'

export default function CreateDebateModal({ createDebate, onClose, setTitle }) {
    return (
        <>
            <div id='createDebateModalMainDiv'>
                <div id='createDebateMainDiv'>
                    <div id='createDebate'>
                        <p id='createDebateText'>NUEVO DEBATE</p>
                    </div>
                    <input type="text" placeholder='Título' id="debateTitle" onChange={(e) => { setTitle(e.target.value) }} />
                    <button onClick={() => [createDebate(), onClose(), window.location.reload()]}>CREAR</button>
                    <button onClick={() => onClose()}>CERRAR</button>
                </div>
            </div >
        </>
    )
}