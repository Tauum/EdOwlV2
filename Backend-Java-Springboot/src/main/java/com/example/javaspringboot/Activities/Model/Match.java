package com.example.javaspringboot.Activities.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "match_definitions",
            joinColumns = { @JoinColumn(name = "match_id")},
            inverseJoinColumns = { @JoinColumn(name = "definition_id")})
    @Column(name = "definitions")
    public Set<Definition> definitions = new HashSet<>();
    public String title;
    public String subject;
    private LocalDate generatedDate;
    public float value;
    public boolean hidden;

    public Match(Set<Definition> definitions, String title, String subject, LocalDate generatedDate, float value, boolean hidden) {
        this.definitions = definitions;
        this.title = title;
        this.subject = subject;
        this.generatedDate = generatedDate;
        this.value = value;
        this.hidden = hidden;
    }

    public void setGeneral(String title, float value, boolean hidden, String subject){
        this.title = title;
        this.value =value;
        this.hidden = hidden;
        this.subject =subject;
    }

}
