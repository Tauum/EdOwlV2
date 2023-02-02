package com.example.javaspringboot.Activities.Model;

import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Data @NoArgsConstructor @AllArgsConstructor @Entity //needed for database mapping
@Table(name = "swipe")
public class Swipe {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @OneToMany(fetch =  FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "swipe_game_cards",
            joinColumns = { @JoinColumn(name = "swipe_id")},
            inverseJoinColumns = { @JoinColumn(name = "card_id")})
    @Column(name = "swipe_cards")
    public Set<SwipeCard> cards;

    private LocalDate generatedDate;
    public String subject;
    @Nullable
    private float value;
    public String endContent;
    public String description;
    @Nullable
    public String moduleCode;
    public boolean hidden;

    public Swipe(String title, LocalDate generatedDate, String subject, float value, String endContent, String description, String moduleCode, boolean hidden) {
        this.title = title;
        this.generatedDate = generatedDate;
        this.subject = subject;
        this.value = value;
        this.endContent = endContent;
        this.description = description;
        this.moduleCode = moduleCode;
        this.hidden = hidden;
    }

    public Swipe(String title, LocalDate generatedDate, String subject, float value, String endContent, String description, boolean hidden) {
        this.title = title;
        this.generatedDate = generatedDate;
        this.subject = subject;
        this.value = value;
        this.endContent = endContent;
        this.description = description;
        this.hidden = hidden;
    }

    public Swipe(String title, Set<SwipeCard> cards, LocalDate generatedDate, String subject, float value, String endContent, String description, boolean hidden) {
        this.title = title;
        this.cards = cards;
        this.generatedDate = generatedDate;
        this.subject = subject;
        this.value = value;
        this.endContent = endContent;
        this.description = description;
        this.hidden = hidden;
    }

    public void setGeneral(String title, float value, boolean hidden, String subject, String description, String endContent){
        this.title = title;
        this.value =value;
        this.hidden = hidden;
        this.subject =subject;
        this.description = description;
        this.endContent = endContent;

    }
}
