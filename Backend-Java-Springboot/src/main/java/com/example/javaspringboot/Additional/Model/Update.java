package com.example.javaspringboot.Additional.Model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;


@Data @NoArgsConstructor @AllArgsConstructor @Entity //needed for database mapping
@Table(name = "updates")
public class Update {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    public Long id;
    public String content;
    public String redirect;
    public LocalDate generatedDate;

    public Update(String content, String redirect, LocalDate generatedDate) {
        this.content = content;
        this.redirect = redirect;
        this.generatedDate = generatedDate;
    }
}

