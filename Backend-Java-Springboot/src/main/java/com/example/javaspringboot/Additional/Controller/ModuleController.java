package com.example.javaspringboot.Additional.Controller;

import com.example.javaspringboot.Additional.Model.Module;
import com.example.javaspringboot.Additional.Model.ModuleRegisterDto;
import com.example.javaspringboot.Additional.Model.ModuleRegisterDtoRole;
import com.example.javaspringboot.Additional.Model.SecureModule;
import com.example.javaspringboot.Additional.Service.ModuleService;
import com.example.javaspringboot.User.Model.User;
import com.example.javaspringboot.User.Model.UserSumarised;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


//@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@CrossOrigin( originPatterns = "*", maxAge = 3600, allowCredentials = "true")

@RestController
@RequestMapping("/Modules")
public class ModuleController {
    private final ModuleService moduleService;

    public ModuleController(ModuleService moduleService) {this.moduleService = moduleService; }

    @GetMapping()
    public ResponseEntity<List<Module>> getAllModules()
    {
        List<Module> modules = moduleService.findAll();
        return new ResponseEntity<>(modules, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/secure")
    public ResponseEntity<List<SecureModule>> getAllSecureModules()
    {
        List<SecureModule> secureModules = moduleService.findAllSecure();
        return new ResponseEntity<>(secureModules, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/dto")
    public ResponseEntity<List<ModuleRegisterDto>> getAllModulesRegisterDTO()
    {
        List<ModuleRegisterDto> modules = moduleService.findAllModulesRegisterDTO();
        return new ResponseEntity<>(modules, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/dto/byCode/{code}")
    public ResponseEntity<List<ModuleRegisterDto>> getModulesRegisterDTOByCode(@PathVariable("code") String code)
    {
        List<ModuleRegisterDto> modules = moduleService.findModulesRegisterDTOContainingCode(code);
        return new ResponseEntity<>(modules, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/byCode/{code}")
    public ResponseEntity<List<Module>> getModuleByCode(@PathVariable("code") String code)
    {
        List<Module> modules = moduleService.findModuleContainingCode(code);
        return new ResponseEntity<>(modules, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/secure/byCode/{code}")
    public ResponseEntity<List<SecureModule>> getSecureModuleByCode(@PathVariable("code") String code)
    {
        List<SecureModule> secureModules = moduleService.findSecureModuleContainingCode(code);
        return new ResponseEntity<>(secureModules, HttpStatus.OK); //ok is 200 status code
    }

    @GetMapping("/{id}")
    public ResponseEntity<Module> getModuleByID(@PathVariable("id") Long id)
    {
        Module module = moduleService.findModuleById(id);
        if (module != null){
            return new ResponseEntity<>(module, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(module, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @GetMapping("/secure/{id}")
    public ResponseEntity<SecureModule> getSecureModuleByID(@PathVariable("id") Long id)
    {
        SecureModule secureModule = moduleService.findSecureModuleById(id);
        if (secureModule != null){
            return new ResponseEntity<>(secureModule, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(secureModule, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @GetMapping("/dto/forUser/{id}")
    public ResponseEntity<List<ModuleRegisterDtoRole>> getModuleDTOForUser(@PathVariable("id") Long id)
    {
        List<ModuleRegisterDtoRole> modulesDTO = moduleService.findAllModulesDTOForUser(id);
        if (modulesDTO != null){
            return new ResponseEntity<>(modulesDTO, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(modulesDTO, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @GetMapping("/secure/forUser/{id}")
    public ResponseEntity<List<SecureModule>> getSecureModuleForUser(@PathVariable("id") Long id)
    {
        List<SecureModule> secureModules = moduleService.findAllSecureModulesForUser(id);
        if (secureModules != null){
            return new ResponseEntity<>(secureModules, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(secureModules, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @GetMapping("/forUser/{id}")
    public ResponseEntity<List<Module>> getModuleForUser(@PathVariable("id") Long id)
    {
        List<Module> modules = moduleService.findAllModulesForUser(id);
        if (modules != null){
            return new ResponseEntity<>(modules, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(modules, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @GetMapping("/RandomActivityforUser/{id}")
    public ResponseEntity<?> getRandomActivityForUser(@PathVariable("id") Long id)
    {
        var activity = moduleService.findRandomActivityForUser(id);
        if (activity != null){
            return new ResponseEntity<>(activity, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(activity, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @PutMapping("/addStudent/{moduleId}/{userId}")
    public ResponseEntity<Module> addStudentToModule(@PathVariable("moduleId") Long moduleId, @PathVariable("userId") Long userId)
    {
        Module attempt = moduleService.addStudentToModule(moduleId, userId);
        if (attempt != null){
            return new ResponseEntity<>(attempt, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(attempt, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @PutMapping("/addAdmin/{moduleId}/{userId}")
    public ResponseEntity<Module> addAdminToModule(@PathVariable("moduleId") Long moduleId, @PathVariable("userId") Long userId)
    {
        Module attempt = moduleService.addAdminToModule(moduleId, userId);
        if (attempt != null){
            return new ResponseEntity<>(attempt, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(attempt, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @PutMapping("/removeStudent/{moduleId}/{userId}")
    public ResponseEntity<Module> RemoveStudentFromModule(@PathVariable("moduleId") Long moduleId, @PathVariable("userId") Long userId)
    {
        Module attempt = moduleService.removeStudentFromModule(moduleId, userId);
        if (attempt != null){
            return new ResponseEntity<>(attempt, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(attempt, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @PutMapping("/removeAdmin/{moduleId}/{userId}")
    public ResponseEntity<Module> RemoveAdminFromModule(@PathVariable("moduleId") Long moduleId, @PathVariable("userId") Long userId)
    {
        Module attempt = moduleService.removeAdminFromModule(moduleId, userId);
        if (attempt != null){
            return new ResponseEntity<>(attempt, HttpStatus.OK); //ok is 200 status code
        }
        return new ResponseEntity<>(attempt, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

//    @GetMapping("/GetAllForUser/{id}")
//    public ResponseEntity<List<Module>> GetAllForUser(@PathVariable("id") Long id){
//        List<Module> modules = moduleService.findAllByUserId(id);
//        return new ResponseEntity<>(modules, HttpStatus.CREATED); //ok is 200 status code
//    }

//    @GetMapping("/GetAllUsersFor/{id}")
//    public ResponseEntity<List<Module>> GetAllUsersFor(@PathVariable("id") Long id){
//        List<Module> modules = moduleService.findAllUsersByModuleId(id);
//        return new ResponseEntity<>(modules, HttpStatus.CREATED); //ok is 200 status code
//    }
//

    @PostMapping("/add")
    public ResponseEntity<Module> addModule(@RequestBody Module module)
    {
        Module newModule = moduleService.addModule(module);
        return new ResponseEntity<>(module, HttpStatus.CREATED); //ok is 200 status code
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteModule(@PathVariable("id") Long id)
    {
        Module attempt = moduleService.findModuleById(id);
        moduleService.deleteModule(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

