package com.example.javaspringboot.Activities.Controller;


import com.example.javaspringboot.Activities.Model.Extra;
import com.example.javaspringboot.Activities.Model.Quiz;
import com.example.javaspringboot.Activities.Service.ExtraService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@CrossOrigin( originPatterns = "*", maxAge = 3600, allowCredentials = "true")

@RestController
@RequestMapping("/Extras")
public class ExtraController {
    private final ExtraService ExtraService;

    public ExtraController(ExtraService ExtraService ) {
        this.ExtraService = ExtraService;
    }

    @GetMapping
    public ResponseEntity<List<Extra>> getAllExtras()
    {
        List<Extra> Extras = ExtraService.findAll();
        return new ResponseEntity<>(Extras, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/withoutModule")
    public ResponseEntity<List<Extra>> getAllExtrasWithoutModule()
    {
        List<Extra> extras = ExtraService.findAllWithoutModule();
        return new ResponseEntity<>(extras, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/allOrderByDate")
    public ResponseEntity<List<Extra>> getAllExtrasOrderedByDate()
    {
        List<Extra> extras = ExtraService.findAllOrderByDate();
        return new ResponseEntity<>(extras, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/newestOrder-hideHidden")
    public ResponseEntity<List<Extra>> getAllQuizOrderedByDateAndHideHidden()
    {
        List<Extra> extras = ExtraService.findAllOrderByGeneratedDateDescAndNotHidden();
        return new ResponseEntity<>(extras, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/{id}")
    public ResponseEntity<Extra> getExtra(@PathVariable("id") Long id)
    {
        Extra extra = ExtraService.findExtraById(id);
        if (extra != null){
            return new ResponseEntity<>(extra, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(extra, HttpStatus.NOT_FOUND); //ok is 200 status code
}

    @PostMapping("/containingTitle-hideHidden/{title}")
    public ResponseEntity<List<Extra>> getExtrasContainingTitle(@PathVariable("title") String title)
    {
        List<Extra> extras = ExtraService.findAllContainingTitle(title);
        return new ResponseEntity<>(extras, HttpStatus.OK); //ok is 200 status code
    }

    @PutMapping("/viewed/{id}")
    public ResponseEntity<Extra> viewedExtra(@PathVariable("id") Long id)
    {
        Extra updateViews = ExtraService.updateViews(id);
        if (updateViews != null){
            return new ResponseEntity<>(updateViews, HttpStatus.OK);  //ok is 200 status code
        }
        return new ResponseEntity<>(updateViews, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/add")
    public ResponseEntity<Extra> addExtra(@RequestBody Extra extra)
    {
        Extra newExtra = ExtraService.addExtra(extra);
        return new ResponseEntity<>(newExtra, HttpStatus.CREATED); //ok is 200 status code
    }

    @PutMapping("/update")
    public ResponseEntity<Boolean> updateExtra(@RequestBody Extra extra)
    {
        Extra attempt = ExtraService.updateExtra(extra);
        if (attempt != null) {
            return new ResponseEntity<>(true, HttpStatus.OK);  //ok is 200 status code
        }
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }

//    @PutMapping("/updateWithModule")
//    public ResponseEntity<Boolean> updateExtra(@RequestBody ExtraWithModuleRegisterDto extra)
//    {
//        Extra attempt = ExtraService.updateExtraWithModuleRegister(extra);
//        if (attempt != null) {
//            return new ResponseEntity<>(true, HttpStatus.OK);  //ok is 200 status code
//        }
//        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteExtra(@PathVariable("id") Long id)
    {
        ExtraService.deleteExtra(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
