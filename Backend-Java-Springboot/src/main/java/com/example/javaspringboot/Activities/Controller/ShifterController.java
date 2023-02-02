package com.example.javaspringboot.Activities.Controller;

import com.example.javaspringboot.Activities.Model.Shifter;
import com.example.javaspringboot.Activities.Model.Swipe;
import com.example.javaspringboot.Activities.Service.ShifterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@CrossOrigin( originPatterns = "*", maxAge = 3600, allowCredentials = "true")

@RestController
@RequestMapping("/Shifters")
public class ShifterController {
    private final ShifterService shifterService;

    public ShifterController(ShifterService shifterService) {
        this.shifterService = shifterService;
    }

    @GetMapping
    public ResponseEntity<List<Shifter>> getAllShifters()
    {
        List<Shifter> shifters = shifterService.findAll();
        return new ResponseEntity<>(shifters, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/withoutModule")
    public ResponseEntity<List<Shifter>> getAllSwipesWithoutModule()
    {
        List<Shifter> shifters = shifterService.findAllWithoutModule();
        return new ResponseEntity<>(shifters, HttpStatus.OK); //ok is 200 status code
    }


    @GetMapping("/{id}")
    public ResponseEntity<Shifter> getShifter(@PathVariable("id") Long id)
    {
        Shifter shifter = shifterService.findShifterById(id);
        if (shifter != null){
            return new ResponseEntity<>(shifter, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(shifter, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @GetMapping("/newestOrder")
    public ResponseEntity<List<Shifter>> getAllOrderedByDateShifteres()
    {
        List<Shifter> shifters = shifterService.findAllOrderByGeneratedDateDesc();
        return new ResponseEntity<>(shifters, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/newestOrder-hideHidden")
    public ResponseEntity<List<Shifter>> getAllShifterOrderedByDateAndHideHidden()
    {
        List<Shifter> shifters = shifterService.findAllOrderByGeneratedDateDescAndNotHidden();
        return new ResponseEntity<>(shifters, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/latest")
    public ResponseEntity<Shifter> getLatestShifterAndHideHidden()
    {
        Shifter shifter = shifterService.findShifterOrderByGeneratedDateDescNotHidden();
        return new ResponseEntity<>(shifter, HttpStatus.OK); //ok is 200 status code
    }

    @PostMapping("/getShifterWithID")
    public ResponseEntity<Shifter> getShifterWithID(@RequestBody Shifter shifter)
    {
        Shifter attempt = shifterService.findShifterById(shifter.getId());
        return new ResponseEntity<>(attempt, HttpStatus.OK); //ok is 200 status code
    }

    @PostMapping("/add")
    public ResponseEntity<Shifter> addShifter(@RequestBody Shifter shifter)
    {
        Shifter newShifter = shifterService.addShifter(shifter);
        return new ResponseEntity<>(newShifter, HttpStatus.CREATED); //ok is 200 status code
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateShifter(@RequestBody Shifter shifter) {
        Shifter attempt = shifterService.updateShifter(shifter);
        if (attempt != null) {

            return new ResponseEntity<>("good", HttpStatus.OK);  //ok is 200 status code
        }
        return new ResponseEntity<>("bad", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteShifter(@PathVariable("id") Long id)
    {
        shifterService.findShifterById(id);
        shifterService.deleteShifter(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}