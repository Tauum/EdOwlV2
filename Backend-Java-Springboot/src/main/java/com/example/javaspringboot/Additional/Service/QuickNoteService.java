package com.example.javaspringboot.Additional.Service;

import com.example.javaspringboot.Additional.Model.QuickNote;
import com.example.javaspringboot.Additional.Repository.QuickNoteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class QuickNoteService {
    private final QuickNoteRepo QuickNoteRepo;

    @Autowired
    public QuickNoteService(QuickNoteRepo QuickNoteRepository) {
        this.QuickNoteRepo = QuickNoteRepository;
    }

    public QuickNote addQuickNote(QuickNote QuickNote) { return QuickNoteRepo.save(QuickNote); }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteQuickNote(Long id) { QuickNoteRepo.deleteQuickNoteById(id);}

    public QuickNote findQuickNoteById(Long id)
    {
        QuickNote find = QuickNoteRepo.findQuickNoteById(id);
        if (find != null){return find;}
        return null;
    }


    public List<QuickNote> findAll() {
        return QuickNoteRepo.findAll();
    }

    public List<QuickNote> findAllByUserId(Long id) {
        return QuickNoteRepo.findAllByUserId(id);
    }
}