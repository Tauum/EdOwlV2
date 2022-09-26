package com.example.javaspringboot.Activities.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "answer")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public String content;
    public Boolean correct;

    public Answer(String content, Boolean correct) {
        this.content = content;
        this.correct = correct;
    }

    public void setGeneral(String content, boolean correct){
        this.content = content;
        this.correct = correct;
    }

}

