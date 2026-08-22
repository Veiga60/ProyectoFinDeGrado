import { useState, useEffect } from 'react';
import ClubTeam from "../components/ClubTeam";
import Header from "../components/Header";
import '../style/SelectClubTeam.css'
import axios from 'axios'

export default function SelectClubTeam() {

    const SERVER_URL = 'http://localhost:8081'
    const [clubTeams, setClubTeams] = useState([]);
    const [selectedClubTeams, setSelectedClubTeams] = useState([]);

    const toggleClubTeam = (clubTeam) => {
        setSelectedClubTeams((prevSelectedClubTeams) => {
            if (prevSelectedClubTeams.includes(clubTeam)) {
                return prevSelectedClubTeams.filter((c) => c !== clubTeam);
            } else {
                return [...prevSelectedClubTeams, clubTeam];
            }
        });
    };

    const getClubTeams = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/clubTeams/all`, { withCredentials: true });
            setClubTeams(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('Error recuperando categorías', error);
        }
    }

    useEffect(() => {
        getClubTeams();
    }, []);

    return (
        <>
            <Header />
            <div id="selectClubTeamMainDiv">
                <div id="clubTeamsDiv">
                    {clubTeams.map((clubTeam) => (
                        <ClubTeam
                            key={clubTeam.id}
                            description={clubTeam.description}
                            isSelected={selectedClubTeams.includes(clubTeam.code)}
                            onClick={() => toggleClubTeam(clubTeam.code)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}