import '../style/ClubTeamSelector.css'

export default function ClubTeamSelector({ clubTeams, setClubTeamId }) {
    return (
        <>
            <div id='clubTeamSelectorMainDiv'>
                {
                    clubTeams?.map((clubTeam, index) => {
                        return <div key={clubTeam.id} className={(index == 0) ? 'clubTeamSelectorDivFirst' : ((index == clubTeams.length - 1) ? 'clubTeamSelectorDivLast' : 'clubTeamSelectorDiv')} onClick={() => setClubTeamId(clubTeam.id)}><p className='clubTeamSelectorText'>{`${clubTeam.description}`}</p></div>
                    })
                }
            </div>
        </>
    )
}