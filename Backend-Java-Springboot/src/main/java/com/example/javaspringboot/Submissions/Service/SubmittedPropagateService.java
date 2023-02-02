package com.example.javaspringboot.Submissions.Service;

import com.example.javaspringboot.Submissions.Model.SubmittedMatch;
import com.example.javaspringboot.Submissions.Model.SubmittedPropagate;
import com.example.javaspringboot.Submissions.Model.SubmittedQuiz;
import com.example.javaspringboot.Submissions.Repository.SubmittedPropagateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class SubmittedPropagateService {
    private final SubmittedPropagateRepo submittedPropagateRepo;

    @Autowired
    public SubmittedPropagateService(SubmittedPropagateRepo SubmittedPropagateRepository) {
        this.submittedPropagateRepo = SubmittedPropagateRepository;
    }

    public SubmittedPropagate addSubmittedPropagate(SubmittedPropagate PropagateSubmitted) { return submittedPropagateRepo.save(PropagateSubmitted); }

    public List<SubmittedPropagate> findAll(){ return submittedPropagateRepo.findAll(); }

    public SubmittedPropagate updateSubmittedPropagate(SubmittedPropagate PropagateSubmitted){ return submittedPropagateRepo.save(PropagateSubmitted); }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteSubmittedPropagate(Long id) { submittedPropagateRepo.deleteSubmittedPropagateById(id);}

    public SubmittedPropagate findSubmittedPropagateById(Long id)
    {
        SubmittedPropagate find = submittedPropagateRepo.findSubmittedPropagateById(id);
        if (find != null){return find;}
        return null;
    }

    public List<SubmittedPropagate> findAllByUserId(Long id) {
        return submittedPropagateRepo.findAllByUserIdOrderByGeneratedDateDesc(id);
    }

    public boolean patchRating(Boolean rating, Long id) {
        SubmittedPropagate find = findSubmittedPropagateById(id);
        if ( find != null){
            find.setRating(rating);
            submittedPropagateRepo.save(find);
            return true;
        }
        return false;
    }
}
