package com.example.javaspringboot.Submissions.Model;

import com.example.javaspringboot.Activities.Model.Swipe;
import com.example.javaspringboot.Activities.Model.SwipeCard;
import com.example.javaspringboot.User.Model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data @NoArgsConstructor @AllArgsConstructor
@Entity //needed for database mapping
@Table(name = "submitted_Swipe")
public class SubmittedSwipe {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private Long swipeId;
    private int timeTaken;
    private LocalDate generatedDate;
    private float score;
    private boolean rating;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public User user;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "submitted_swipe_cards",
            joinColumns = { @JoinColumn(name = "swipe_id")},
            inverseJoinColumns = { @JoinColumn(name = "submitted_swipe_card_id")})
    @Column(name = "submitted_swipe_cards")
    public Set<SubmittedSwipeCard> cards = new HashSet<>();

    public SubmittedSwipe(Long swipeId, int timeTaken, User user, LocalDate generatedDate) {
        this.swipeId = swipeId;
        this.timeTaken = timeTaken;
        this.user = user;
        this.generatedDate = generatedDate;
    }

    public SubmittedSwipe(Long swipeId, int timeTaken, LocalDate generatedDate, float score, boolean rating, User user, Set<SubmittedSwipeCard> cards) {
        this.swipeId = swipeId;
        this.timeTaken = timeTaken;
        this.generatedDate = generatedDate;
        this.score = score;
        this.rating = rating;
        this.user = user;
        this.cards = cards;
    }

}
