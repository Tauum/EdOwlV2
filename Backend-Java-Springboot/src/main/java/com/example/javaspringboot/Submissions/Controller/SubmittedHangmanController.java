package com.example.javaspringboot.Submissions.Controller;


import com.example.javaspringboot.Submissions.Model.Statistics;
import com.example.javaspringboot.Submissions.Model.SubmittedHangman;
import com.example.javaspringboot.Submissions.Service.SubmittedHangmanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/SubmittedHangmen")
@CrossOrigin
public class SubmittedHangmanController {
    private final SubmittedHangmanService submittedHangmanService;

    public SubmittedHangmanController(SubmittedHangmanService submittedHangmanService) {
        this.submittedHangmanService = submittedHangmanService;
    }

    @GetMapping
    public ResponseEntity<List<SubmittedHangman>> getAllSubmittedHangmans()
    {
        List<SubmittedHangman> submittedHangmans = submittedHangmanService.findAll();
        return new ResponseEntity<>(submittedHangmans, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubmittedHangman> getSubmittedHangman(@PathVariable("id") Long id)
    {
        SubmittedHangman submittedHangman = submittedHangmanService.findSubmittedHangmanById(id);
        if (submittedHangman != null){
            return new ResponseEntity<>(submittedHangman, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(submittedHangman, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @GetMapping("/getForUser/{id}")
    public ResponseEntity<List<SubmittedHangman>> getSubmittedHangmanForUser(@PathVariable("id") Long id){
        List<SubmittedHangman> submittedHangmans = submittedHangmanService.findAllByUserId(id);
        return new ResponseEntity<>(submittedHangmans, HttpStatus.OK); //ok is 200 status code
    }

//    @GetMapping("/getForHangman/{title}")
//    public ResponseEntity<List<SubmittedHangman>> getSubmittedHangmanForUser(@PathVariable("title") String title){
//        List<SubmittedHangman> hangmen = submittedHangmanService.findAllByHangmanTitle(title);
//        return new ResponseEntity<>(hangmen, HttpStatus.OK); //ok is 200 status code
//    }

    @GetMapping("/getSHStatsForUser/{id}")
    public ResponseEntity<Statistics> getSHStatsForUser(@PathVariable("id") Long userId){
        return new ResponseEntity<>(submittedHangmanService.getStatisticsForUser(userId), HttpStatus.OK);  //ok is 200 status code
    }



    @PostMapping("/add")
    public ResponseEntity<SubmittedHangman> addSubmittedHangman(@RequestBody SubmittedHangman submittedHangman)
    {
        SubmittedHangman newSubmittedHangman = submittedHangmanService.addSubmittedHangman(submittedHangman);
        return new ResponseEntity<>(submittedHangman, HttpStatus.CREATED); //ok is 200 status code
    }

    @PutMapping("/update")
    public ResponseEntity<SubmittedHangman> updateSubmittedHangman(@RequestBody SubmittedHangman submittedHangman)
    {
        SubmittedHangman updateSubmittedHangman = submittedHangmanService.updateSubmittedHangman(submittedHangman);
        return new ResponseEntity<>(updateSubmittedHangman, HttpStatus.OK);  //ok is 200 status code
    }

    @PatchMapping("/vote/{id}/{Rating}")
    public ResponseEntity<Boolean> updateSubmittedHangmen(@PathVariable("Rating") Boolean Rating, @PathVariable("id") Long Id)
    {
        Boolean out = false;
        if (submittedHangmanService.patchRating(Rating, Id)){
            out = true;
        }
        return new ResponseEntity<>(out, HttpStatus.OK);  //ok is 200 status code
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSubmittedHangman(@PathVariable("id") Long id)
    {
        submittedHangmanService.deleteSubmittedHangman(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
