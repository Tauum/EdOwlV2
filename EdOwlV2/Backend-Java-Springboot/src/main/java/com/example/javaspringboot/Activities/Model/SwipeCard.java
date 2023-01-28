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
public class SwipeCard {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;
    @Nullable
    private float value;
    private String question;
    @Nullable
    private String subText;
    @Nullable
    private String imageURL;

    private Boolean correct = false;
    public String explaination;

    public void setGeneral(float value, String question, String subText, String imageURL, String explaination, Boolean correct){
        this.value = value;
        this.question = question;
        this.subText = subText;
        this.imageURL = imageURL;
        this.explaination = explaination;
        this.correct = correct;
    }

}
