package com.example.javaspringboot.Activities.Controller;


import com.example.javaspringboot.Activities.Model.Hangman;
import com.example.javaspringboot.Activities.Service.HangmanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Hangmen")
public class HangmanController {
    private final HangmanService hangmanService;

    public HangmanController(HangmanService hangmanService) {
        this.hangmanService = hangmanService;
    }

    @GetMapping
    public ResponseEntity<List<Hangman>> getAllHangmans()
    {
        List<Hangman> hangmans = hangmanService.findAll();
        return new ResponseEntity<>(hangmans, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hangman> getHangman(@PathVariable("id") Long id)
    {
        Hangman hangman = hangmanService.findHangmanById(id);
        if (hangman != null){
            return new ResponseEntity<>(hangman, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(hangman, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @PostMapping("/getHangmanWithID")
    public ResponseEntity<Hangman> getHangmanWithID(@RequestBody Hangman hangman)
    {
        Hangman attempt = hangmanService.findHangmanById(hangman.getId());
        return new ResponseEntity<>(attempt, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/newestOrder")
    public ResponseEntity<List<Hangman>> getAllOrderedByDateQuizs()
    {
        List<Hangman> hangmans = hangmanService.findAllOrderByGeneratedDateDesc();
        return new ResponseEntity<>(hangmans, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/newestOrder-hideHidden")
    public ResponseEntity<List<Hangman>> getAllQuizOrderedByDateAndHideHidden()
    {
        List<Hangman> hangmans = hangmanService.findAllOrderByGeneratedDateDescAndNotHidden();
        return new ResponseEntity<>(hangmans, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/latest")
    public ResponseEntity<Hangman> getLatestHangman()
    {
        Hangman hangman = hangmanService.findHanganOrderByGeneratedDateDesc();
        return new ResponseEntity<>(hangman, HttpStatus.OK); //ok is 200 status code
    }

    @PostMapping("/add")
    public ResponseEntity<Hangman> addHangman(@RequestBody Hangman hangman)
    {
        Hangman newHangman = hangmanService.addHangman(hangman);
        return new ResponseEntity<>(hangman, HttpStatus.CREATED); //ok is 200 status code
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Hangman> updateHangman(@PathVariable("id") Long id, @RequestBody Hangman hangman)
    {
        Hangman attempt = hangmanService.findHangmanById(id);
        if (attempt != null){
            attempt.setHint(hangman.hint);
            attempt.setSubject(hangman.subject);
            attempt.setTitle(hangman.title);
            attempt.setValue(hangman.value);
            attempt.setWord(hangman.word);
            attempt.setHidden(hangman.hidden);
            Hangman updatedHangman = hangmanService.updateHangman(attempt);
            return new ResponseEntity<>(updatedHangman, HttpStatus.OK);  //ok is 200 status code
        }
        return new ResponseEntity<>(attempt, HttpStatus.BAD_REQUEST);  //ok is 200 status code
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteHangman(@PathVariable("id") Long id)
    {
        Hangman attempt = hangmanService.findHangmanById(id);
        hangmanService.deleteHangman(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

