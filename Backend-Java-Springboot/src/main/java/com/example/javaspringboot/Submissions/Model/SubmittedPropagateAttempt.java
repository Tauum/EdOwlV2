package com.example.javaspringboot.Submissions.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "Submitted_Attempt")
public class SubmittedPropagateAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String word;

    public SubmittedPropagateAttempt(String word) {
        this.word = word;
    }
}
