import { useEffect, useState } from 'react';
import '../style/ClubTeamSelector.css'

export default function ClubTeamSelector({ clubTeams, setClubTeamId }) {

    const [selectedClubTeam, setSelectedClubTeam] = useState();

    useEffect(() => {
        setSelectedClubTeam(clubTeams?.[0].code);
    }, []);

    return (
        <>
            <div id='clubTeamSelectorMainDiv'>
                {
                    clubTeams?.map((clubTeam, index) => {
                        return <div key={clubTeam.id} className={(clubTeam.code == selectedClubTeam) ? ((index == 0) ? 'clubTeamSelectorDivFirstSelected' : ((index == clubTeams.length - 1) ? 'clubTeamSelectorDivLastSelected' : 'clubTeamSelectorDivSelected')) : ((index == 0) ? 'clubTeamSelectorDivFirst' : ((index == clubTeams.length - 1) ? 'clubTeamSelectorDivLast' : 'clubTeamSelectorDiv'))} onClick={() => { setClubTeamId(clubTeam.id), setSelectedClubTeam(clubTeam.code) }}><p className={(clubTeam.code == selectedClubTeam) ? ('clubTeamSelectorTextSelected') : ('clubTeamSelectorText')}>{`${clubTeam.description}`}</p></div>
                    })
                }
            </div>
        </>
    )
}