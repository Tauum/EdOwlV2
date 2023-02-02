package com.example.javaspringboot.User.Model;

import com.example.javaspringboot.Additional.Model.ModuleRegisterDto;
import com.example.javaspringboot.Additional.Model.ModuleRegisterDtoRole;
import com.example.javaspringboot.Submissions.Model.Statistics;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileAndStats {
    private long id;

    private String email;

    private String userInstitutionId;

    private String firstName;

    private String lastName;

    private Date createdOn;

    private Date updatedOn;

    private LocalDate dob;

    private boolean termsAndConditions = false;

    private boolean initialRegister = false;

    @Nullable
    private Integer avatar;

    private boolean enabled=true;

    private Set<Role> roles = new HashSet<>();

//    private List<ModuleRegisterDto> modules;

    private List<ModuleRegisterDtoRole> modules;

    private List<Statistics> statisticsList;

    public UserProfileAndStats(long id, String email, String userInstitutionId, String firstName, String lastName, Date createdOn, Date updatedOn, LocalDate dob, boolean termsAndConditions, boolean initialRegister, @Nullable Integer avatar, boolean enabled, Set<Role> roles,
//                               List<ModuleRegisterDto> modules)
                               List<ModuleRegisterDtoRole> modules)
    {
        this.id = id;
        this.email = email;
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
        this.modules = modules;
    }
}
