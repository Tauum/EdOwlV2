package com.example.javaspringboot.Submissions.Service;

import com.example.javaspringboot.Submissions.Model.Statistics;
import com.example.javaspringboot.Submissions.Model.SubmittedHangman;
import com.example.javaspringboot.Submissions.Model.SubmittedMatch;
import com.example.javaspringboot.Submissions.Repository.SubmittedMatchRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class SubmittedMatchService {
    private final SubmittedMatchRepo submittedMatchRepo;

    @Autowired
    public SubmittedMatchService(SubmittedMatchRepo SubmittedMatchRepository) {
        this.submittedMatchRepo = SubmittedMatchRepository;
    }

    public SubmittedMatch addSubmittedMatch(SubmittedMatch matchSubmitted) { return submittedMatchRepo.save(matchSubmitted); }

    public List<SubmittedMatch> findAll(){ return submittedMatchRepo.findAll(); }

    public SubmittedMatch updateSubmittedMatch(SubmittedMatch matchSubmitted){ return submittedMatchRepo.save(matchSubmitted); }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteSubmittedMatch(Long id) { submittedMatchRepo.deleteSubmittedMatchById(id);}

    public SubmittedMatch findSubmittedMatchById(Long id)
    {
        SubmittedMatch find = submittedMatchRepo.findSubmittedMatchById(id);
        if (find != null){return find;}
        return null;
    }

    public List<SubmittedMatch> findAllByUserId(Long id) {
        return submittedMatchRepo.findAllByUserIdOrderByGeneratedDateDesc(id);
    }

    public List<SubmittedMatch> findAllByMatchTitle(String title) {
        return submittedMatchRepo.findAllByMatchTitleContains(title);
    }

    public boolean patchRating(Boolean rating, Long id) {
        SubmittedMatch find = findSubmittedMatchById(id);
        if ( find != null){
            find.setRating(rating);
            submittedMatchRepo.save(find);
            return true;
        }
        return false;
    }

    public Statistics getStatisticsForUser(Long userId) {

        List<SubmittedMatch> matches = findAllByUserId(userId);
        if (matches != null){
            Statistics statistics = new Statistics();
            List<Double>  score = new ArrayList<Double>();
            List<Double>  timeTaken = new ArrayList<Double>();
            List<Double>  origVal = new ArrayList<Double>();

            matches.forEach((hangman) -> {
                score.add((double) hangman.getScore());
                timeTaken.add((double) hangman.getTimeTaken());
                origVal.add((double) hangman.getMatchValue());
            });

            statistics.setTask("Matches");
            statistics.setAmount(matches.size());
            statistics.setOrigValue(statistics.generateAvg(origVal));
            statistics.setAvgTime(statistics.generateAvg(timeTaken));
            statistics.setAvgScore(statistics.generateAvg(score));

            return statistics;
        }
        return null;
    }
}
