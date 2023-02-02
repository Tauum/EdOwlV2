package com.example.javaspringboot.Activities.Controller;

import com.example.javaspringboot.Activities.Model.Swipe;
import com.example.javaspringboot.Activities.Service.SwipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@CrossOrigin( originPatterns = "*", maxAge = 3600, allowCredentials = "true")

@RestController
@RequestMapping("/Swipes")
public class SwipeController {
    private final SwipeService SwipeService;

    public SwipeController(SwipeService SwipeService) {
        this.SwipeService = SwipeService;
    }

    @GetMapping
    public ResponseEntity<List<Swipe>> getAllSwipes()
    {
        List<Swipe> swipes = SwipeService.findAll();
        return new ResponseEntity<>(swipes, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/withoutModule")
    public ResponseEntity<List<Swipe>> getAllSwipesWithoutModule()
    {
        List<Swipe> swipes = SwipeService.findAllWithoutModule();
        return new ResponseEntity<>(swipes, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/{id}")
    public ResponseEntity<Swipe> getSwipe(@PathVariable("id") Long id)
    {
        Swipe quiz = SwipeService.findSwipeById(id);
        if (quiz != null){
            return new ResponseEntity<>(quiz, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(quiz, HttpStatus.NOT_FOUND); //ok is 200 status code
    }
    @GetMapping("/newestOrder")
    public ResponseEntity<List<Swipe>> getAllOrderedByDateSwipes()
    {
        List<Swipe> swipes = SwipeService.findAllOrderByGeneratedDateDesc();
        return new ResponseEntity<>(swipes, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/newestOrder-hideHidden")
    public ResponseEntity<List<Swipe>> getAllSwipesOrderedByDateAndHideHidden()
    {
        List<Swipe> swipes = SwipeService.findAllOrderByGeneratedDateDescAndNotHidden();
        return new ResponseEntity<>(swipes, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/latest")
    public ResponseEntity<Swipe> getLatestSwipeAndHideHidden()
    {
        Swipe Swipe = SwipeService.findSwipeOrderByGeneratedDateDescNotHidden();
        return new ResponseEntity<>(Swipe, HttpStatus.OK); //ok is 200 status code
    }

    @PostMapping("/getSwipeWithID")
    public ResponseEntity<Swipe> getSwipeWithID(@RequestBody Swipe Swipe)
    {
        Swipe attempt = SwipeService.findSwipeById(Swipe.getId());
        return new ResponseEntity<>(attempt, HttpStatus.OK); //ok is 200 status code
    }

    @PostMapping("/add")
    public ResponseEntity<Swipe> addSwipe(@RequestBody Swipe Swipe)
    {
        Swipe newSwipe = SwipeService.addSwipe(Swipe);
        return new ResponseEntity<>(Swipe, HttpStatus.CREATED); //ok is 200 status code
    }

//    // "A collection with cascade=\"all-delete-orphan\" was no longer referenced by the owning entity instance: uk.ac.bolton.backend.Model.Swipe.questions
//    @PutMapping("/update/{id}") // this doesnt work
//    public ResponseEntity<Swipe> updateSwipe(@PathVariable("id") Long id, @RequestBody Swipe Swipe)
//    {
//        Swipe attempt = SwipeService.findSwipeById(id);
//
//        if (attempt != null){
//            attempt.setTitle(Swipe.title);
//            attempt.setTimeLimit(Swipe.timeLimit);
//            attempt.setValue(Swipe.value);
//
//            attempt.questions.clear();
//
//            attempt.setQuestions(Swipe.questions);
//
//            Swipe updatedSwipe = SwipeService.updateSwipe(attempt);
//            // potentially do this? V delete questions and answers and rewrite them
//            // SwipeService.delete
//            return new ResponseEntity<>(updatedSwipe, HttpStatus.OK);  //ok is 200 status code
//        }
//        return new ResponseEntity<>(attempt, HttpStatus.BAD_REQUEST);
//
////        Swipe updateSwipe = SwipeService.updateSwipe(Swipe);
////        return new ResponseEntity<>(updateSwipe, HttpStatus.OK);  //ok is 200 status code
//    }

    // "A collection with cascade=\"all-delete-orphan\" was no longer referenced by the owning entity instance: uk.ac.bolton.backend.Model.Swipe.questions
    @PutMapping("/update") // this doesnt work
    public ResponseEntity<Boolean> updateSwipe(@RequestBody Swipe Swipe) {
        Swipe attempt = SwipeService.updateSwipe(Swipe);
        if (attempt != null) {
            return new ResponseEntity<>(true, HttpStatus.OK);  //ok is 200 status code
        }
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }



    @DeleteMapping("/delete/{id}") // THIS DOESNT DELETE QUESTIONS OR ANSWERS
    public ResponseEntity<?> deleteSwipe(@PathVariable("id") Long id)
    {
        SwipeService.deleteSwipe(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}