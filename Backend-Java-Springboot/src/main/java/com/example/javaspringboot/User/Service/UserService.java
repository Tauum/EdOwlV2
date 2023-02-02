package com.example.javaspringboot.User.Service;


import com.example.javaspringboot.Additional.Model.Module;
import com.example.javaspringboot.Additional.Model.ModuleRegisterDto;
import com.example.javaspringboot.Additional.Model.ModuleRegisterDtoRole;
import com.example.javaspringboot.Additional.Service.ModuleService;
import com.example.javaspringboot.Submissions.Model.Statistics;
import com.example.javaspringboot.Submissions.Model.SubmittedHangman;
import com.example.javaspringboot.Submissions.Service.SubmittedHangmanService;
import com.example.javaspringboot.Submissions.Service.SubmittedMatchService;
import com.example.javaspringboot.Submissions.Service.SubmittedQuizService;
import com.example.javaspringboot.User.Model.*;
import com.example.javaspringboot.User.Repository.RoleRepository;
import com.example.javaspringboot.User.Repository.UserRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepo;
    private RoleRepository roleRepo;
    private final PasswordEncoder passwordEncoder;
    private ModuleService moduleService;

    private SubmittedMatchService sMService;
    private SubmittedQuizService sQService;
    private SubmittedHangmanService sHService;

    public UserService(UserRepository userRepo, RoleRepository roleRepo, PasswordEncoder passwordEncoder,
                       @Lazy ModuleService moduleService,
                       SubmittedMatchService sMService, SubmittedQuizService sQService, SubmittedHangmanService sHService) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.passwordEncoder = passwordEncoder;
        this.moduleService = moduleService;
        this.sMService = sMService;
        this.sQService = sQService;
        this.sHService = sHService;
    }

