package com.example.javaspringboot.Submissions.Service;

import com.example.javaspringboot.Submissions.Model.Statistics;
import com.example.javaspringboot.Submissions.Model.SubmittedPropagate;
import com.example.javaspringboot.Submissions.Model.SubmittedQuiz;
import com.example.javaspringboot.Submissions.Repository.SubmittedQuizRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class SubmittedQuizService {
    private final SubmittedQuizRepo submittedQuizRepo;

    @Autowired
    public SubmittedQuizService(SubmittedQuizRepo SubmittedQuizRepository) {
        this.submittedQuizRepo = SubmittedQuizRepository;
    }

    public SubmittedQuiz addSubmittedQuiz(SubmittedQuiz quizSubmitted) { return submittedQuizRepo.save(quizSubmitted); }

    public List<SubmittedQuiz> findAll(){ return submittedQuizRepo.findAll(); }

    public SubmittedQuiz updateSubmittedQuiz(SubmittedQuiz quizSubmitted){ return submittedQuizRepo.save(quizSubmitted); }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteSubmittedQuiz(Long id) { submittedQuizRepo.deleteSubmittedQuizById(id);}

    public SubmittedQuiz findSubmittedQuizById(Long id)
    {
        SubmittedQuiz find = submittedQuizRepo.findSubmittedQuizById(id);
        if (find != null){return find;}
        return null;
    }

    public List<SubmittedQuiz> findAllByUserId(Long id) {
        return submittedQuizRepo.findAllByUserIdOrderByGeneratedDateDesc(id);
    }

    public List<SubmittedQuiz> findAllByQuizTitle(String title) {

        return submittedQuizRepo.findAllByQuizTitleContains(title);
    }

    public boolean patchRating(Boolean rating, Long id) {
        SubmittedQuiz find = findSubmittedQuizById(id);
        if ( find != null){
            find.setRating(rating);
            submittedQuizRepo.save(find);
            return true;
        }
        return false;
    }

    public Statistics getStatisticsForUser(Long userId) {
        List<SubmittedQuiz> quizzes = findAllByUserId(userId);
        if (quizzes != null) {
            Statistics statistics = new Statistics();
            List<Double> score = new ArrayList<Double>();
            List<Double> timeTaken = new ArrayList<Double>();
            List<Double> origVal = new ArrayList<Double>();

            quizzes.forEach((quiz) -> {
                score.add((double) quiz.getScore());
                timeTaken.add((double) quiz.getTimeTaken());
                origVal.add((double) quiz.quiz.getValue());
            });

            statistics.setTask("Quiz");
            statistics.setAmount(quizzes.size());
            statistics.setOrigValue(statistics.generateAvg(origVal));
            statistics.setAvgTime(statistics.generateAvg(timeTaken));
            statistics.setAvgScore(statistics.generateAvg(score));

            return statistics;
        }
        return null;
    }
}
