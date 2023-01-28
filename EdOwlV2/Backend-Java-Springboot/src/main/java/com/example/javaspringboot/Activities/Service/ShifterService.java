package com.example.javaspringboot.Activities.Service;


import com.example.javaspringboot.Activities.Model.Definition;
import com.example.javaspringboot.Activities.Model.Shifter;
import com.example.javaspringboot.Activities.Repository.ShifterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShifterService {
    private final ShifterRepo shifterRepo;

    @Autowired
    public ShifterService(ShifterRepo shifterRepository) {
        this.shifterRepo = shifterRepository;
    }

    public List<Shifter> findAllWithoutModule() {
        return shifterRepo.findAllByModuleCodeIsNull();
    }

    public Shifter addShifter(Shifter shifter)
    {
        return shifterRepo.save(shifter);
    }

    public List<Shifter> findAll(){ return shifterRepo.findAll(); }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteShifter(Long id) { shifterRepo.deleteShifterById(id);}

    // rework this from quiz to update shifter
    @Transactional
    public Shifter updateShifter(Shifter attempt) {
        Shifter find = findShifterById(attempt.getId());
            if (find != null) {
                // create set general for shifter
                find.setGeneral(attempt.getTitle(),attempt.getValue(),attempt.isHidden(),attempt.getSubject(), attempt.getEndContent(), attempt.getDescription());

                ArrayList<Definition> remD = new ArrayList<>();
                ArrayList<Definition> addD = new ArrayList<>();

                // this is for updating definitions
                for(Definition attemptCurD: attempt.definitions){
                    for (Definition findCurD : find.definitions){
                        if (attemptCurD.getId()!= null ) {
                            if (attemptCurD.getId().equals(findCurD.getId())) {
                                findCurD.setGeneral(attemptCurD.getTitle(), attemptCurD.getAnswer(), attemptCurD.getExplaination(), attemptCurD.getValue());
                            }
                        }
                        else{ if (!addD.contains(attemptCurD)) { addD.add(attemptCurD); } } // double condition to prevent being added twice
                    }
                }
                // this is for removing a definition that no longer exists
                for(Definition findCurD: find.definitions ){
                    boolean qExists = false;
                    for (Definition attemptCurD : attempt.definitions){
                        if (attemptCurD.getId() != null) {
                            if (findCurD.getId().equals(attemptCurD.getId())) { qExists = true; }// double condition to prevent being added twice
                        }
                    }
                    if (!qExists && !remD.contains(findCurD)) { remD.add(findCurD); } // double condition to prevent being added twice
                }
                find.definitions.addAll(addD);
                find.definitions.removeAll(remD);
                shifterRepo.save(find);
            }
        return find;
    }

    public Shifter findShifterById(Long id)
    {
        Shifter find = shifterRepo.findShifterById(id);
        if (find != null){return find;}
        return null;
    }

    public List<Shifter> findAllOrderByGeneratedDateDesc() {
        return shifterRepo.findAllByOrderByGeneratedDateDesc();
    }

    public List<Shifter> findAllOrderByGeneratedDateDescAndNotHidden() {
        return shifterRepo.findAllByHiddenOrderByGeneratedDateDesc(false);
    }

    public Shifter findShifterOrderByGeneratedDateDescNotHidden() {
        return shifterRepo.findFirstByHiddenOrderByIdDesc(false);
    }

}

