package com.example.javaspringboot.Submissions.Model;

import com.example.javaspringboot.Activities.Model.SwipeCard;
import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity //needed for database mapping
@Table(name = "submitted_card")
public class SubmittedSwipeCard
    {
        @Id
        @GeneratedValue( strategy = GenerationType.IDENTITY)
        private Long id;
        public Boolean correct;
        public Long cardId;
        public int score;
    }

