package com.example.javaspringboot.Additional.Controller;


import com.example.javaspringboot.Additional.Model.ContactForm;
import com.example.javaspringboot.Additional.Service.ContactFormService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@CrossOrigin( originPatterns = "*", maxAge = 3600, allowCredentials = "true")

@RestController
@RequestMapping("/ContactForms")
public class ContactFormController {

    private final ContactFormService ContactFormService;

    public ContactFormController(ContactFormService ContactFormService) {
        this.ContactFormService = ContactFormService;
    }

    @GetMapping
    public ResponseEntity<List<ContactForm>> getAllContactForm()
    {
        List<ContactForm> ContactForms = ContactFormService.findAllOrderByDate();
        return new ResponseEntity<>(ContactForms, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<ContactForm> addContactForm(@RequestBody ContactForm contactForm)
    {
        ContactForm newContactForm = ContactFormService.addContactForm(contactForm);
        return new ResponseEntity<>(newContactForm, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteContactForm(@PathVariable("id") Long id)
    {
        ContactFormService.deleteContactForm(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/all")
    public ResponseEntity<?> deleteContactForm()
    {
        List<ContactForm> attempt = ContactFormService.findAll();
        for (int i = 0; i < attempt.size(); i++) {

            Long a = Long.valueOf(i);
            ContactForm current= attempt.get(i);
            ContactFormService.deleteContactForm(current.getId());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

