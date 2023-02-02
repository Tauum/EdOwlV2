package com.example.javaspringboot.Activities.Service;


import com.example.javaspringboot.Activities.Model.Definition;
import com.example.javaspringboot.Activities.Model.Match;
import com.example.javaspringboot.Activities.Repository.MatchRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class MatchService {
    private final MatchRepo matchRepo;

    @Autowired
    public MatchService(MatchRepo matchRepository) {
        this.matchRepo = matchRepository;
    }

    public Match addMatch(Match match)
    {
        return matchRepo.save(match);
    }

    public List<Match> findAll(){ return matchRepo.findAll(); }

    public Match updateMatch(Match match){ return matchRepo.save(match); }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteMatch(Long id) { matchRepo.deleteMatchById(id);}

    // rework this from quiz to update match
    @Transactional
    public Match updateMatch(Long id, Match attempt) {
        Match find = findMatchById(id);
            if (find != null) {
                // create set general for match
                find.setGeneral(attempt.getTitle(),attempt.getValue(),attempt.isHidden(),attempt.getSubject());

                ArrayList<Definition> remD = new ArrayList<>();
                ArrayList<Definition> addD = new ArrayList<>();

                // this is for updating definitions
                for(Definition attemptCurD: attempt.definitions){
                    for (Definition findCurD : find.definitions){
                        if (attemptCurD.getId()!= null ) {
                            if (attemptCurD.getId().equals(findCurD.getId())) {
                                findCurD.setGeneral(attemptCurD.getTitle(), attemptCurD.getExplaination(), attemptCurD.getValue());
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
                matchRepo.save(find);
            }
        return find;
    }

    public Match findMatchById(Long id)
    {
        Match find = matchRepo.findMatchById(id);
        if (find != null){return find;}
        return null;
    }

    public List<Match> findAllOrderByGeneratedDateDesc() {
        return matchRepo.findAllByOrderByGeneratedDateDesc();
    }

    public List<Match> findAllOrderByGeneratedDateDescAndNotHidden() {
        return matchRepo.findAllByHiddenOrderByGeneratedDateDesc(false);
    }

    public Match findMatchOrderByGeneratedDateDescNotHidden() {
        return matchRepo.findFirstByHiddenOrderByIdDesc(false);
    }

}

