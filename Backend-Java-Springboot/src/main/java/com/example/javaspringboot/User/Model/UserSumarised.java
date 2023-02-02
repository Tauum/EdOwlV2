package com.example.javaspringboot.User.Model;

import com.example.javaspringboot.Additional.Model.ModuleRegisterDto;
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
public class UserSumarised {
    private long id;

    private String userInstitutionId;

    private String firstName;

    private String lastName;

    private LocalDate dob;

    private boolean enabled=true;

}
