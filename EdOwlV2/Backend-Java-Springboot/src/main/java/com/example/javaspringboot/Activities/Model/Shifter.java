package com.example.javaspringboot.Activities.Model;

import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "Shifters")
public class Shifter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "shifter_definitions",
            joinColumns = { @JoinColumn(name = "shifter_id")},
            inverseJoinColumns = { @JoinColumn(name = "definition_id")})
    @Column(name = "definitions")
    public Set<Definition> definitions = new HashSet<>();

    public String title;
    public String subject;
    private LocalDate generatedDate;
    public float value;
    public boolean hidden;
    public String endContent;
    public String description;
    @Nullable
    public String moduleCode;

    public Shifter(Set<Definition> definitions, String title, String subject, LocalDate generatedDate, float value, boolean hidden, String endContent, String description, String moduleCode) {
        this.definitions = definitions;
        this.title = title;
        this.subject = subject;
        this.generatedDate = generatedDate;
        this.value = value;
        this.hidden = hidden;
        this.endContent = endContent;
        this.description = description;
        this.moduleCode = moduleCode;
    }

    public Shifter(String title, String subject, LocalDate generatedDate, float value, boolean hidden, String endContent, String description, String moduleCode) {
        this.title = title;
        this.subject = subject;
        this.generatedDate = generatedDate;
        this.value = value;
        this.hidden = hidden;
        this.endContent = endContent;
        this.description = description;
        this.moduleCode = moduleCode;
    }

    public Shifter(String title, String subject, LocalDate generatedDate, float value, boolean hidden, String endContent, String description) {
        this.title = title;
        this.subject = subject;
        this.generatedDate = generatedDate;
        this.value = value;
        this.hidden = hidden;
        this.endContent = endContent;
        this.description = description;
    }

    public void setGeneral(String title, float value, boolean hidden, String subject,String endContent, String description
    ){
        this.title = title;
        this.subject = subject;
        this.value =value;
        this.hidden = hidden;
        this.subject =subject;
        this.endContent = endContent;
        this.description = description;

    }

}
