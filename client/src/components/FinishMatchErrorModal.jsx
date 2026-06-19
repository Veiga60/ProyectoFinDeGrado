import '../style/FinishMatchErrorModal.css'

export default function FinishMatchErrorModal({ onClose }) {


    return (
        <>
            <div id='finishMatchErrorModalMainDiv'>
                <div id='finishMatchErrorMainDiv'>
                    <div id='finishMatchError'>
                        <p id='finishMatchErrorText'>ERROR</p>
                    </div>
                    <div id='finishMatchErrorTextDiv'>
                        <p id='finishMatchErrorTextDesc'>No es posible finalizar el partido en el periodo 1 o si el partido está empatado.</p>
                    </div>
                    <button className='finishMatchErrorButton' onClick={() => onClose()}>CERRAR</button>
                </div>
            </div >
        </>
    )
}