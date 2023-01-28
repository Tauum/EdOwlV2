package com.example.javaspringboot.Activities.Service;


import com.example.javaspringboot.Activities.Model.Quiz;
import com.example.javaspringboot.Activities.Model.Swipe;
import com.example.javaspringboot.Activities.Model.SwipeCard;
import com.example.javaspringboot.Activities.Repository.SwipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class SwipeService {
    private final SwipeRepo SwipeRepo;

    @Autowired
    public SwipeService(SwipeRepo SwipeRepository) {
        this.SwipeRepo = SwipeRepository;
    }

    public Swipe addSwipe(Swipe Swipe)
    {
        return SwipeRepo.save(Swipe);
    }

    public List<Swipe> findAll(){ return SwipeRepo.findAll(); }
    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteSwipe(Long id) { SwipeRepo.deleteSwipeById(id);}

    public Swipe updateSwipe(Swipe attempt) {
        Swipe find = findSwipeById(attempt.getId());
        if (find != null) {
            find.setGeneral(attempt.getTitle(), attempt.getValue(),attempt.isHidden(),attempt.getSubject(), attempt.getDescription(), attempt.getEndContent());

            ArrayList<SwipeCard> remC = new ArrayList<>();
            ArrayList<SwipeCard> addC = new ArrayList<>();

            // this is for updating questions
            for(SwipeCard attemptCurC: attempt.cards){
                for (SwipeCard findCurC : find.cards){
                    if (attemptCurC.getId()!= null ) {
                        if (attemptCurC.getId().equals(findCurC.getId())) {
                            findCurC.setGeneral(attemptCurC.getValue(), attemptCurC.getQuestion(), attemptCurC.getSubText(),attemptCurC.getImageURL(), attemptCurC.getExplaination(), attemptCurC.getCorrect());
                        }
                    }
                    else{ if (!addC.contains(attemptCurC)) { addC.add(attemptCurC); } } // double condition to prevent being added twice
                }
            }
            // this is for removing a question that no longer exists
            for(SwipeCard findCurC: find.cards ){
                boolean qExists = false;
                for (SwipeCard attemptCurC : attempt.cards){
                    if (attemptCurC.getId() == null) {  qExists = true; }
                    else{  if (findCurC.getId().equals(attemptCurC.getId())) { qExists = true; }  } // double condition to prevent being added twice
                }
                if (!qExists && !remC.contains(findCurC)) { remC.add(findCurC); } // double condition to prevent being added twice
            }
            find.cards.addAll(addC);
            find.cards.removeAll(remC);
            SwipeRepo.save(find);
        }
        return find;
    }



    public Swipe findSwipeById(Long id)
    {
        Swipe find = SwipeRepo.findSwipeById(id);
        if (find != null){return find;}
        return null;
    }

    public List<Swipe> findAllOrderByGeneratedDateDesc() {
        return SwipeRepo.findAllByOrderByGeneratedDateDesc();
    }

    public List<Swipe> findAllOrderByGeneratedDateDescAndNotHidden() {
        return SwipeRepo.findAllByHiddenOrderByGeneratedDateDesc(false);
    }

    public Swipe findSwipeOrderByGeneratedDateDescNotHidden() {
        return SwipeRepo.findFirstByHiddenOrderByIdDesc(false);
    }
    public List<Swipe> findAllWithoutModule() {
        return SwipeRepo.findAllByModuleCodeIsNull();
    }
}

