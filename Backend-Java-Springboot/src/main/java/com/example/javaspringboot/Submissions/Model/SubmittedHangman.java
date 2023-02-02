package com.example.javaspringboot.Submissions.Model;

import com.example.javaspringboot.User.Model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data @NoArgsConstructor @AllArgsConstructor @Entity //needed for database mapping
@Table(name = "Submitted_Hangman")
public class SubmittedHangman {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private int incorrect;
    private boolean hintUsed;
    private boolean completed;
    private LocalDate generatedDate;
    private int timeTaken;
    private float score;

    public Long shifterId;


    public boolean rating;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    public User user; // on submit it inserts this value instead of referencing

    public SubmittedHangman(int incorrect, boolean hintUsed, boolean completed, LocalDate generatedDate, int timeTaken, float score, Long shifterId, User user) {
        this.incorrect = incorrect;
        this.hintUsed = hintUsed;
        this.completed = completed;
        this.generatedDate = generatedDate;
        this.timeTaken = timeTaken;
        this.score = score;
        this.shifterId = shifterId;
        this.user = user;
    }
}

