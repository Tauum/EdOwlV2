package com.example.javaspringboot.Additional.Service;


import com.example.javaspringboot.Additional.Model.ContactForm;
import com.example.javaspringboot.Additional.Model.Feedback;
import com.example.javaspringboot.Additional.Repository.FeedbackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class FeedbackService {
    private final FeedbackRepo feedbackRepo;

    @Autowired
    public FeedbackService(FeedbackRepo feedbackRepository) {
        this.feedbackRepo = feedbackRepository;
    }

    public Feedback addFeedback(Feedback feedback) { return feedbackRepo.save(feedback); }

    public List<Feedback> findAll(){ return feedbackRepo.findAll(); }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteFeedback(Long id) { feedbackRepo.deleteFeedbackById(id);}

    public Feedback findFeedbackById(Long id) {

        Feedback find = feedbackRepo.findFeedbackById(id);
        if (find != null){return find;}
        return null;

    }

    public List<Feedback> findAllOrderByDate() {
        return feedbackRepo.findAllByOrderByGeneratedDate();
    }

    public Feedback updateFeedback(Long id, Feedback feedback) {
        Feedback find = findFeedbackById(id);
        if (find != null){
            try{
                if (feedback.getQuestion() != null && find.getQuestion() != feedback.getQuestion()){
                    find.setQuestion(feedback.getQuestion());
                }
            }
            catch (Exception e){}

            try{
                if (feedback.getLifetime() != null && find.getLifetime() != feedback.getLifetime()){
                    find.setLifetime(feedback.getLifetime());
                }
            }
            catch (Exception e){}

            try{
                if (feedback.getFeedbackType() != null && find.getFeedbackType() != feedback.getFeedbackType()){
                    find.setFeedbackType(feedback.getFeedbackType());
                }
            }
            catch (Exception e){}
        }
        return null;
    }
}