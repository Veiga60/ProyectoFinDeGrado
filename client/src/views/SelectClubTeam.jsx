import ClubTeam from "../components/ClubTeam";
import Header from "../components/Header";
import '../style/SelectClubTeam.css'

export default function SelectClubTeam() {
    return (
        <>
            <Header />
            <div id="selectClubTeamMainDiv">
                <div id="clubTeamsDiv">
                    <ClubTeam
                        description={'ÉLITE'}
                    />
                    <ClubTeam
                        description={'PLATA'}
                    />
                    <ClubTeam
                        description={'JÚNIOR'}
                    />
                    <ClubTeam
                        description={'JUVENIL'}
                    />
                    <ClubTeam
                        description={'INFANTIL'}
                    />
                    <ClubTeam
                        description={'ALEVÍN'}
                    />
                </div>
            </div>
        </>
    )
}