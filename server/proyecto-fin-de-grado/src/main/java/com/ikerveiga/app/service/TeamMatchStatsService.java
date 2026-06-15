package com.ikerveiga.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ikerveiga.app.dao.MatchRepository;
import com.ikerveiga.app.dao.TeamMatchStatsRepository;
import com.ikerveiga.app.entity.Match;
import com.ikerveiga.app.entity.TeamMatchStats;

@Service
public class TeamMatchStatsService {

    private TeamMatchStatsRepository teamMatchStatsDAO;
    private MatchRepository matchDAO;

    @Autowired
    public TeamMatchStatsService(TeamMatchStatsRepository teamMatchStatsDAO, MatchRepository matchDAO) {
        this.teamMatchStatsDAO = teamMatchStatsDAO;
        this.matchDAO = matchDAO;
    }

    public void saveTeamMatchStats(int powerPlayGoals, int powerPlayNoGoals, int penaltyKillGoals,
            int penaltyKillNoGoals, int oneVsZero, int oneVsOne,
            int twoVsOne, int twoVsTwo, int threeVsOne, int threeVsTwo,
            long matchId) {
        TeamMatchStats existingTeamMatchStats = teamMatchStatsDAO.findByMatchId(matchId);
        Match match = matchDAO.findById(matchId);

        if (match == null) {
            throw new RuntimeException("Match not found");
        }

        if (existingTeamMatchStats == null) {
            TeamMatchStats teamMatchStats = new TeamMatchStats(null, false, 0, 0, match, powerPlayGoals,
                    powerPlayNoGoals, penaltyKillGoals, penaltyKillNoGoals,
                    oneVsZero,
                    oneVsOne, twoVsOne, twoVsTwo,
                    threeVsOne, threeVsTwo);

            teamMatchStatsDAO.save(teamMatchStats);
        } else {
            existingTeamMatchStats.setPowerPlayGoals(powerPlayGoals);
            existingTeamMatchStats.setPowerPlayNoGoals(powerPlayNoGoals);
            existingTeamMatchStats.setPenaltyKillGoals(penaltyKillGoals);
            existingTeamMatchStats.setPenaltyKillNoGoals(penaltyKillNoGoals);
            existingTeamMatchStats.setOneVsZero(oneVsZero);
            existingTeamMatchStats.setOneVsOne(oneVsOne);
            existingTeamMatchStats.setTwoVsOne(twoVsOne);
            existingTeamMatchStats.setTwoVsTwo(twoVsTwo);
            existingTeamMatchStats.setThreeVsOne(threeVsOne);
            existingTeamMatchStats.setThreeVsTwo(threeVsTwo);

            teamMatchStatsDAO.save(existingTeamMatchStats);
        }
    }

    public TeamMatchStats getTeamMatchStats(long matchId) {
        TeamMatchStats teamMatchStats = teamMatchStatsDAO.findByMatchId(matchId);
        Match match = matchDAO.findById(matchId);

        if (teamMatchStats == null) {
            return new TeamMatchStats(null, false, 0, 0, match, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }

        System.out.println(teamMatchStats.toString());

        return teamMatchStats;
    }
}
