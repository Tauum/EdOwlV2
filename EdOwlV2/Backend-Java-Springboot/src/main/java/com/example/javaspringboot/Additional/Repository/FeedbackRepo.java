package com.example.javaspringboot.Additional.Repository;

import com.example.javaspringboot.Additional.Model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FeedbackRepo extends JpaRepository<Feedback, Long> {

    Feedback findFeedbackById(Long id);

    void deleteFeedbackById(Long id);

    List<Feedback> findAllByOrderByGeneratedDate();
}

