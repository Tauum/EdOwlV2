package com.example.javaspringboot.Activities.Controller;

import com.example.javaspringboot.Activities.Model.Match;
import com.example.javaspringboot.Activities.Service.MatchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Matches")
public class MatchController {
    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping
    public ResponseEntity<List<Match>> getAllMatchs()
    {
        List<Match> matchs = matchService.findAll();
        return new ResponseEntity<>(matchs, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatch(@PathVariable("id") Long id)
    {
        Match match = matchService.findMatchById(id);
        if (match != null){
            return new ResponseEntity<>(match, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(match, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @GetMapping("/newestOrder")
    public ResponseEntity<List<Match>> getAllOrderedByDateMatches()
    {
        List<Match> matchs = matchService.findAllOrderByGeneratedDateDesc();
        return new ResponseEntity<>(matchs, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/newestOrder-hideHidden")
    public ResponseEntity<List<Match>> getAllMatchOrderedByDateAndHideHidden()
    {
        List<Match> matchs = matchService.findAllOrderByGeneratedDateDescAndNotHidden();
        return new ResponseEntity<>(matchs, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/latest")
    public ResponseEntity<Match> getLatestMatchAndHideHidden()
    {
        Match match = matchService.findMatchOrderByGeneratedDateDescNotHidden();
        return new ResponseEntity<>(match, HttpStatus.OK); //ok is 200 status code
    }

    @PostMapping("/getMatchWithID")
    public ResponseEntity<Match> getMatchWithID(@RequestBody Match match)
    {
        Match attempt = matchService.findMatchById(match.getId());
        return new ResponseEntity<>(attempt, HttpStatus.OK); //ok is 200 status code
    }

    @PostMapping("/add")
    public ResponseEntity<Match> addMatch(@RequestBody Match match)
    {
        Match newMatch = matchService.addMatch(match);
        return new ResponseEntity<>(newMatch, HttpStatus.CREATED); //ok is 200 status code
    }

    @PutMapping("/update/{id}") // this doesnt work
    public ResponseEntity<String> updateMatch(@PathVariable("id") Long id, @RequestBody Match match) {
        Match attempt = matchService.updateMatch(id, match);
        if (attempt != null) {

            return new ResponseEntity<>("good", HttpStatus.OK);  //ok is 200 status code
        }
        return new ResponseEntity<>("bad", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMatch(@PathVariable("id") Long id)
    {
        matchService.findMatchById(id);
        matchService.deleteMatch(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}