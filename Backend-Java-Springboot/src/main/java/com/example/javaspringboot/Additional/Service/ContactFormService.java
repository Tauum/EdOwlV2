package com.example.javaspringboot.Additional.Service;


import com.example.javaspringboot.Additional.Model.ContactForm;
import com.example.javaspringboot.Additional.Model.QuickNote;
import com.example.javaspringboot.Additional.Repository.ContactFormRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class ContactFormService {

    private final ContactFormRepo contactFormRepo;

    @Autowired
    public ContactFormService(ContactFormRepo contactFormRepo) {
        this.contactFormRepo = contactFormRepo;
    }

    public ContactForm addContactForm(ContactForm ContactForm) { return ContactFormRepo.save(ContactForm); }

    public List<ContactForm> findAll(){ return ContactFormRepo.findAll(); }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteContactForm(Long id) { ContactFormRepo.deleteContactFormById(id);}

    public ContactForm findContactFormById(Long id) {
        ContactForm find = ContactFormRepo.findContactFormById(id);
        if (find != null){return find;}
        return null;
    }

    public List<ContactForm> findAllOrderByDate() {
        return ContactFormRepo.findAllByOrderByGeneratedDate();
    }

}