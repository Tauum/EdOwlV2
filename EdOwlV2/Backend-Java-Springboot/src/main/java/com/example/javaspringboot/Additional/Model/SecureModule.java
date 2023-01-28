package com.example.javaspringboot.Additional.Model;

import com.example.javaspringboot.Activities.Model.*;
import com.example.javaspringboot.User.Model.UserSumarised;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SecureModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code;

    @Nullable
    private String name;

    private Set<UserSumarised> students = new HashSet<>();

    private Set<UserSumarised> admins = new HashSet<>();

    private List<Quiz> quizzes = new ArrayList<>();

    private List<Hangman> hangmen = new ArrayList<>();

    private List<Extra> extras = new ArrayList<>();

    private List<Shifter> shifters = new ArrayList<>();

    private List<Feedback> feedbacks = new ArrayList<>();

    private List<Swipe> swipes = new ArrayList<>();


    public SecureModule(String code, String name, Set<UserSumarised> students, Set<UserSumarised> admins) {
        this.code = code;
        this.students = students;
        this.admins = admins;
        this.name = name;
    }

    public SecureModule(String code, Set<UserSumarised> students, Set<UserSumarised> admins, List<Quiz> quizzes, List<Hangman> hangmen, List<Extra> extras, List<Shifter> shifters, List<Feedback> feedbacks, List<Swipe> swipes, @Nullable String name) {
        this.code = code;
        this.students = students;
        this.admins = admins;
        this.quizzes = quizzes;
        this.hangmen = hangmen;
        this.extras = extras;
        this.shifters = shifters;
        this.feedbacks = feedbacks;
        this.swipes = swipes;
        this.name = name;
    }

    public SecureModule(Long id, String code, String name, List<Quiz> quizzes, List<Hangman> hangmen, List<Extra> extras, List<Shifter> shifters, List<Feedback> feedbacks, List<Swipe> swipes) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.quizzes = quizzes;
        this.hangmen = hangmen;
        this.extras = extras;
        this.shifters = shifters;
        this.feedbacks = feedbacks;
        this.swipes = swipes;
    }
}
