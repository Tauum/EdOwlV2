package com.example.javaspringboot.Additional.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "feedback")
public class Feedback {
        @Id
        @GeneratedValue( strategy = GenerationType.IDENTITY)
        private Long id;
        private String Question;
        private LocalDate lifetime;
        private LocalDate generatedDate;
        private FeedbackType feedbackType;

//    private List<FeedbackSubmission> submissions = new HashSet<>();

    public Feedback(String question, LocalDate lifetime, LocalDate generatedDate, FeedbackType feedbackType) {
        Question = question;
        this.lifetime = lifetime;
        this.generatedDate = generatedDate;
        this.feedbackType = feedbackType;
    }

}
