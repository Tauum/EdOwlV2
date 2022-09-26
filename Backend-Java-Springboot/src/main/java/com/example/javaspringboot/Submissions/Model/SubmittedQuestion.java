package com.example.javaspringboot.Submissions.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "Submitted_Question")
public class SubmittedQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long questionId;
    private String question;
    private String explaination;
    private int questionValue;
    private float score;

    private Long answerId;
    private String answer;

    private boolean correct;

    private boolean coppied;


    public SubmittedQuestion(Long questionId, String question, Long answerId, String answer, String explaination, boolean correct, float score, boolean coppied, int questionValue) {
        this.questionId = questionId;
        this.question = question;
        this.answerId = answerId;
        this.answer = answer;
        this.explaination = explaination;
        this.correct = correct;
        this.score = score;
        this.coppied = coppied;
        this.questionValue = questionValue;
    }
}
