package com.example.javaspringboot.Activities.Model;

import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity //needed for database mapping
@Table(name = "swipe_card")
public class Swipe_Card {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    public Boolean correct;
    @Nullable
    private float value;
    private String question;
    @Nullable
    private String subText;
    @Nullable
    private String imageURL;
    private Boolean result = false;

    public void setGeneral(float value, String question, String subText, String imageURL, boolean correct){
        this.value = value;
        this.correct = correct;
        this.question = question;
        this.subText = subText;
        this.imageURL = imageURL;
    }

}
