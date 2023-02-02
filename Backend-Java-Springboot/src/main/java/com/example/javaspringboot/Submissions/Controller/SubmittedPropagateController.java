package com.example.javaspringboot.Submissions.Controller;


import com.example.javaspringboot.Submissions.Model.SubmittedPropagate;
import com.example.javaspringboot.Submissions.Service.SubmittedPropagateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@CrossOrigin( originPatterns = "*", maxAge = 3600, allowCredentials = "true")

@RestController
@RequestMapping("/SubmittedPropagates")
public class SubmittedPropagateController {
    private final SubmittedPropagateService submittedPropagateService;

    public SubmittedPropagateController(SubmittedPropagateService submittedPropagateService) {
        this.submittedPropagateService = submittedPropagateService;
    }

    @GetMapping
    public ResponseEntity<List<SubmittedPropagate>> getAllSubmittedPropagates()
    {
        List<SubmittedPropagate> PropagateSubmitteds = submittedPropagateService.findAll();
        return new ResponseEntity<>(PropagateSubmitteds, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubmittedPropagate> getSubmittedPropagate(@PathVariable("id") Long id)
    {
        SubmittedPropagate propagateSubmitted = submittedPropagateService.findSubmittedPropagateById(id);
        if (propagateSubmitted != null){
            return new ResponseEntity<>(propagateSubmitted, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(propagateSubmitted, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @GetMapping("/getForUser/{id}")
    public ResponseEntity<List<SubmittedPropagate>> getSubmittedPropagateForUser(@PathVariable("id") Long id){
        List<SubmittedPropagate> Propagatezes = submittedPropagateService.findAllByUserId(id);
        return new ResponseEntity<>(Propagatezes, HttpStatus.OK); //ok is 200 status code
    }

    @PostMapping("/add")
    public ResponseEntity<SubmittedPropagate> addSubmittedPropagate(@RequestBody SubmittedPropagate PropagateSubmitted)
    {
        SubmittedPropagate newSubmittedPropagate = submittedPropagateService.addSubmittedPropagate(PropagateSubmitted);
        return new ResponseEntity<>(newSubmittedPropagate, HttpStatus.CREATED); //ok is 200 status code
    }

    @PatchMapping("/vote/{id}/{Rating}")
    public ResponseEntity<Boolean> updateSubmittedQuiz(@PathVariable("Rating") Boolean Rating, @PathVariable("id") Long Id)
    {
        Boolean out = false;
        if (submittedPropagateService.patchRating(Rating, Id)){
            out = true;
        }
        return new ResponseEntity<>(out, HttpStatus.OK);  //ok is 200 status code
    }

    @PutMapping("/update")
    public ResponseEntity<SubmittedPropagate> updateSubmittedPropagate(@RequestBody SubmittedPropagate PropagateSubmitted)
    {
        SubmittedPropagate updateSubmittedPropagate = submittedPropagateService.updateSubmittedPropagate(PropagateSubmitted);
        return new ResponseEntity<>(updateSubmittedPropagate, HttpStatus.OK);  //ok is 200 status code
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSubmittedPropagate(@PathVariable("id") Long id)
    {
        submittedPropagateService.deleteSubmittedPropagate(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
