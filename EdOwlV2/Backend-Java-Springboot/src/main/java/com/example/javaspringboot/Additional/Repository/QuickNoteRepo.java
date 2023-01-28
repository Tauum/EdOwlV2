package com.example.javaspringboot.Additional.Repository;

import com.example.javaspringboot.Additional.Model.QuickNote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuickNoteRepo extends JpaRepository<QuickNote, Long> {

    void deleteQuickNoteById(Long id);

    QuickNote findQuickNoteById(Long id);

    List<QuickNote> findAll();

    List<QuickNote> findAllByUserId(Long id);
}
