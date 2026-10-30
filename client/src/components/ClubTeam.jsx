import { useClub } from '../context/ClubContext';
import '../style/ClubTeam.css'

export default function ClubTeam({ description, isSelected, onClick }) {

    const { club } = useClub();

    return (
        <>
            <div className={(isSelected) ? ("clubTeamMainDivSelected") : ("clubTeamMainDiv")} onClick={onClick}>
                <div className="clubTeamImageDiv">
                    <img src={`/logos/${club?.logo}`} alt="Metropolitano HC" />
                </div>
                <div className='clubTeamDescDiv'>
                    <p className={(isSelected) ? ('clubTeamDescTextSelected') : ('clubTeamDescText')}>{description}</p>
                </div>
            </div>
        </>
    )
}