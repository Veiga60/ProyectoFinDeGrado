import Header from '../components/Header.jsx'
import Match from '../components/Match.jsx'
import MatchCompressed from '../components/MatchCompressed.jsx'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import coachHomePhoto from '../assets/images/coachHomePhoto.png'
import '../style/Home.css'
import basicLogo from '../assets/images/basicLogo.png'
import basicUser from '../assets/images/basicUser.png'
import StartMatchModal from '../components/StartMatchModal.jsx'
import ClubTeamSelector from '../components/ClubTeamSelector.jsx'
import { AuthContext } from '../components/AuthContext.jsx'
import SERVER_URL from '../config.js'

export default function Home() {
    const navigate = useNavigate();

    const { authenticatedUser } = useContext(AuthContext);
    const [clubTeamId, setClubTeamId] = useState();
    const [nextMatch, setNextMatch] = useState();
    const [width, setWidth] = useState(window.innerWidth);

    const [lastPlayedMatch, setLastPlayedMatch] = useState(null);
    const [lastPlayedMatchPlayerMatchStats, setLastPlayedMatchPlayerMatchStats] = useState();
    const [lastPlayedMatchGoalieMatchStats, setLastPlayedMatchGoalieMatchStats] = useState();

    const [nextMatchAvailable, setNextMatchAvailable] = useState(false);
    const [statsAvailable, setStatsAvailable] = useState(false);
    const [recomendationsAvailable, setRecomendationsAvailable] = useState(false);

    const [showStartMatchModal, setShowStartMatchModal] = useState(false);

    const getNextMatch = async () => {
        try {
            console.log(`${SERVER_URL}/matches/next/clubTeam/${clubTeamId}`);
            const response = await axios.get(`${SERVER_URL}/matches/next/clubTeam/${clubTeamId}`, { withCredentials: true });
            setNextMatch(response.data[0]);
            setNextMatchAvailable(true);
        } catch (error) {
            setNextMatchAvailable(false);
            console.log('Error fetching next match: ', error);
        }
    }

    const getLastPlayedMatch = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/matches/lastPlayedWithRecomendations`, { withCredentials: true });
            setLastPlayedMatch(response.data);
            setRecomendationsAvailable(true);
        } catch (error) {
            setRecomendationsAvailable(false);
        }
    }

    const getLastPlayedMatchPlayerMatchStats = async (playerId) => {
        try {
            const response = await axios.get(`${SERVER_URL}/playersMatchStats/matches/lastPlayed/players/${playerId}`, { withCredentials: true })
            setLastPlayedMatchPlayerMatchStats(response.data);
            setStatsAvailable(true);
        } catch (error) {
            setStatsAvailable(false);
        }
    }

    const getLastPlayedMatchGoalieMatchStats = async (playerId) => {
        try {
            const response = await axios.get(`${SERVER_URL}/playersMatchStats/matches/lastPlayed/goalies/${playerId}`, { withCredentials: true })
            setLastPlayedMatchGoalieMatchStats(response.data);
            setStatsAvailable(true);
        } catch (error) {
            setStatsAvailable(false);
        }
    }

    const toggleStartMatchModal = () => {
        setShowStartMatchModal(!showStartMatchModal);
    }

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (clubTeamId) {
            getNextMatch();
        }
    }, [clubTeamId]);

    useEffect(() => {
        if (!authenticatedUser) return;

        const defaultClubTeams = authenticatedUser?.isCoach
            ? authenticatedUser?.coach?.clubTeams
            : authenticatedUser?.player?.clubTeams;
        if (defaultClubTeams?.length > 0 && !clubTeamId) {
            setClubTeamId(defaultClubTeams[0].id);
        }

        if (authenticatedUser?.isCoach == true) {
            getLastPlayedMatch();
        } else {
            if (authenticatedUser?.player?.playerType == "RINK_PLAYER") {
                getLastPlayedMatchPlayerMatchStats(authenticatedUser?.player?.id);
            } else if (authenticatedUser?.player?.playerType == "GOALIE") {
                getLastPlayedMatchGoalieMatchStats(authenticatedUser?.player?.id);
            }
        }
    }, [authenticatedUser]);

    return (
        <>
            <Header />
            {
                ((authenticatedUser?.coach?.clubTeams?.length > 1) || (authenticatedUser?.player?.clubTeams?.length > 1)) && (
                    <ClubTeamSelector
                        clubTeams={(authenticatedUser?.isCoach == true) ? (authenticatedUser?.coach?.clubTeams) : (authenticatedUser?.player?.clubTeams)}
                        setClubTeamId={setClubTeamId}
                    />
                )
            }
            {(authenticatedUser != null) &&
                <div id='homePageContentDiv'>
                    <div id='leftDiv'>
                        <div id='greetingDiv'>
                            <div id='greetingTextDiv'>
                                <p id='greetingText'>¡Bienvenido, {authenticatedUser.username}!</p>
                            </div>
                            <div id='playerImageDiv'>
                                {
                                    (authenticatedUser.isCoach == false) ? (<img id='playerImage' src={authenticatedUser.player?.photo ? `/players/${authenticatedUser.player?.photo}` : basicUser} alt={`${authenticatedUser.player?.name} ${authenticatedUser.player?.lastName1} ${authenticatedUser.player?.lastName2}`} />) : (<img id='coachImage' src={coachHomePhoto} alt="coachHomePhoto" />)
                                }
                            </div>
                        </div>
                        <div id='nextMatchDiv'>
                            <div id='nextMatchAndTextDiv'>
                                <div id='nextMatchTextDiv'>
                                    <p id='nextMatchText'>Próximo partido</p>
                                </div>
                                <div id='nextMatchAndButtonDiv'>
                                    {
                                        (nextMatchAvailable) ? (nextMatch && (
                                            (width < 700)
                                                ? (<MatchCompressed match={nextMatch} />)
                                                : (<Match match={nextMatch} />)
                                        )) :
                                            (<div id='notNextMatchDiv'>
                                                <p id='notNextMatchText'>No hay próximo partido</p>
                                            </div>)
                                    }
                                    {(authenticatedUser.isCoach == true) &&
                                        (
                                            <div id='startMatchDiv'>
                                                <button id='startMatchButton' onClick={() => toggleStartMatchModal()}>EMPEZAR PARTIDO</button>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        (authenticatedUser.isCoach == true) ? (
                            <div id='rightDiv'>
                                <div id='recomendationsDiv'>
                                    <p id='recomendationsText'>Recomendaciones</p>
                                    {
                                        (recomendationsAvailable == true) ? (
                                            <div id='recomendations' onClick={() => { navigate(`/recomendations/matches/${lastPlayedMatch.id}`, { match: lastPlayedMatch }) }}>
                                                <p id='seeRecomendationsText'>Ver recomendaciones del partido:</p>
                                                <div id='lastPlayedMatchDiv'>
                                                    <img id='lastPlayedMatchLocalTeamImage' src={lastPlayedMatch?.localTeam?.logo ? `/logos/${lastPlayedMatch?.localTeam?.logo}` : basicLogo} alt={`${lastPlayedMatch?.localTeam?.name}`} />
                                                    <p id='lastPlayedMatchVersusText'>VS</p>
                                                    <img id='lastPlayedMatchVisitingTeamImage' src={lastPlayedMatch?.visitingTeam?.logo ? `/logos/${lastPlayedMatch?.visitingTeam?.logo}` : basicLogo} alt={`${lastPlayedMatch?.visitingTeam?.name}`} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div id='noRecomendationsDiv'>
                                                <p id='noRecomendationsAvailable'>No hay recomendaciones disponibles</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        ) : (
                            <div id='notCoachRightDiv'>
                                <p id='lastMatchText'>ÚLTIMO PARTIDO</p>
                                <div id='lastMatchPlayerMatchStatsDiv'>
                                    <div id='lastMatchDiv'>
                                        {
                                            (statsAvailable == true) ? (
                                                (authenticatedUser.player.playerType == 'RINK_PLAYER') ? (
                                                    <>
                                                        <img id='lastMatchLocalTeamImage' src={lastPlayedMatchPlayerMatchStats?.match?.localTeam?.logo ? `/logos/${lastPlayedMatchPlayerMatchStats?.match?.localTeam?.logo}` : basicLogo} alt={lastPlayedMatchPlayerMatchStats?.match?.localTeam?.name} />
                                                        <p id='lastMatchSeparator'>VS</p>
                                                        <img id='lastMatchVisitingTeamImage' src={lastPlayedMatchPlayerMatchStats?.match?.visitingTeam?.logo ? `/logos/${lastPlayedMatchPlayerMatchStats?.match?.visitingTeam?.logo}` : basicLogo} alt={lastPlayedMatchPlayerMatchStats?.match?.visitingTeam?.name} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <img id='lastMatchLocalTeamImage' src={lastPlayedMatchGoalieMatchStats?.match?.localTeam?.logo ? `/logos/${lastPlayedMatchGoalieMatchStats?.match?.localTeam?.logo}` : basicLogo} alt={lastPlayedMatchGoalieMatchStats?.match?.localTeam?.name} />
                                                        <p id='lastMatchSeparator'>VS</p>
                                                        <img id='lastMatchVisitingTeamImage' src={lastPlayedMatchGoalieMatchStats?.match?.visitingTeam?.logo ? `/logos/${lastPlayedMatchGoalieMatchStats?.match?.visitingTeam?.logo}` : basicLogo} alt={lastPlayedMatchGoalieMatchStats?.match?.visitingTeam?.name} />
                                                    </>
                                                )
                                            ) : (
                                                <></>
                                            )
                                        }
                                    </div>
                                    <div id={statsAvailable ? 'lastMatchPlayerStats' : 'noStatsAvailable'}>
                                        {
                                            (statsAvailable == true) ? (
                                                (authenticatedUser.player.playerType == 'RINK_PLAYER') ? (
                                                    <>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchPlayerMatchStats?.goals}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>GOLES</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchPlayerMatchStats?.assists}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>ASISTENCIAS</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{(Number(lastPlayedMatchPlayerMatchStats?.goals) + Number(lastPlayedMatchPlayerMatchStats?.assists)) || 0}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>PUNTOS</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchPlayerMatchStats?.plusMinus}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>+/-</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchPlayerMatchStats?.shots}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>TIROS</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchPlayerMatchStats?.recoveredPucks}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>PUCKS RECUPERADOS</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchPlayerMatchStats?.lostPucks}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>PUCKS PERDIDOS</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchPlayerMatchStats?.goodPasses}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>PASES DETERMINANTES</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchPlayerMatchStats?.badPasses}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>PASES FALLADOS</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchPlayerMatchStats?.penaltyMins}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>MINUTOS SANCIÓN</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchPlayerMatchStats?.penaltyShotGoals}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>PENALTIS METIDOS</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchPlayerMatchStats?.penaltyShotMisses}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>PENALTIS FALLADOS</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{(lastPlayedMatchGoalieMatchStats?.shotsReceived > 0) ? ((Number(lastPlayedMatchGoalieMatchStats?.shotsReceived) - Number(lastPlayedMatchGoalieMatchStats?.goalsReceived)) / Number(lastPlayedMatchGoalieMatchStats?.shotsReceived)).toFixed(3) : '-'}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>% PARADAS</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchGoalieMatchStats?.shotsReceived}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>TIROS RECIBIDOS</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchGoalieMatchStats?.goalsReceived}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>GOLES RECIBIDOS</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchGoalieMatchStats?.penaltyMins}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>MINUTOS DE SANCIÓN</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchGoalieMatchStats?.penaltyShotGoals}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>PENALTIS ENCAJADOS</p>
                                                        </div>
                                                        <div className='playerStat'>
                                                            <div className='playerStatDiv'>
                                                                <p className='playerStatText'>{lastPlayedMatchGoalieMatchStats?.penaltyShotSaves}</p>
                                                            </div>
                                                            <p className='playerStatsTitle'>PENALTIS PARADOS</p>
                                                        </div>
                                                    </>
                                                )
                                            ) : (
                                                <p id='noStatsText'>No están disponibles las estadísticas del último partido</p>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            }
            {
                (showStartMatchModal) && (
                    <StartMatchModal
                        matchId={nextMatch.id}
                        onClose={() => setShowStartMatchModal(false)}
                    />
                )
            }
        </>
    )
}