package com.example.javaspringboot.Submissions.Controller;


import com.example.javaspringboot.Submissions.Model.SubmittedQuestion;
import com.example.javaspringboot.Submissions.Service.SubmittedQuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/SubmittedQuestion")
@CrossOrigin
public class SubmittedQuestionController {
    private final SubmittedQuestionService submittedQuestionService;

    public SubmittedQuestionController(SubmittedQuestionService submittedQuestionService) {
        this.submittedQuestionService = submittedQuestionService;
    }

    @GetMapping
    public ResponseEntity<List<SubmittedQuestion>> getAllSubmittedQuestions()
    {
        List<SubmittedQuestion> submittedQuestions = submittedQuestionService.findAll();
        return new ResponseEntity<>(submittedQuestions, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubmittedQuestion> getSubmittedQuestion(@PathVariable("id") Long id)
    {
        SubmittedQuestion submittedQuestion = submittedQuestionService.findSubmittedQuestionById(id);
        if (submittedQuestion != null){
            return new ResponseEntity<>(submittedQuestion, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(submittedQuestion, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @PostMapping("/getSubmittedQuestionWithID")
    public ResponseEntity<SubmittedQuestion> getSubmittedQuestionWithID(@RequestBody SubmittedQuestion submittedQuestion)
    {
        SubmittedQuestion attempt = submittedQuestionService.findSubmittedQuestionById(submittedQuestion.getId());
        return new ResponseEntity<>(attempt, HttpStatus.OK); //ok is 200 status code
    }

    @PostMapping("/add")
    public ResponseEntity<SubmittedQuestion> addSubmittedQuestion(@RequestBody SubmittedQuestion submittedQuestion)
    {
        SubmittedQuestion newSubmittedQuestion = submittedQuestionService.addSubmittedQuestion(submittedQuestion);
        return new ResponseEntity<>(submittedQuestion, HttpStatus.CREATED); //ok is 200 status code
    }

    @PutMapping("/update")
    public ResponseEntity<SubmittedQuestion> updateSubmittedQuestion(@RequestBody SubmittedQuestion submittedQuestion)
    {
        SubmittedQuestion updateSubmittedQuestion = submittedQuestionService.updateSubmittedQuestion(submittedQuestion);
        return new ResponseEntity<>(updateSubmittedQuestion, HttpStatus.OK);  //ok is 200 status code
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSubmittedQuestion(@PathVariable("id") Long id)
    {
        submittedQuestionService.deleteSubmittedQuestion(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

