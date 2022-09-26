package com.example.javaspringboot.Activities.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "quiz")
public class Quiz {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    public String title;
    @OneToMany(fetch =  FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "quiz_questions",
            joinColumns = { @JoinColumn(name = "quiz_id")},
            inverseJoinColumns = { @JoinColumn(name = "question_id")})
    @Column(name = "questions")
    public Set<Question> questions;
    private LocalDate generatedDate;
    public int timeLimit;
    public float value;
    public boolean hidden;
    public String subject;
    public String endContent;
    public String description;

    @Nullable
    public String moduleCode;

    public Quiz(String title, Set<Question> questions, String endContent, String description, LocalDate generatedDate, int timeLimit, float value, boolean hidden, String subject) {
        this.title = title;
        this.questions = questions;
        this.generatedDate = generatedDate;
        this.timeLimit = timeLimit;
        this.value = value;
        this.hidden = hidden;
        this.subject = subject;
        this.endContent = endContent;
        this.description = description;
    }

    public Quiz(Long id, String title, LocalDate generatedDate, int timeLimit, float value, boolean hidden, String subject, String endContent, String description, @Nullable String moduleCode) {
        this.id = id;
        this.title = title;
        this.generatedDate = generatedDate;
        this.timeLimit = timeLimit;
        this.value = value;
        this.hidden = hidden;
        this.subject = subject;
        this.endContent = endContent;
        this.description = description;
        this.moduleCode = moduleCode;
    }

    public void setGeneral(String title, int timeLimit, String description, String endContent, float value, boolean hidden, String subject){
        this.title = title;
        this.timeLimit =timeLimit;
        this.description = description;
        this.endContent = endContent;
        this.value =value;
        this.hidden = hidden;
        this.subject =subject;
    }

}

