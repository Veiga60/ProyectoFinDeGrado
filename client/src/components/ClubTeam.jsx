import '../style/ClubTeam.css'
import logo from '../assets/images/tigre-transparente.png'

export default function ClubTeam({ description }) {
    return (
        <>
            <div className="clubTeamMainDiv">
                <div className="clubTeamImageDiv">
                    <img src={logo} alt="Metropolitano HC" />
                </div>
                <div className='clubTeamDescDiv'>
                    <p className='clubTeamDescText'>{description}</p>
                </div>
            </div>
        </>
    )
}