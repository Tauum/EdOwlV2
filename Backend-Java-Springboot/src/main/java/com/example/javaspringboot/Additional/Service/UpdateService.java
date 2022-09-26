package com.example.javaspringboot.Additional.Service;

import com.example.javaspringboot.Additional.Model.ContactForm;
import com.example.javaspringboot.Additional.Model.Update;
import com.example.javaspringboot.Additional.Repository.UpdateRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
public class UpdateService {
    private final com.example.javaspringboot.Additional.Repository.UpdateRepo UpdateRepo;

    @Autowired
    public UpdateService(UpdateRepo UpdateRepository) {
        this.UpdateRepo = UpdateRepository;
    }

    public Update addUpdate(Update Update) { return UpdateRepo.save(Update); }

    public List<Update> findAll(){ return UpdateRepo.findAll(); }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteUpdate(Long id) {
        Update find = findUpdateById(id);
        if(find != null){
            UpdateRepo.deleteUpdateById(id);
        }
        return;
    }

    public Update findUpdateById(Long id) {

        Update find = UpdateRepo.findUpdateById(id);
        if (find != null){return find;}
        return null;

    }

    public List<Update> findAllOrderByDate() {
        return UpdateRepo.findAllByOrderByGeneratedDate();
    }

    public List<Update> findAllRecentOrderByDate(LocalDate fromDate) {
        return UpdateRepo.findAllByGeneratedDateGreaterThanOrderByGeneratedDate(fromDate);
//        return UpdateRepo.findAllByOrderByGeneratedDate();
    }

    public Update updateUpdate(Update attempt) {
        Update find = findUpdateById(attempt.id);
        if (find != null){
            find.setGeneratedDate(attempt.getGeneratedDate());
            find.setContent(attempt.getContent());
            return UpdateRepo.save(attempt);
        }
        return null;
    }
}