// FIGURE OUT IF THESE SKEANY THROWS ARE RELEVANT IN MYUSERDETAILSSERVICE
//    @SneakyThrows
//    @Override // THIS OVERWRITES THE DEFAULT SPRING SECURITY ONE
//    public UserDetails loadUserByUsername(String email){
//        User user = findUserByEmail(email);
//        if ( user != null){
//            if (user.isEnabled()){
//                Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
//                user.getRoles().forEach(role -> { authorities.add(new SimpleGrantedAuthority(role.getName().toString()));});
////                sucessfulLogin(user); // this works wether correct or false login request
//                return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
//            }
//            else { throw new AccountLockedException("AccountLockedException"); }
//        }
//        else{ throw new EntityNotFoundException("EntityNotFoundException"); }
//    }


    public Boolean addUser(User user) {
        if (userRepo.findUserByEmail(user.getEmail()) == null){
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            Set<Role> roles = new HashSet<>();
            Role undefined = roleRepo.findByName(EnumRole.ROLE_UNDEFINED);
            if (undefined == null) { roleRepo.save(new Role(EnumRole.ROLE_UNDEFINED)); }
            roles.add(undefined);
            user.setRoles(roles);

            userRepo.save(user);
            return true;
        }
        return false;
    }

    public List<User> findAll() {
        return userRepo.findAll();
    }

    public Boolean addRoleToUser(Long userId, Long roleId){
        User findUser = findUserById(userId);
        Role findRole = roleRepo.findRoleById(roleId);
        if (findUser != null && findRole != null && !findUser.getRoles().contains(findRole)) {
            try {
                findUser.getRoles().add(findRole);
                userRepo.save(findUser);
                return true;
            }
            catch (Exception e) { return null; }
        }
        return null;
    }

    public Boolean removeRoleFromUser(Long userId, Long roleId){
        User findUser = findUserById(userId);
        Role findRole = roleRepo.findRoleById(roleId);
        if (findUser != null && findRole != null && findUser.getRoles().contains(findRole)) {
            try {
                findUser.getRoles().remove(findRole);
                userRepo.save(findUser);
                return true;
            }
            catch (Exception e) { return null;  }
        }
        return null;
    }

    public boolean initialRegister(InitialRegister initialRegister, Long id) {
        User find = findUserById(id);
        if (find != null){
            find.setFirstName(initialRegister.getFirstName());
            find.setLastName(initialRegister.getLastName());
            if (initialRegister.getUserInstitutionId() != null){ find.setUserInstitutionId(initialRegister.getUserInstitutionId()); }
            if (initialRegister.getAvatar() != null){ find.setAvatar(initialRegister.getAvatar()); }
            else{ find.setAvatar(0); }
            find.setInitialRegister(true);

            userRepo.save(find);
            if (initialRegister.getModulesSelected() != null){ // this doesnt work
                for (String moduleSelected:  initialRegister.getModulesSelected() ) {
                    Module foundModule = moduleService.findFirstModuleContainingCode(moduleSelected);
                    if (foundModule != null) { moduleService.addStudentToModule(foundModule.getId(), find.getId()); }
                }
            }

            if (initialRegister.isStudent()){
                Role undefinedRole = roleRepo.findByName(EnumRole.ROLE_UNDEFINED);
                Role studentRole = roleRepo.findByName(EnumRole.ROLE_STUDENT);
                if (undefinedRole != null && undefinedRole != null){
                    addRoleToUser(find.getId(),studentRole.getId());
                    removeRoleFromUser(find.getId(),undefinedRole.getId());
                }
            }
            return true;
        }
        else{  return false; }
    }

    public User updateUser(User user) {

        User find = findUserById(user.getId());

        if (find != null) {
            try {
                if (user.getFirstName() != null && user.getFirstName().length() > 1 && user.getFirstName() != find.getFirstName()) {
                    find.setFirstName(user.getFirstName());
                }
            } catch (Exception e) {
            }

            try {
                if (user.getLastName() != null && user.getLastName().length() > 1 && user.getLastName() != find.getLastName()) {
                    find.setLastName(user.getLastName());
                }
            } catch (Exception e) {
            }

            try {
                if (user.getEmail() != null && user.getEmail() != find.getEmail() && user.getEmail().length() > 3) {
                    find.setEmail(user.getEmail());
                }
            } catch (Exception e) {
            }
            try {
                if (user.getDob() != null && user.getDob() != find.getDob()){
                    find.setDob(user.getDob());
                }
            }
            catch (Exception e){ }

            try {
                if (user.getRoles() != null && user.getRoles() != find.getRoles()) {
                    find.setRoles(user.getRoles());
                }
            } catch (Exception e) {
            }

            // REDO THIS BLOCK BELOW TO UPDATE THE USERS STUDYING MODULES AND ADMIN MODULES
//            try {
//                if (user.getModules() != null && user.getModules() != find.getModules()){
//                    find.setModules(user.getModules());
//                }
//            }
//            catch (Exception e){ }
            return userRepo.save(find);
        }
        return null;
    }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteUser(Long id) {
//        User findUser = findUserById(id);
//        if(findUser != null){
//            findUser.setRoles(new HashSet<>());
//            userRepo.save(findUser);
//            userRepo.deleteUserById(id);
//        }
        userRepo.deleteUserById(id);
    }

    public User findUserById(Long id) {
        User user = userRepo.findUserById(id);
        if (user != null) {
            return user;
        }
        return null;
    }

    public User findUserByEmail(String email) {
        User user = userRepo.findUserByEmail(email);
        if (user != null) { return user; }
        return null;
    }

    public List<User> findByRoleContains(Long roleId) {
        Role findRole = roleRepo.findRoleById(roleId);
        if (findRole != null){
            return userRepo.findAllByRolesContains(findRole);
        }
        return null;
    }
    //fix this to not be plain text and more complex
    public Boolean resetUserPassword(String email) {
        User findUser = userRepo.findUserByEmail(email);

        if (findUser != null && findUser.getLastName() != null){
            findUser.setPassword(passwordEncoder.encode("PUT SOMETHING MORE SECURE HERE"));
            userRepo.save(findUser);
            return true;
        }
        return null;
    }

    //fix this to not be plain text and more complex
    public Boolean updatetUserPassword(User requestingUser, String newPassword) {
        User findUser = userRepo.findUserByEmail(requestingUser.getEmail());
        if(findUser != null && requestingUser == findUser && findUser.getPassword() != newPassword && newPassword.length() > 6){
            findUser.setPassword(passwordEncoder.encode("PUT SOMETHING MORE SECURE HERE"));
            userRepo.save(findUser);
            return true;
        }
        return null;
    }


    public UserProfile findUserProfileUserByEmail(String email) {
        User user = userRepo.findUserByEmail(email);
        if (user != null){
            UserProfile userProfile = new UserProfile(
                    user.getId(),  user.getEmail(), user.getUserInstitutionId(),
                    user.getFirstName(), user.getLastName(),
                    user.getCreatedOn(),  user.getUpdatedOn(), user.getDob(),
                    user.isTermsAndConditions(), user.isInitialRegister(),
                    user.getAvatar(), user.isEnabled(), user.getRoles()
            );
            List<ModuleRegisterDtoRole> modules  = moduleService.findAllModulesRegisterDTOForUser(user);
            userProfile.setModules(modules);

            return userProfile;
        }
        return null;
    }
