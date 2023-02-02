package com.example.javaspringboot.Submissions.Service;

import com.example.javaspringboot.Submissions.Model.SubmittedQuiz;
import com.example.javaspringboot.Submissions.Model.SubmittedSwipe;
import com.example.javaspringboot.Submissions.Repository.SubmittedSwipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class SubmittedSwipeService {
    private final SubmittedSwipeRepo submittedSwipeRepo;

    @Autowired
    public SubmittedSwipeService(SubmittedSwipeRepo SubmittedSwipeRepository) {
        this.submittedSwipeRepo = SubmittedSwipeRepository;
    }

    public SubmittedSwipe addSubmittedSwipe(SubmittedSwipe SwipeSubmitted) { return submittedSwipeRepo.save(SwipeSubmitted); }

    public List<SubmittedSwipe> findAll(){ return submittedSwipeRepo.findAll(); }

    public SubmittedSwipe updateSubmittedSwipe(SubmittedSwipe SwipeSubmitted){ return submittedSwipeRepo.save(SwipeSubmitted); }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteSubmittedSwipe(Long id) { submittedSwipeRepo.deleteSubmittedSwipeById(id);}

    public SubmittedSwipe findSubmittedSwipeById(Long id)
    {
        SubmittedSwipe find = submittedSwipeRepo.findSubmittedSwipeById(id);
        if (find != null){return find;}
        return null;
    }

    public List<SubmittedSwipe> findAllByUserId(Long id) {
        return submittedSwipeRepo.findAllByUserIdOrderByGeneratedDateDesc(id);
    }

    public boolean patchRating(Boolean rating, Long id) {
        SubmittedSwipe find = findSubmittedSwipeById(id);
        if ( find != null){
            find.setRating(rating);
            submittedSwipeRepo.save(find);
            return true;
        }
        return false;
    }
}
