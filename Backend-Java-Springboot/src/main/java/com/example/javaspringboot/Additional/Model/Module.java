package com.example.javaspringboot.Additional.Model;

import com.example.javaspringboot.Activities.Model.*;
import com.example.javaspringboot.User.Model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data @NoArgsConstructor @AllArgsConstructor @Entity
@Table(name = "module")
public class Module {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique=true)
    private String code;

    @Nullable
    private String name;

    @ManyToMany
    @JoinTable(name="module_students",
       joinColumns = @JoinColumn(name="module_id"),
       inverseJoinColumns =  @JoinColumn(name = "user_id")
    )
    private Set<User> students = new HashSet<>();

    @ManyToMany
    @JoinTable(name="module_admins",
            joinColumns = @JoinColumn(name="module_id"),
            inverseJoinColumns =  @JoinColumn(name = "user_id")
    )
    private Set<User> admins = new HashSet<>();

    @ManyToMany
    @JoinTable(name="module_quizzes",
            joinColumns = @JoinColumn(name="module_id"),
            inverseJoinColumns =  @JoinColumn(name = "quiz_id")
    )
    private List<Quiz> quizzes = new ArrayList<>();

    @ManyToMany
    @JoinTable(name="module_hangmen",
            joinColumns = @JoinColumn(name="module_id"),
            inverseJoinColumns =  @JoinColumn(name = "hangnman_id")
    )
    private List<Hangman> hangmen = new ArrayList<>();

    @OneToMany
    @JoinTable(name="module_extras",
            joinColumns = @JoinColumn(name="module_id"),
            inverseJoinColumns =  @JoinColumn(name = "extra_id")
    )
    private List<Extra> extras = new ArrayList<>();

    @ManyToMany
    @JoinTable(name="module_matches",
            joinColumns = @JoinColumn(name="module_id"),
            inverseJoinColumns =  @JoinColumn(name = "match_id")
    )
    private List<Match> matches = new ArrayList<>();

    @ManyToMany
    @JoinTable(name="module_feedbacks",
            joinColumns = @JoinColumn(name="module_id"),
            inverseJoinColumns =  @JoinColumn(name = "feedback_id")
    )
    private List<Feedback> feedbacks = new ArrayList<>();

    @ManyToMany
    @JoinTable(name="module_swipes",
            joinColumns = @JoinColumn(name="module_id"),
            inverseJoinColumns =  @JoinColumn(name = "swipe_id")
    )
    private List<Swipe> swipes = new ArrayList<>();


    public Module(String code, String name, Set<User> students, Set<User> admins) {
        this.code = code;
        this.students = students;
        this.admins = admins;
        this.name = name;
    }

    public Module(String code, Set<User> students, Set<User> admins, List<Quiz> quizzes, List<Hangman> hangmen, List<Extra> extras, List<Match> matches, List<Feedback> feedbacks, List<Swipe> swipes, @Nullable String description) {
        this.code = code;
        this.students = students;
        this.admins = admins;
        this.quizzes = quizzes;
        this.hangmen = hangmen;
        this.extras = extras;
        this.matches = matches;
        this.feedbacks = feedbacks;
        this.swipes = swipes;
        this.name = name;
    }

    public Module(String code, String name, List<Quiz> quizzes, List<Hangman> hangmen, List<Extra> extras, List<Match> matches, List<Feedback> feedbacks, List<Swipe> swipes) {
        this.code = code;
        this.name = name;
        this.quizzes = quizzes;
        this.hangmen = hangmen;
        this.extras = extras;
        this.matches = matches;
        this.feedbacks = feedbacks;
        this.swipes = swipes;
    }

    public void addStudent(User user) { students.add(user);}
    public void addAdmin(User user) { admins.add(user); }

    public void removeStudent(User user) {students.remove(user);}
    public void removeAdmin(User user) {admins.remove(user);}

    public void addExtra(Extra extra) {extras.add(extra);}
    public void removeExtra(Extra extra) {extras.remove(extra);}

//    public void activityInModule()

}