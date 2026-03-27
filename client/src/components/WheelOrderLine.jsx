import '../style/WheelOrderLine.css'

export default function WheelOrderLine({ player, phoneNumber, wheelModel, wheelHardness, wheelSize, amount }) {
    return (
        <>
            <div id='wheelOrderMainDiv'>
                <div id='wheelOrderPlayerDiv' className='wheelOrderDiv'>
                    <p>{player?.name} {player?.lastName1} {player?.lastName2}</p>
                </div>
                <div id='wheelOrderPhoneNumberDiv' className='wheelOrderDiv'>
                    <p>{phoneNumber}</p>
                </div>
                <div id='wheelOrderWheelModelDiv' className='wheelOrderDiv'>
                    <p>{wheelModel?.description}</p>
                </div>
                <div id='wheelOrderWheelHardnessDiv' className='wheelOrderDiv'>
                    <p>{wheelHardness?.description}</p>
                </div>
                <div id='wheelOrderWheelSizeDiv' className='wheelOrderDiv'>
                    <p>{wheelSize?.description}</p>
                </div>
                <div id='wheelOrderAmountDiv' className='wheelOrderDiv'>
                    <p>{amount}</p>
                </div>
            </div>
        </>
    )
}