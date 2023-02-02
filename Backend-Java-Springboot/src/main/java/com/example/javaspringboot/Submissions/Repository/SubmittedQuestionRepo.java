package com.example.javaspringboot.Submissions.Repository;

import com.example.javaspringboot.Submissions.Model.SubmittedQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubmittedQuestionRepo extends JpaRepository<SubmittedQuestion, Long> {

    void deleteSubmittedQuestionById(Long id);

    SubmittedQuestion findSubmittedQuestionById(Long id);
}