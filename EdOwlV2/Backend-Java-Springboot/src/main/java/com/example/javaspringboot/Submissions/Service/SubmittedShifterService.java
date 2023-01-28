package com.example.javaspringboot.Submissions.Service;

import com.example.javaspringboot.Submissions.Model.Statistics;
import com.example.javaspringboot.Submissions.Model.SubmittedShifter;
import com.example.javaspringboot.Submissions.Repository.SubmittedShifterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class SubmittedShifterService {
    private final SubmittedShifterRepo submittedShifterRepo;

    @Autowired
    public SubmittedShifterService(SubmittedShifterRepo submittedShifterRepository) {
        this.submittedShifterRepo = submittedShifterRepository;
    }

    public SubmittedShifter addSubmittedShifter(SubmittedShifter shifterSubmitted) { return submittedShifterRepo.save(shifterSubmitted); }

    public List<SubmittedShifter> findAll(){ return submittedShifterRepo.findAll(); }

    public SubmittedShifter updateSubmittedShifter(SubmittedShifter shifterSubmitted){ return submittedShifterRepo.save(shifterSubmitted); }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteSubmittedShifter(Long id) { submittedShifterRepo.deleteSubmittedShifterById(id);}

    public SubmittedShifter findSubmittedShifterById(Long id)
    {
        SubmittedShifter find = submittedShifterRepo.findSubmittedShifterById(id);
        if (find != null){return find;}
        return null;
    }

    public List<SubmittedShifter> findAllByUserId(Long id) {
        return submittedShifterRepo.findAllByUserIdOrderByGeneratedDateDesc(id);
    }

//    public List<SubmittedShifter> findAllByShifterTitle(String title) {
//        return submittedShifterRepo.findAllByShifterTitleContains(title);
//    }

    public boolean patchRating(Boolean rating, Long id) {
        SubmittedShifter find = findSubmittedShifterById(id);
        if ( find != null){
            find.setRating(rating);
            submittedShifterRepo.save(find);
            return true;
        }
        return false;
    }

    public Statistics getStatisticsForUser(Long userId) {

        List<SubmittedShifter> shifters = findAllByUserId(userId);
        if (shifters != null){
            Statistics statistics = new Statistics();
            List<Double>  score = new ArrayList<Double>();
            List<Double>  timeTaken = new ArrayList<Double>();
            List<Double>  origVal = new ArrayList<Double>();

            shifters.forEach((hangman) -> {
                score.add((double) hangman.getScore());
                timeTaken.add((double) hangman.getTimeTaken());
//                origVal.add((double) hangman.getShifterValue());
            });

            statistics.setTask("Shifteres");
            statistics.setAmount(shifters.size());
            statistics.setOrigValue(statistics.generateAvg(origVal));
            statistics.setAvgTime(statistics.generateAvg(timeTaken));
            statistics.setAvgScore(statistics.generateAvg(score));

            return statistics;
        }
        return null;
    }
}
