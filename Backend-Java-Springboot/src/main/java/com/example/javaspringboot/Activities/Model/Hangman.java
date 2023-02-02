package com.example.javaspringboot.Activities.Model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "hangman")
public class Hangman {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public String title;
    public String word;
    public String hint;
    public float value;
    public String subject;
    private LocalDate generatedDate;
    public boolean hidden;


    public Hangman(String title, String word, String hint, float value, String subject, LocalDate generatedDate, boolean hidden) {
        this.title = title;
        this.word = word;
        this.hint = hint;
        this.value = value;
        this.subject = subject;
        this.generatedDate = generatedDate;
        this.hidden = hidden;
    }
}



