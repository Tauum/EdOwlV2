package com.example.javaspringboot.Activities.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "question")
public class Question {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    public String question;
    public String explaination;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "question_answers",
            joinColumns = { @JoinColumn(name = "question_id")},
            inverseJoinColumns = { @JoinColumn(name = "answer_id")})
    @Column(name = "answers")
    public Set<Answer> answers;
    public float value;

    public Question(String question, String explaination, Set<Answer> answers, float value, Quiz quiz) {
        this.question = question;
        this.explaination = explaination;
        this.answers = answers;
        this.value = value;
    }

    public void setGeneral(String question, String explaination, float value){
        this.value = value;
        this.question = question;
        this.explaination = explaination;
    }
}
