package com.example.javaspringboot.Additional.Repository;

import com.example.javaspringboot.Additional.Model.ContactForm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContactFormRepo extends JpaRepository<ContactForm, Long> {

    ContactForm findContactFormById(Long id);

    void deleteContactFormById(Long id);

    List<ContactForm> findAllByOrderByGeneratedDate();
}

