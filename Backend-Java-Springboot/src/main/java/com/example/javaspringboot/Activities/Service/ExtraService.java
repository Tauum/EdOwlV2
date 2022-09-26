package com.example.javaspringboot.Activities.Service;

import com.example.javaspringboot.Activities.Model.Extra;
import com.example.javaspringboot.Activities.Repository.ExtraRepo;
import com.example.javaspringboot.Additional.Model.Module;
import com.example.javaspringboot.Additional.Service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class ExtraService {
    private final ExtraRepo ExtraRepo;
    private ModuleService moduleService;
    @Autowired
    public ExtraService(ExtraRepo ExtraRepository , ModuleService moduleService ) {
        this.ExtraRepo = ExtraRepository;
        this.moduleService = moduleService;
    }

    public Extra addExtra(Extra extra) {
        Module find = moduleService.findFirstModuleContainingCode(extra.getModuleCode());
        if (find == null){
            extra.setModuleCode(null);
        }
        return ExtraRepo.save(extra);
    }

    public List<Extra> findAll(){ return ExtraRepo.findAll(); }

    public List<Extra> findAllWithoutModule() {
        return ExtraRepo.findAllByModuleCodeIsNull();
    }

    public Extra updateExtra(Extra attempt){
        Extra findExtra = findExtraById(attempt.getId());
        if (findExtra != null) {
            findExtra.setTitle(attempt.getTitle());
            findExtra.setSummary(attempt.getSummary());
            findExtra.setAuthor(attempt.getAuthor());
            findExtra.setVideo(attempt.getVideo());
            findExtra.setContent(attempt.getContent());
            findExtra.setHidden(attempt.getHidden());

            Module findModule = moduleService.findFirstModuleContainingCode(attempt.getModuleCode());
            if(findModule != null){ findExtra.setModuleCode(attempt.getModuleCode()); }
            else{ findExtra.setModuleCode(null); }

            return ExtraRepo.save(findExtra);
        }
        return null;
    }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteExtra(Long id) { ExtraRepo.deleteExtraById(id);}

//    public void deleteExtra(Long id) {
//        Extras.removeIf
//    }

    public Extra findExtraById(Long id)
    {
        return ExtraRepo.findExtraById(id).orElseThrow(() -> new EntityNotFoundException("Entity not found with id: " + id)) ;
    }

    public List<Extra> findAllOrderByDate(){
        return ExtraRepo.findAllByOrderByGeneratedDateDesc();
    }

    public List<Extra> findAllContainingTitle(String title)
    {
//        return ExtraRepo.findByTitleContainsOrderByGeneratedDateDesc(title);
        return ExtraRepo.findByTitleContainsAndHiddenEqualsOrderByGeneratedDateDesc(title, false);

    }

    public List<Extra> findAllOrderByGeneratedDateDescAndNotHidden() {

        return ExtraRepo.findAllByHiddenOrderByGeneratedDateDesc(false);
    }

    public Extra updateViews(Long id) {
        Extra find = findExtraById(id);
        if (find != null){
            find.setViews(find.getViews() + 1);
            Extra updatedExtra = updateExtra(find);
            return updatedExtra;
        }
        return null;
    }


}

