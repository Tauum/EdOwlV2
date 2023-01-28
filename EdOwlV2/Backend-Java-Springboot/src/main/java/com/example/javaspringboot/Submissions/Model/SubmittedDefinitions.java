package com.example.javaspringboot.Submissions.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity //needed for database mapping
@Table(name = "submitted_definitions")
public class SubmittedDefinitions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long definitionId;

    private float score;

    private boolean correct;
}
