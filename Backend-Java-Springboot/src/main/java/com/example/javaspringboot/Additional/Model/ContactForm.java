package com.example.javaspringboot.Additional.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;


@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "contact_form")
public class ContactForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    private String name;
    private String email;
    private String message;
    private LocalDate generatedDate;

    public ContactForm(String name, String email, String message, LocalDate generatedDate) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.generatedDate = generatedDate;
    }
}



