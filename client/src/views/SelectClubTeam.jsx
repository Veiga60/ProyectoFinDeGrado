import { useState } from 'react';
import ClubTeam from "../components/ClubTeam";
import Header from "../components/Header";
import '../style/SelectClubTeam.css'

export default function SelectClubTeam() {
    const [selectedClubTeams, setSelectedClubTeams] = useState([]);

    const toggleClubTeam = (teamName) => {
        setSelectedClubTeams((prevSelectedClubTeams) => {
            if (prevSelectedClubTeams.includes(teamName)) {
                return prevSelectedClubTeams.filter((t) => t !== teamName);
            } else {
                return [...prevSelectedClubTeams, teamName];
            }
        });
    };

    const teams = ['ÉLITE', 'PLATA', 'JÚNIOR', 'JUVENIL', 'INFANTIL', 'ALEVÍN'];

    return (
        <>
            <Header />
            <div id="selectClubTeamMainDiv">
                <div id="clubTeamsDiv">
                    {teams.map((teamName) => (
                        <ClubTeam
                            key={teamName}
                            description={teamName}
                            isSelected={selectedClubTeams.includes(teamName)}
                            onClick={() => toggleClubTeam(teamName)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}