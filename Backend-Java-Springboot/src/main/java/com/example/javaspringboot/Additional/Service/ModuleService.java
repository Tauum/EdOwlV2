package com.example.javaspringboot.Additional.Service;

import com.example.javaspringboot.Activities.Model.Extra;
import com.example.javaspringboot.Additional.Model.*;
import com.example.javaspringboot.Additional.Model.Module;
import com.example.javaspringboot.User.Model.User;
import com.example.javaspringboot.Activities.Repository.ModuleRepo;
import com.example.javaspringboot.User.Model.UserSumarised;
import com.example.javaspringboot.User.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class ModuleService {
    private final ModuleRepo moduleRepo;
    private final UserService userService;

    @Autowired
    public ModuleService(ModuleRepo moduleRepository, UserService userService) {
        this.moduleRepo = moduleRepository;
        this.userService = userService;
    }

    public Module addModule(Module module) { return moduleRepo.save(module); }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteModule(Long id) { moduleRepo.deleteModuleById(id);}

    public List<ModuleRegisterDto> findAllModulesRegisterDTO() {
        List<Module> initialList =  moduleRepo.findAll();
        List<ModuleRegisterDto> convertedList = new ArrayList<>();
        for (Module initialModule: initialList ) {
            convertedList.add(convertModuleToMRDTO(initialModule));
        }
        return convertedList;
    }


    public List<ModuleRegisterDto> findModulesRegisterDTOContainingCode(String code) {
        List<Module> initialList =  moduleRepo.findByCodeContains(code);
        List<ModuleRegisterDto> convertedList = new ArrayList<>();
        for (Module initialModule: initialList ) {
            convertedList.add(convertModuleToMRDTO(initialModule));
        }
        return convertedList;
    }

    public ModuleRegisterDto findModuleRegisterDTOContainingCode(String code) {

        Module module = findFirstModuleContainingCode(code);

        return convertModuleToMRDTO(module);
    }

//    public List<ModuleRegisterDto> findAllModulesRegisterDTOForUserId(long id) {
//        List<Module> initialList =  moduleRepo.findByStudentsId(id);
//        List<ModuleRegisterDto> convertedList = new ArrayList<>();
//        for (Module initialModule: initialList ) {
//            convertedList.add(convertModuleToMRDTO(initialModule));
//        }
//        return convertedList;
//    }

    //    public List<ModuleRegisterDto> findAllModulesDTOForUser(Long userId) {
//        List<ModuleRegisterDto> modulesDTO = new ArrayList<>();
//        User user = userService.findUserById(userId);
//        if (user != null){
//            for ( Module module : findAll() ){
//                if (module.getAdmins().contains(user) || module.getStudents().contains(user)){
//                    modulesDTO.add(convertModuleToMRDTO(module));
//                }
//            }
//            return modulesDTO;
//        }
//        return null;
//    }

    public List<ModuleRegisterDtoRole> findAllModulesRegisterDTOForUser(User user) {
        List<Module> initialList =  moduleRepo.findByStudentsId(user.getId());
        List<ModuleRegisterDtoRole> convertedList = new ArrayList<>();
            for (Module initialModule : initialList) {
                if (initialModule.getAdmins().contains(user)) {
                    convertedList.add(convertModuleToMRDTORole(initialModule, true));
                } else if (initialModule.getStudents().contains(user)) {
                    convertedList.add(convertModuleToMRDTORole(initialModule, false));
                }
            }
            return convertedList;
    }

    public List<ModuleRegisterDtoRole> findAllModulesDTOForUser(Long userId) {
        List<ModuleRegisterDtoRole> modulesDTO = new ArrayList<>();
        User user = userService.findUserById(userId);
        if (user != null){
            for ( Module module : findAll() ) {
                if (module.getAdmins().contains(user)) {
                    modulesDTO.add(convertModuleToMRDTORole(module, true));
                } else if (module.getStudents().contains(user)) {
                    modulesDTO.add(convertModuleToMRDTORole(module, false));
                }
            }
            return modulesDTO;
        }
        return null;
    }

    public Module findModuleById(Long id) {
        Module find = moduleRepo.findModuleById(id);
        if (find != null){return find;}
        return null;
    }

    public SecureModule findSecureModuleById(Long id) {
        Module find = moduleRepo.findModuleById(id);
        if (find != null){
            return convertModuleToSecureModule(find);
        }
        return null;
    }

    public Module findFirstModuleContainingCode(String code) {
        return moduleRepo.findFirstByCodeContains(code);
    }

    public List<Module> findModuleContainingCode(String code) {
        return moduleRepo.findByCodeContains(code);
    }

    public List<SecureModule> findSecureModuleContainingCode(String code) {
        List<Module> modules= moduleRepo.findByCodeContains(code);
        List<SecureModule> secureModules = new ArrayList<>();
        for (Module module : modules){
            secureModules.add(convertModuleToSecureModule(module));
        }
        return secureModules;
    }

    public List<Module> findAllModulesForUser(Long userId){
        List<Module> modules = new ArrayList<>();
        User user = userService.findUserById(userId);
        if (user != null){
            for ( Module module : findAll() ){
                if (module.getAdmins().contains(user) || module.getStudents().contains(user)){
                    modules.add(module);
                }
            }
            return modules;
        }
        return null;
    }

    public Object findRandomActivityForUser(Long userId) {
        List<Module> userModules = findAllModulesForUser(userId);
        if (userModules != null){
            Collections.shuffle(userModules);
            boolean notFound = true;
            while (notFound){
                int randomActivityType = new Random().nextInt(5);
                Module randomModule = userModules.get(new Random().nextInt(userModules.size()));

                if (randomActivityType == 0 && randomModule.getQuizzes().size() > 0){ // quiz

                    return randomModule.getQuizzes().get(new Random().nextInt(randomModule.getQuizzes().size()));

//                    randomActivityId = new Random().nextInt(randomModule.getQuizzes().size()); // make to length of activities
//                    randomModule.getQuizzes().get(new Random().nextInt(randomModule.getQuizzes().size()));
////                    List<Quiz> = randomModule.getQuizzes();
////                    randomActivity = randomModule.getQuizzes();

                }
                else if (randomActivityType == 1 && randomModule.getHangmen().size() > 0){ // hangman
                    return randomModule.getHangmen().get(new Random().nextInt(randomModule.getHangmen().size()));

                }
                else if (randomActivityType == 2 && randomModule.getShifters().size() > 0){ // match
                    return randomModule.getShifters().get(new Random().nextInt(randomModule.getShifters().size()));
                }
                else if (randomActivityType == 3 && randomModule.getSwipes().size() > 0){ // swipe
                    return randomModule.getSwipes().get(new Random().nextInt(randomModule.getSwipes().size()));
                }
                else if (randomActivityType == 4){ // propagate
//                    randomActivity = randomModule.get();
                }
                else if (randomActivityType == 5){ // extra
                    return randomModule.getExtras().get(new Random().nextInt(randomModule.getExtras().size()));
                }
                else{

                }
                notFound = false;
            }

        }
        return null;
    }

    public List<SecureModule> findAllSecureModulesForUser(Long userId) {
        List<Module> modules = new ArrayList<>();
        List<SecureModule> secureModules = new ArrayList<>();
        User user = userService.findUserById(userId);
        if (user != null){
            for ( Module module : findAll() ){

                if (module.getAdmins().contains(user) || module.getStudents().contains(user)){
                    secureModules.add(convertModuleToSecureModule(module));
                }
            }
            return secureModules;
        }
        return null;
    }

    public List<Module> findAll() {
        return moduleRepo.findAll();
    }

    public List<SecureModule> findAllSecure() {
        List<Module> modules = findAll();
        List<SecureModule> secureModules = new ArrayList<>();
        for (Module module : modules){
            secureModules.add(convertModuleToSecureModule(module));
        }
        return secureModules;
    }

    public Module addStudentToModule(Long moduleId, Long userId) {
        Module findModule = findModuleById(moduleId);
        User findUser = userService.findUserById(userId);
        if (findModule != null && findUser != null && !findModule.getStudents().contains(findUser) ){
            findModule.addStudent(findUser);
            return moduleRepo.save(findModule);
        }
        return null;
    }

    public Module addAdminToModule(Long moduleId, Long userId) {
        Module findModule = findModuleById(moduleId);
        User findUser = userService.findUserById(userId);
        if (findModule != null && findUser != null && !findModule.getAdmins().contains(findUser)) {
            findModule.addAdmin(findUser);
            return moduleRepo.save(findModule);
        }
        return null;
    }

    public Module removeStudentFromModule(Long moduleId, Long userId) {
        Module findModule = findModuleById(moduleId);
        User findUser = userService.findUserById(userId);
        if (findModule != null && findUser != null && findModule.getStudents().contains(findUser)) {
            findModule.removeStudent(findUser);
            return moduleRepo.save(findModule);
        }
        return null;
    }

    public Module removeAdminFromModule(Long moduleId, Long userId) {
        Module findModule = findModuleById(moduleId);
        User findUser = userService.findUserById(userId);
        if (findModule != null && findUser != null && findModule.getAdmins().contains(findUser)) {
            findModule.removeAdmin(findUser);
            return moduleRepo.save(findModule);
        }
        return null;
    }

    public SecureModule convertModuleToSecureModule(Module module){
        SecureModule secureModule = new SecureModule(
                module.getId(), module.getCode(), module.getName(),
                module.getQuizzes(), module.getHangmen(), module.getExtras(),
                module.getShifters(), module.getFeedbacks(), module.getSwipes());
        Set<UserSumarised> students = new HashSet<>();
        Set<UserSumarised> admins = new HashSet<>();
        for (User user : module.getStudents()) {
            try {
                UserSumarised userSumarised = new UserSumarised(user.getId(), user.getUserInstitutionId(),
                        user.getFirstName(), user.getLastName(), user.getDob(), user.isEnabled());
                students.add(userSumarised);
            }
            catch (Error e){}
        }
        for (User user : module.getAdmins()) {
            try {
                UserSumarised userSumarised = new UserSumarised(user.getId(), user.getUserInstitutionId(),
                        user.getFirstName(), user.getLastName(), user.getDob(), user.isEnabled());
                admins.add(userSumarised);
            }
            catch (Error e) {}
        }
        secureModule.setAdmins(admins);
        secureModule.setStudents(students);

        return secureModule;
    }

    public ModuleRegisterDto convertModuleToMRDTO(Module module){
        ModuleRegisterDto moduleRegisterDTO =
                new ModuleRegisterDto(module.getId(), module.getCode(), module.getName());
        return moduleRegisterDTO;
    }

    public ModuleRegisterDtoRole convertModuleToMRDTORole(Module module, Boolean role){
        ModuleRegisterDtoRole moduleRegisterDTOrole =
                new ModuleRegisterDtoRole(module.getId(), module.getCode(), module.getName(), role);
        return moduleRegisterDTOrole;
    }

    public Boolean addExtraToModule(Extra extra, Long moduleId){
        Module find = findModuleById(moduleId);
        if(find != null ){
            find.addExtra(extra);
            moduleRepo.save(find);
            return true;
        }
        return false;
    }

    public Boolean removeExtraFromModule(Extra extra, Long moduleId){
        Module find = findModuleById(moduleId);
        if(find != null ){
            find.removeExtra(extra);
            moduleRepo.save(find);
            return true;
        }
        return false;
    }


    public Boolean updateActivities(Object activity, Long activityModuleId) {
        Module find = findModuleById(activityModuleId);
        if(find != null){
            List<Module> allModules = findAll();

//            if(activity.getClass() == ExtraWithModuleRegisterDto.class ){
//                System.out.println("a");
//                Long id = ((ExtraWithModuleRegisterDto) activity).getModuleRegisterDto().getId();
//                for (Module module: allModules){
//                    for (Extra extra: module.getExtras()){
//
//                    }
//                }
//
//            }
//            else if(activity.getClass() == Hangman.class ){
//
//            }
//            else if(activity.getClass() == Match.class ){
//
//            }
            return true;
        }
        return false;
    }


}