import '../style/ClubTeam.css'
import logo from '../assets/images/tigre-transparente.png'

export default function ClubTeam({ description, isSelected, onClick }) {

    return (
        <>
            <div className={(isSelected) ? ("clubTeamMainDivSelected") : ("clubTeamMainDiv")} onClick={onClick}>
                <div className="clubTeamImageDiv">
                    <img src={logo} alt="Metropolitano HC" />
                </div>
                <div className='clubTeamDescDiv'>
                    <p className={(isSelected) ? ('clubTeamDescTextSelected') : ('clubTeamDescText')}>{description}</p>
                </div>
            </div>
        </>
    )
}