import '../style/ClubTeamSelector.css'

export default function ClubTeamSelector({ clubTeams }) {
    return (
        <>
            <div id='clubTeamSelectorMainDiv'>
                {
                    clubTeams.map((clubTeam, index) => {
                        console.log(clubTeam.description);
                        return <div key={clubTeam.id} className={(index == 0) ? 'clubTeamSelectorDivFirst' : ((index == clubTeams.length - 1) ? 'clubTeamSelectorDivLast' : 'clubTeamSelectorDiv')}><p className='clubTeamSelectorText'>{`${clubTeam.description}`}</p></div>
                    })
                }
            </div>
        </>
    )
}