import { useState, useEffect, useContext } from 'react';
import ClubTeam from "../components/ClubTeam";
import Header from "../components/Header";
import '../style/SelectClubTeam.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import SERVER_URL from '../config.js'

export default function SelectClubTeam() {

    const { authenticatedUser } = useContext(AuthContext);
    const [clubTeams, setClubTeams] = useState([]);
    const [selectedClubTeams, setSelectedClubTeams] = useState([]);
    const navigate = useNavigate();

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

    const setCoachClubTeams = async () => {
        try {
            const response = await axios.put(`${SERVER_URL}/coaches/clubTeams?email=${authenticatedUser?.email}`, selectedClubTeams, { withCredentials: true });
            navigate("/home");
        } catch (error) {
            console.log('Error al actualizar las categorías del entrenador', error);
        }
    }

    useEffect(() => {
        getClubTeams();
        console.log(authenticatedUser);
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
                <button id='confirmSelectedClubTeamsButton' onClick={setCoachClubTeams}>CONFIRMAR</button>
            </div>
        </>
    )
}