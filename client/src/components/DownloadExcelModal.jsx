import '../style/DownloadExcelModal.css'

export default function DownloadExcelModal({ onClose }) {


    return (
        <>
            <div id='downloadExcelModalMainDiv'>
                <div id='downloadExcelMainDiv'>
                    <div id='downloadExcel'>
                        <p id='downloadExcelErrorText'>ERROR</p>
                    </div>
                    <div id='downloadExcelText'>
                        <p>Descarga el fichero Excel antes de crear un nuevo pedido.</p>
                    </div>
                    <button onClick={() => onClose()}>CERRAR</button>
                </div>
            </div >
        </>
    )
}