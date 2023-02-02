package com.example.javaspringboot.Activities.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDate;

@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "Propagate")
public class Propagate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public String title;
    public String answer;
    public Integer lives;
    public float value;
    private LocalDate generatedDate;
    public boolean hidden;
    public String subject;
    public String endContent;
    public String description;

    @Nullable
    public String moduleCode;

    public Propagate(String title, String answer, Integer lives, float value, LocalDate generatedDate, boolean hidden, String subject, String endContent, String description) {
        this.title = title;
        this.answer = answer;
        this.lives = lives;
        this.value = value;
        this.generatedDate = generatedDate;
        this.hidden = hidden;
        this.subject = subject;
        this.endContent = endContent;
        this.description = description;
    }

    public Propagate(String title, String answer, Integer lives, float value, LocalDate generatedDate, boolean hidden, String subject, String endContent, String description, @Nullable String moduleCode) {
        this.title = title;
        this.answer = answer;
        this.lives = lives;
        this.value = value;
        this.generatedDate = generatedDate;
        this.hidden = hidden;
        this.subject = subject;
        this.endContent = endContent;
        this.description = description;
        this.moduleCode = moduleCode;
    }

    public void setGeneral(String title, String endContent, float value, boolean hidden, String subject, String answer, String description, Integer lives){
        this.title = title;
        this.endContent = endContent;
        this.value = value;
        this.hidden = hidden;
        this.subject = subject;
        this.answer = answer;
        this.description = description;
        this.lives = lives;
    }
}
