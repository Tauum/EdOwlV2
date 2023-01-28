package com.example.javaspringboot.Activities.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "definition")
public class Definition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    public String title;

    public String explaination;
    public String answer;
    public float value;

    public Definition(String title, String answer, String explaination, float value) {
        this.title = title;

        this.answer = answer;
        this.explaination = explaination;
        this.value = value;
    }

    public void setGeneral(String title, String answer, String explaination, float value){
        this.title = title;
        this.answer = answer;
        this.explaination = explaination;
        this.value = value;
    }
}
