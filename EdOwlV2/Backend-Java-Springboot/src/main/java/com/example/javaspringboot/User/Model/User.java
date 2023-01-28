package com.example.javaspringboot.User.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor @AllArgsConstructor
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    private String userInstitutionId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    private LocalDate dob;

    @Column(name = "created_on")
    private Date createdOn;

    @Column(name = "updated_on")
    private Date updatedOn;

    @Column(name = "terms_and_conditions")
    private boolean termsAndConditions = false;

    @Column(name = "initial_register")
    private boolean initialRegister = false;

    @Nullable
    private Integer avatar;

    private boolean enabled=true;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public User(String email, String password, LocalDate dob, Date createdOn, boolean termsAndConditions) {
        this.email = email;
        this.password = password;
        this.dob = dob;
        this.createdOn = createdOn;
        this.termsAndConditions = termsAndConditions;
    }

    public User(String email, String password, String userInstitutionId, String firstName, String lastName, Date createdOn, Date updatedOn, LocalDate dob, boolean termsAndConditions, boolean initialRegister, Integer avatar, boolean enabled, Set<Role> roles) {
        this.email = email;
        this.password = password;
        this.userInstitutionId = userInstitutionId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdOn = createdOn;
        this.updatedOn = updatedOn;
        this.dob = dob;
        this.termsAndConditions = termsAndConditions;
        this.initialRegister = initialRegister;
        this.avatar = avatar;
        this.enabled = enabled;
        this.roles = roles;
    }
}
