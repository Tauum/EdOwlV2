package com.example.javaspringboot.Submissions.Service;

import com.example.javaspringboot.Submissions.Model.Statistics;
import com.example.javaspringboot.Submissions.Model.SubmittedHangman;
import com.example.javaspringboot.Submissions.Repository.SubmittedHangmanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class SubmittedHangmanService {
    private final SubmittedHangmanRepo submittedHangmanRepo;
    @Autowired
    public SubmittedHangmanService(SubmittedHangmanRepo hangmanSubmittedRepo) {
        this.submittedHangmanRepo = hangmanSubmittedRepo;
    }

    public List<SubmittedHangman> findAll() {
        return submittedHangmanRepo.findAll();
    }

    public SubmittedHangman findSubmittedHangmanById(Long id) {
        SubmittedHangman find = submittedHangmanRepo.findSubmittedHangmanById(id);
        if (find != null){return find;}
        return null;
    }

    public SubmittedHangman addSubmittedHangman(SubmittedHangman hangmanSubmitted) {
        return submittedHangmanRepo.save(hangmanSubmitted);
    }

    public SubmittedHangman updateSubmittedHangman(SubmittedHangman hangmanSubmitted) {
        return submittedHangmanRepo.save(hangmanSubmitted);
    }
    @Transactional
    public void deleteSubmittedHangman(Long id) {
        submittedHangmanRepo.deleteSubmittedHangmanById(id);
    }

    public List<SubmittedHangman> findAllByUserId(Long id) {
        return submittedHangmanRepo.findAllByUserIdOrderByGeneratedDateDesc(id);
    }

    public boolean patchRating(Boolean rating, Long id) {
        SubmittedHangman find = findSubmittedHangmanById(id);
        if ( find != null){
            find.setRating(rating);
            submittedHangmanRepo.save(find);
            return true;
        }
        return false;
    }

    public Statistics getStatisticsForUser(Long userId){
        List<SubmittedHangman> hangmen = findAllByUserId(userId);
        if (hangmen != null){
            Statistics statistics = new Statistics();
            List<Double>  score = new ArrayList<Double>();
            List<Double>  timeTaken = new ArrayList<Double>();
            List<Double>  origVal = new ArrayList<Double>();

            hangmen.forEach((hangman) -> {
                score.add((double) hangman.getScore());
                timeTaken.add((double) hangman.getTimeTaken());
//                origVal.add((double) hangman.getHangmanValue());
            });

            statistics.setTask("Hangman");
            statistics.setAmount(hangmen.size());
            statistics.setOrigValue(statistics.generateAvg(origVal));
            statistics.setAvgTime(statistics.generateAvg(timeTaken));
            statistics.setAvgScore(statistics.generateAvg(score));

            return statistics;
        }
        return null;
    }

//    public List<SubmittedHangman> findAllByHangmanTitle(String title) {
//        return submittedHangmanRepo.findAllByHangmanTitleContains(title);
//    }

}

