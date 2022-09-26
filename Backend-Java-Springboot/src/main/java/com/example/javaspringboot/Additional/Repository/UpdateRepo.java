package com.example.javaspringboot.Additional.Repository;

import com.example.javaspringboot.Additional.Model.Update;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface UpdateRepo extends JpaRepository<Update, Long> {

    Update findUpdateById(Long id);

    void deleteUpdateById(Long id);

    List<Update> findAllByOrderByGeneratedDate();

    List<Update> findAllByGeneratedDateGreaterThanOrderByGeneratedDate(LocalDate fromDate);
}

