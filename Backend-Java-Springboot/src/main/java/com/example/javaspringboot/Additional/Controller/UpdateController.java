package com.example.javaspringboot.Additional.Controller;

import com.example.javaspringboot.Additional.Model.Update;
import com.example.javaspringboot.Additional.Service.UpdateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@CrossOrigin( originPatterns = "*", maxAge = 3600, allowCredentials = "true")

@RestController
@RequestMapping("/Updates")
public class UpdateController {
    private final com.example.javaspringboot.Additional.Service.UpdateService UpdateService;

    public UpdateController(UpdateService UpdateService) {
        this.UpdateService = UpdateService;
    }

    @GetMapping
    public ResponseEntity<List<Update>> getAllUpdate()
    {
        List<Update> Updates = UpdateService.findAllOrderByDate();
        return new ResponseEntity<>(Updates, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/{id}")
    public ResponseEntity<Update> getUpdate(@PathVariable("id") Long id)
    {
        Update updates = UpdateService.findUpdateById(id);
        if (updates != null){
            return new ResponseEntity<>(updates, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(updates, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @GetMapping("/Recent")
    public ResponseEntity<List<Update>> getAllRecentUpdate()
    {
        LocalDate now = LocalDate.now();
        now = now.minusWeeks(2);
        List<Update> Updates = UpdateService.findAllRecentOrderByDate(now);
        return new ResponseEntity<>(Updates, HttpStatus.OK); //ok is 200 status code
    }

    @PostMapping("/add")
    public ResponseEntity<Update> addUpdate(@RequestBody Update Update)
    {
        Update newUpdate = UpdateService.addUpdate(Update);
        return new ResponseEntity<>(Update, HttpStatus.CREATED); //ok is 200 status code
    }

    @PutMapping("/update")
    public ResponseEntity<Update> updateUpdate(@RequestBody Update update)
    {
        Update attempt = UpdateService.updateUpdate(update);
        if(attempt != null){
            return new ResponseEntity<>(attempt, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUpdate(@PathVariable("id") Long id)
    {
        UpdateService.deleteUpdate(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

