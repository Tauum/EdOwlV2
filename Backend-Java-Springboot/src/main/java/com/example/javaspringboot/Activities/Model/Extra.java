package com.example.javaspringboot.Activities.Model;

import com.example.javaspringboot.User.Model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;


@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "Extra")
public class Extra {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    public Long id;
    public String title;
    public String summary;
    public String content;
    public String author;
    public LocalDate generatedDate;
    public String video;
    public Boolean hidden;
    public int views = 0;
    @Nullable
    public String moduleCode;

    public Extra(String title, String summary, String content, String author,
        LocalDate generatedDate, String video, Boolean hidden, int views, String moduleCode) {
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.author = author;
        this.generatedDate = generatedDate;
        this.video = video;
        this.hidden = hidden;
        this.views = views;
        this.moduleCode = moduleCode;
    }

    public Extra(String title, String summary, String content, String author,
        LocalDate generatedDate, String video, boolean hidden, int views) {
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.author = author;
        this.generatedDate = generatedDate;
        this.video = video;
        this.hidden = hidden;
        this.views = views;
    }

    public Extra(String title, String summary, String content, String author,
        LocalDate generatedDate, String video, Boolean hidden) {
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.author = author;
        this.generatedDate = generatedDate;
        this.video = video;
        this.hidden = hidden;
    }


}

