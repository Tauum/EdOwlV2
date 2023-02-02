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
    private float score;
    private Long answerId;
    private String answer;
    private boolean correct;
    private boolean coppied;

    public SubmittedQuestion(Long questionId,Long answerId, String answer, boolean correct, float score, boolean coppied) {
        this.questionId = questionId;
        this.answerId = answerId;
        this.answer = answer;
        this.correct = correct;
        this.score = score;
        this.coppied = coppied;
    }
}
