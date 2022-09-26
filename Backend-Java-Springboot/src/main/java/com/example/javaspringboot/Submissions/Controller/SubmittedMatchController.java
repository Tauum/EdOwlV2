package com.example.javaspringboot.Submissions.Controller;


import com.example.javaspringboot.Submissions.Model.Statistics;
import com.example.javaspringboot.Submissions.Model.SubmittedMatch;
import com.example.javaspringboot.Submissions.Service.SubmittedMatchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/SubmittedMatches")
@CrossOrigin
public class SubmittedMatchController {
    private final SubmittedMatchService submittedMatchService;

    public SubmittedMatchController(SubmittedMatchService submittedMatchService) {
        this.submittedMatchService = submittedMatchService;
    }

    @GetMapping
    public ResponseEntity<List<SubmittedMatch>> getAllSubmittedMatches()
    {
        List<SubmittedMatch> matchSubmitteds = submittedMatchService.findAll();
        return new ResponseEntity<>(matchSubmitteds, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubmittedMatch> getSubmittedMatch(@PathVariable("id") Long id)
    {
        SubmittedMatch matchSubmitted = submittedMatchService.findSubmittedMatchById(id);
        if (matchSubmitted != null){
            return new ResponseEntity<>(matchSubmitted, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(matchSubmitted, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @GetMapping("/getForUser/{id}")
    public ResponseEntity<List<SubmittedMatch>> getSubmittedMatchForUser(@PathVariable("id") Long id){
        List<SubmittedMatch> matchzes = submittedMatchService.findAllByUserId(id);
        return new ResponseEntity<>(matchzes, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/getForMatch/{title}")
    public ResponseEntity<List<SubmittedMatch>> getSubmittedMatchForUser(@PathVariable("title") String title){
        List<SubmittedMatch> quizzes = submittedMatchService.findAllByMatchTitle(title);
        return new ResponseEntity<>(quizzes, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/getSMStatsForUser/{id}")
    public ResponseEntity<Statistics> getSMStatsForUser(@PathVariable("id") Long userId){
        return new ResponseEntity<>(submittedMatchService.getStatisticsForUser(userId), HttpStatus.OK);  //ok is 200 status code
    }

    @PostMapping("/add")
    public ResponseEntity<SubmittedMatch> addSubmittedMatch(@RequestBody SubmittedMatch matchSubmitted)
    {
        SubmittedMatch newSubmittedMatch = submittedMatchService.addSubmittedMatch(matchSubmitted);
        return new ResponseEntity<>(newSubmittedMatch, HttpStatus.CREATED); //ok is 200 status code
    }

    @PutMapping("/update")
    public ResponseEntity<SubmittedMatch> updateSubmittedMatch(@RequestBody SubmittedMatch matchSubmitted)
    {
        // redo save function here
        SubmittedMatch updateSubmittedMatch = submittedMatchService.updateSubmittedMatch(matchSubmitted);
        return new ResponseEntity<>(updateSubmittedMatch, HttpStatus.OK);  //ok is 200 status code
    }
    @PatchMapping("/vote/{id}/{Rating}")
    public ResponseEntity<Boolean> updateSubmittedMatch(@PathVariable("Rating") Boolean Rating, @PathVariable("id") Long Id)
    {
        Boolean out = false;
        if (submittedMatchService.patchRating(Rating, Id)){
            out = true;
        }
        return new ResponseEntity<>(out, HttpStatus.OK);  //ok is 200 status code
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSubmittedMatch(@PathVariable("id") Long id)
    {
        submittedMatchService.deleteSubmittedMatch(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}