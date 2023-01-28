package com.example.javaspringboot.Submissions.Controller;


import com.example.javaspringboot.Submissions.Model.Statistics;
import com.example.javaspringboot.Submissions.Model.SubmittedShifter;
import com.example.javaspringboot.Submissions.Service.SubmittedShifterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/SubmittedShifteres")
@CrossOrigin
public class SubmittedShifterController {
    private final SubmittedShifterService submittedShifterService;

    public SubmittedShifterController(SubmittedShifterService submittedShifterService) {
        this.submittedShifterService = submittedShifterService;
    }

    @GetMapping
    public ResponseEntity<List<SubmittedShifter>> getAllSubmittedShifteres()
    {
        List<SubmittedShifter> submittedShifters = submittedShifterService.findAll();
        return new ResponseEntity<>(submittedShifters, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubmittedShifter> getSubmittedShifter(@PathVariable("id") Long id)
    {
        SubmittedShifter submittedShifter = submittedShifterService.findSubmittedShifterById(id);
        if (submittedShifter != null){
            return new ResponseEntity<>(submittedShifter, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(submittedShifter, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @GetMapping("/getForUser/{id}")
    public ResponseEntity<List<SubmittedShifter>> getSubmittedShifterForUser(@PathVariable("id") Long id){
        List<SubmittedShifter> shifters = submittedShifterService.findAllByUserId(id);
        return new ResponseEntity<>(shifters, HttpStatus.OK); //ok is 200 status code
    }

//    @GetMapping("/getForShifter/{title}")
//    public ResponseEntity<List<SubmittedShifter>> getSubmittedShifterForUser(@PathVariable("title") String title){
//        List<SubmittedShifter> quizzes = submittedShifterService.findAllByShifterTitle(title);
//        return new ResponseEntity<>(quizzes, HttpStatus.OK); //ok is 200 status code
//    }

    @GetMapping("/getSMStatsForUser/{id}")
    public ResponseEntity<Statistics> getSMStatsForUser(@PathVariable("id") Long userId){
        return new ResponseEntity<>(submittedShifterService.getStatisticsForUser(userId), HttpStatus.OK);  //ok is 200 status code
    }

    @PostMapping("/add")
    public ResponseEntity<SubmittedShifter> addSubmittedShifter(@RequestBody SubmittedShifter matchSubmitted)
    {
        SubmittedShifter newSubmittedShifter = submittedShifterService.addSubmittedShifter(matchSubmitted);
        return new ResponseEntity<>(newSubmittedShifter, HttpStatus.CREATED); //ok is 200 status code
    }

    @PutMapping("/update")
    public ResponseEntity<SubmittedShifter> updateSubmittedShifter(@RequestBody SubmittedShifter matchSubmitted)
    {
        // redo save function here
        SubmittedShifter updateSubmittedShifter = submittedShifterService.updateSubmittedShifter(matchSubmitted);
        return new ResponseEntity<>(updateSubmittedShifter, HttpStatus.OK);  //ok is 200 status code
    }
    @PatchMapping("/vote/{id}/{Rating}")
    public ResponseEntity<Boolean> updateSubmittedShifter(@PathVariable("Rating") Boolean Rating, @PathVariable("id") Long Id)
    {
        Boolean out = false;
        if (submittedShifterService.patchRating(Rating, Id)){
            out = true;
        }
        return new ResponseEntity<>(out, HttpStatus.OK);  //ok is 200 status code
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSubmittedShifter(@PathVariable("id") Long id)
    {
        submittedShifterService.deleteSubmittedShifter(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}