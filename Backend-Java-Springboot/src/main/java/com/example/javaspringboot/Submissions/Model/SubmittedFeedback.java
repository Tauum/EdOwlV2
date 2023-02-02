package com.example.javaspringboot.Submissions.Model;

import com.example.javaspringboot.Additional.Model.Feedback;
import com.example.javaspringboot.User.Model.User;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "submitted_Feedback")
public class SubmittedFeedback {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "submitted_Feedback_id")
    private Feedback feedback;

    private LocalDate generatedDate;

    @Nullable
    private String answer1;
    @Nullable
    private float answer2;
    @Nullable
    private boolean answer3;
    @Nullable
    private boolean answer4;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    public User user;

    public SubmittedFeedback(Feedback feedback, LocalDate generatedDate, String answer1, float answer2, boolean answer3, boolean answer4, User user) {
        this.feedback = feedback;
        this.generatedDate = generatedDate;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.user = user;
    }


}
