package com.example.javaspringboot.Submissions.Model;

import com.example.javaspringboot.User.Model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "Submitted_Shifter")
public class SubmittedShifter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    public Long shifterId;
    private int incorrect;
    private int correct;
    private LocalDate generatedDate;
    private int timeTaken;
    private float score;

    public boolean rating;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    public User user;

    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinTable(name = "submitted_shifter_definitions",
            joinColumns = { @JoinColumn(name = "submittedShifter_id")},
            inverseJoinColumns = { @JoinColumn(name = "submittedDefinition_id")})
    @Column(name = "submitted_definitions")
    public List<SubmittedDefinitions> submittedDefinitions = new ArrayList<>();

    public SubmittedShifter(Long shifterId, int incorrect, int correct, LocalDate generatedDate, int timeTaken, float score, User user) {
        this.shifterId = shifterId;
        this.incorrect = incorrect;
        this.correct = correct;
        this.generatedDate = generatedDate;
        this.timeTaken = timeTaken;
        this.score = score;
        this.user = user;
    }

    public SubmittedShifter(Long shifterId, int incorrect, int correct, LocalDate generatedDate, int timeTaken, float score, boolean rating, User user, List<SubmittedDefinitions> submittedDefinitions) {
        this.shifterId = shifterId;
        this.incorrect = incorrect;
        this.correct = correct;
        this.generatedDate = generatedDate;
        this.timeTaken = timeTaken;
        this.score = score;
        this.rating = rating;
        this.user = user;
        this.submittedDefinitions = submittedDefinitions;
    }
}
