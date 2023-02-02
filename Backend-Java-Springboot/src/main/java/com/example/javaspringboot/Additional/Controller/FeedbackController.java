package com.example.javaspringboot.Additional.Controller;


import com.example.javaspringboot.Additional.Model.Feedback;
import com.example.javaspringboot.Additional.Service.FeedbackService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Feedbacks")
public class FeedbackController {
    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedback()
    {
        List<Feedback> feedbacks = feedbackService.findAllOrderByDate();
        return new ResponseEntity<>(feedbacks, HttpStatus.OK); //ok is 200 status code
    }

    @PostMapping("/add")
    public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback)
    {
        Feedback newFeedback = feedbackService.addFeedback(feedback);
        return new ResponseEntity<>(feedback, HttpStatus.CREATED); //ok is 200 status code
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable("id") Long id,@RequestBody Feedback feedback)
    {
        Feedback newFeedback = feedbackService.updateFeedback(id,feedback);
        return new ResponseEntity<>(feedback, HttpStatus.CREATED); //ok is 200 status code
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable("id") Long id)
    {
        Feedback attempt = feedbackService.findFeedbackById(id);
        feedbackService.deleteFeedback(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/all")
    public ResponseEntity<?> deleteFeedback()
    {
        List<Feedback> attempt = feedbackService.findAll();
        for (int i = 0; i < attempt.size(); i++) {

            Long a = Long.valueOf(i);
            Feedback current= attempt.get(i);
            feedbackService.deleteFeedback(current.getId());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