//        public UserProfile findUserProfileUserByEmail(String email) {
//        User user = userRepo.findUserByEmail(email);
//        if (user != null){
//            UserProfile userProfile = new UserProfile(
//                    user.getId(),  user.getEmail(), user.getUserInstitutionId(),
//                    user.getFirstName(), user.getLastName(),
//                    user.getCreatedOn(),  user.getUpdatedOn(), user.getDob(),
//                    user.isTermsAndConditions(), user.isInitialRegister(),
//                    user.getAvatar(), user.isEnabled(), user.getRoles()
//            );
//            List<ModuleRegisterDtoRole> modules  = moduleService.findAllModulesRegisterDTOForUser(user);
//            userProfile.setModules(modules);
//
//            return userProfile;
//        }
//        return null;
//    }

    public UserProfile findUserProfileUserById(Long id) {
        User user = userRepo.findUserById(id);
        if (user != null){
            UserProfile userProfile = new UserProfile(
                    user.getId(),  user.getEmail(), user.getUserInstitutionId(),
                    user.getFirstName(), user.getLastName(),
                    user.getCreatedOn(),  user.getUpdatedOn(), user.getDob(),
                    user.isTermsAndConditions(), user.isInitialRegister(),
                    user.getAvatar(), user.isEnabled(), user.getRoles()
            );
            List<ModuleRegisterDtoRole> modules  = moduleService.findAllModulesRegisterDTOForUser(user);
            userProfile.setModules(modules);

            return userProfile;
        }
        return null;
    }

    public UserProfileAndStats findUserProfileAndStatsByEmail(String email) {
        UserProfile uP = findUserProfileUserByEmail(email);
        if (uP != null){

            UserProfileAndStats userProfileAndStats = new UserProfileAndStats(
                    uP.getId(), uP.getEmail(), uP.getUserInstitutionId(),
                    uP.getFirstName(), uP.getLastName(),
                    uP.getCreatedOn(), uP.getUpdatedOn(), uP.getDob(),
                    uP.isTermsAndConditions(), uP.isInitialRegister(),
                    uP.getAvatar(), uP.isEnabled(), uP.getRoles(), uP.getModules()
            );

            List<Statistics> statisticsList = new ArrayList<>();
            var matches = sMService.getStatisticsForUser(uP.getId());
            if (matches != null){ statisticsList.add(matches); }
            var quizzes =  sQService.getStatisticsForUser(uP.getId());
            if (quizzes != null){ statisticsList.add(quizzes); }
            var hangmen =  sHService.getStatisticsForUser(uP.getId());
            if (hangmen != null){ statisticsList.add(hangmen); }

            userProfileAndStats.setStatisticsList(statisticsList);
            return userProfileAndStats;
        }
        return null;
    }

    public UserProfileAndStats findUserProfileAndStatsById(Long id) {
        UserProfile uP = findUserProfileUserById(id);
        if (uP != null){
            UserProfileAndStats userProfileAndStats = new UserProfileAndStats(
                    uP.getId(), uP.getEmail(), uP.getUserInstitutionId(),
                    uP.getFirstName(), uP.getLastName(),
                    uP.getCreatedOn(), uP.getUpdatedOn(), uP.getDob(),
                    uP.isTermsAndConditions(), uP.isInitialRegister(),
                    uP.getAvatar(), uP.isEnabled(), uP.getRoles(), uP.getModules()
            );
            List<Statistics> statisticsList = new ArrayList<>();
            var matches = sMService.getStatisticsForUser(uP.getId());
            if (matches != null){ statisticsList.add(matches); }
            var quizzes =  sQService.getStatisticsForUser(uP.getId());
            if (quizzes != null){ statisticsList.add(quizzes); }
            var hangmen =  sHService.getStatisticsForUser(uP.getId());
            if (hangmen != null){ statisticsList.add(hangmen); }

            userProfileAndStats.setStatisticsList(statisticsList);
            return userProfileAndStats;
        }
        return null;
    }

    public List<UserProfile> findAllUserProfiles() {
        List<User> users = userRepo.findAll();
        List<UserProfile> userProfiles = new ArrayList<>();
        for(User user : users){
            try {
                UserProfile userProfile = new UserProfile(
                        user.getId(),  user.getEmail(), user.getUserInstitutionId(),
                        user.getFirstName(), user.getLastName(),
                        user.getCreatedOn(),  user.getUpdatedOn(), user.getDob(),
                        user.isTermsAndConditions(), user.isInitialRegister(),
                        user.getAvatar(), user.isEnabled(), user.getRoles()
                );
                List<ModuleRegisterDtoRole> modules  = moduleService.findAllModulesRegisterDTOForUser(user);
                userProfile.setModules(modules);
                userProfiles.add(userProfile);
            }
            catch(Error err){}
        }
        return userProfiles;
    }

//    public List<UserProfile> findAllUserProfiles() {
//        List<User> users = userRepo.findAll();
//        List<UserProfile> userProfiles = new ArrayList<>();
//        for(User user : users){
//            try {
//                UserProfile userProfile = new UserProfile(
//                        user.getId(),  user.getEmail(), user.getUserInstitutionId(),
//                        user.getFirstName(), user.getLastName(),
//                        user.getCreatedOn(),  user.getUpdatedOn(), user.getDob(),
//                        user.isTermsAndConditions(), user.isInitialRegister(),
//                        user.getAvatar(), user.isEnabled(), user.getRoles()
//                );
//                List<ModuleRegisterDto> modules  = moduleService.findAllModulesRegisterDTOForUserId(user.getId());
//                userProfile.setModules(modules);
//                userProfiles.add(userProfile);
//            }
//            catch(Error err){}
//        }
//        return userProfiles;
//    }
}