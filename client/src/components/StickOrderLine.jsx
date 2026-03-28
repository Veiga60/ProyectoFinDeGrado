import '../style/StickOrderLine.css'

export default function StickOrderLine({ player, phoneNumber, stickModel, stickLength, stickWeight, stickSide, stickBlade, stickFlex, stickKickpoint, stickGrip, amount, nametag }) {
    return (
        <>
            <div id='stickOrderMainDiv'>
                <div id='stickOrderPlayerDiv' className='stickOrderDiv'>
                    <p>{player?.name} {player?.lastName1} {player?.lastName2}</p>
                </div>
                <div id='stickOrderPhoneNumberDiv' className='stickOrderDiv'>
                    <p>{phoneNumber}</p>
                </div>
                <div id='stickOrderStickModelDiv' className='stickOrderDiv'>
                    <p>{stickModel?.description}</p>
                </div>
                <div id='stickOrderStickLengthDiv' className='stickOrderDiv'>
                    <p>{stickLength?.description}</p>
                </div>
                <div id='stickOrderStickWeightDiv' className='stickOrderDiv'>
                    <p>{stickWeight?.description}</p>
                </div>
                <div id='stickOrderStickSideDiv' className='stickOrderDiv'>
                    <p>{stickSide}</p>
                </div>
                <div id='stickOrderStickBladeDiv' className='stickOrderDiv'>
                    <p>{stickBlade?.description}</p>
                </div>
                <div id='stickOrderStickFlexDiv' className='stickOrderDiv'>
                    <p>{stickFlex?.description}</p>
                </div>
                <div id='stickOrderStickKickpointDiv' className='stickOrderDiv'>
                    <p>{stickKickpoint?.description}</p>
                </div>
                <div id='stickOrderStickGripDiv' className='stickOrderDiv'>
                    <p>{stickGrip?.description}</p>
                </div>
                <div id='stickOrderAmountDiv' className='stickOrderDiv'>
                    <p>{amount}</p>
                </div>
                <div id='stickOrderStickNametagDiv' className='stickOrderDiv'>
                    <p>{nametag}</p>
                </div>
            </div>
        </>
    )
}