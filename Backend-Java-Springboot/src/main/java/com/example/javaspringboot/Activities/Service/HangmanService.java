package com.example.javaspringboot.Activities.Service;

import com.example.javaspringboot.Activities.Model.Hangman;
import com.example.javaspringboot.Activities.Repository.HangmanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class HangmanService {
    private final HangmanRepo hangmanRepo;
    @Autowired
    public HangmanService(HangmanRepo hangmanRepo) {
        this.hangmanRepo = hangmanRepo;
    }

    public List<Hangman> findAll() {
        return hangmanRepo.findAll();
    }

    public Hangman findHangmanById(Long id) {

        Hangman find = hangmanRepo.findHangmanById(id);
        if (find != null){return find;}
        return null;

    }

    public Hangman addHangman(Hangman hangman) {
        return hangmanRepo.save(hangman);
    }

    public Hangman updateHangman(Hangman hangman) {
        return hangmanRepo.save(hangman);
    }
    @Transactional
    public void deleteHangman(Long id) {
        hangmanRepo.deleteHangmanById(id);
    }

    public Hangman findHanganOrderByGeneratedDateDesc() {
        return hangmanRepo.findFirstByHiddenOrderByIdDesc(false);
    }

    public List<Hangman> findAllOrderByGeneratedDateDesc() {
        return hangmanRepo.findAllByOrderByGeneratedDateDesc();
    }

    public List<Hangman> findAllOrderByGeneratedDateDescAndNotHidden() {
        return hangmanRepo.findAllByHiddenOrderByGeneratedDateDesc(false);
    }
}

