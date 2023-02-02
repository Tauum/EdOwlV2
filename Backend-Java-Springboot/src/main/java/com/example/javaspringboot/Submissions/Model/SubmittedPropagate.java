package com.example.javaspringboot.Submissions.Model;

import com.example.javaspringboot.Activities.Model.Propagate;
import com.example.javaspringboot.User.Model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "Submitted_Propagate")
public class SubmittedPropagate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    private Long propagateId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User user;

    private float score;
    private LocalDate generatedDate;
    private int timeTaken;
    private boolean rating;

    @OneToMany(fetch =  FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "submitted_propagate_attempts",
            joinColumns = { @JoinColumn(name = "propagate_id")},
            inverseJoinColumns = { @JoinColumn(name = "attempt_id")})
    @Column(name = "attempt")
    public List<SubmittedPropagateAttempt> submittedPropagateAttempts;

    public SubmittedPropagate(Long propagateId, User user, float score, LocalDate generatedDate, int timeTaken, boolean rating, List<SubmittedPropagateAttempt> submittedPropagateAttempts) {
        this.propagateId = propagateId;
        this.user = user;
        this.score = score;
        this.generatedDate = generatedDate;
        this.timeTaken = timeTaken;
        this.rating = rating;
        this.submittedPropagateAttempts = submittedPropagateAttempts;
    }

}
