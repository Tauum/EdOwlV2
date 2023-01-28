package com.example.javaspringboot.Activities.Service;


import com.example.javaspringboot.Activities.Model.Answer;
import com.example.javaspringboot.Activities.Model.Question;
import com.example.javaspringboot.Activities.Model.Quiz;
import com.example.javaspringboot.Activities.Repository.QuizRepo;
import com.example.javaspringboot.Additional.Model.Module;
import com.example.javaspringboot.Additional.Service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class QuizService {
    private final QuizRepo quizRepo;
    private ModuleService moduleService;

    @Autowired
    public QuizService(QuizRepo quizRepository, ModuleService moduleService) {
        this.quizRepo = quizRepository;
        this.moduleService = moduleService;
    }

    public Quiz addQuiz(Quiz quiz)
    {
        Module find = moduleService.findFirstModuleContainingCode(quiz.getModuleCode());
        if (find == null){
            quiz.setModuleCode(null);
        }
        return quizRepo.save(quiz);
    }

    public List<Quiz> findAll(){ return quizRepo.findAll(); }

    public List<Quiz> findAllWithoutModule() {
        return quizRepo.findAllByModuleCodeIsNull();
    }

    //query method (auto generates method in spring back-backend)
    @Transactional
    public void deleteQuiz(Long id) {
        Quiz find = findQuizById(id);
        if(find != null){
            quizRepo.deleteQuizById(id);
        }
        return;
    }

    // this function needs re-doing on all uses (instead just import the question repo and pull them & compare)
//     public Quiz updateQuiz(Quiz attempt) {
//            Quiz find = findQuizById(attempt.getId());
//            if (find != null) {
//                find.setGeneral(attempt.getTitle(),attempt.getTimeLimit(),
//                        attempt.getDescription(),attempt.getEndContent(),
//                        attempt.getValue(),attempt.isHidden(),attempt.getSubject());
//
//                ArrayList<Question> remQ = new ArrayList<>();
//                ArrayList<Question> addQ = new ArrayList<>();
//
//                // this is for updating questions
//                for(Question attemptCurQ: attempt.questions){
//                    for (Question findCurQ : find.questions){
//                            if (attemptCurQ.getId()!= null ) {
//                            if (attemptCurQ.getId().equals(findCurQ.getId())) {
//                                findCurQ.setGeneral(attemptCurQ.getQuestion(), attemptCurQ.getExplaination(), attemptCurQ.getValue());
//                                // this is for updating answers for each question
//                                ArrayList<Answer> remA = new ArrayList<>();
//                                ArrayList<Answer> addA = new ArrayList<>();
//                              for (Answer findCurA : findCurQ.answers) {
//                                    boolean aExists = false;
//                                 for (Answer attemptCurA : attemptCurQ.answers) {
//                                        if (attemptCurA.getId() != null) {
//                                            if (findCurA.getId().equals(attemptCurA.getId())) {
//                                                aExists = true;
//                                                findCurA.setGeneral(attemptCurA.getContent(), attemptCurA.getCorrect());
//                                            }
//                                        }
//                                        // this is for adding answers
//                                        else{ if (!addA.contains(attemptCurA)) {addA.add(attemptCurA); } } // double condition to prevent being added twice
//                                    }
//                                 //this is for removing answers
//                                    if (!aExists && !remA.contains(findCurA)){ remA.add(findCurA); } // double condition to prevent being added twice
//
//                                }
//                                findCurQ.answers.removeAll(remA); // this condition not being met when an answer is removed
//                                findCurQ.answers.addAll(addA);
//                            }
//                        }
//                        else{ if (!addQ.contains(attemptCurQ)) { addQ.add(attemptCurQ); } } // double condition to prevent being added twice
//                    }
//                }
//                // this is for removing a question that no longer exists
//                for(Question findCurQ: find.questions ){
//                    boolean qExists = false;
//                    for (Question attemptCurQ : attempt.questions){
//                        if (attemptCurQ.getId() == null) {  qExists = true; }
//                        else{  if (findCurQ.getId().equals(attemptCurQ.getId())) { qExists = true; }  } // double condition to prevent being added twice
//                    }
//                    if (!qExists && !remQ.contains(findCurQ)) { remQ.add(findCurQ); } // double condition to prevent being added twice
//                }
//                find.questions.addAll(addQ);
//                find.questions.removeAll(remQ);
//
//                Module findModule = moduleService.findFirstModuleContainingCode(attempt.getModuleCode());
//                if(findModule == null){ find.setModuleCode(null); }
//                else{ find.setModuleCode(attempt.getModuleCode()); }
//                quizRepo.save(find);
//            }
//            return find;
//        }

    public Quiz updateQuiz(Quiz attempt) {
        Quiz find = findQuizById(attempt.getId());
        if (find != null) {
            find.setGeneral(attempt.getTitle(),attempt.getTimeLimit(),
                            attempt.getDescription(),attempt.getEndContent(),
                            attempt.getValue(),attempt.isHidden(),attempt.getSubject());
            find.setQuestions(updateQuestions(attempt.getQuestions(), find.getQuestions()));
            Module findModule = moduleService.findFirstModuleContainingCode(attempt.getModuleCode());
            if(findModule == null){ find.setModuleCode(null); }
            else{ find.setModuleCode(attempt.getModuleCode()); }
            quizRepo.save(find); // Cannot invoke "java.lang.Long.equals(Object)" because the return value of "com.example.javaspringboot.Activities.Model.Answer.getId()" is null
        }
        return find;
    }

    public Set<Question> updateQuestions(Set<Question> updating, Set<Question> existing) {
        Set<Question> newList = new HashSet<>();
        if (updating.size() < 1) { existing.clear(); }
        else{
            for (Question updatingQuestion : updating) { // for each question in the new list
                if (updatingQuestion.getId() != null) {
                    existing.forEach(existingQuestion -> { // for each question in old list
                        if (updatingQuestion.getId() != null) {
                            if (existingQuestion.getId().equals(updatingQuestion.getId())) {
                                try {
                                    newList.add(updateSingleQuestion(existingQuestion, updatingQuestion));
                                } // try update existing question & add to list
                                catch (Error e) {
                                    System.out.println(e.toString());
                                }
                            }
                        }
                        else {  newList.add(updatingQuestion); } // add question to list if it doesnt have existing id // this might add question twice
                    });
                }
                else {  newList.add(updatingQuestion); } // add question to list if it doesnt have existing id
            }
        }
        return newList;
    }

    public Question updateSingleQuestion(Question updating, Question existing){
        existing.setGeneral(updating.getQuestion(), updating.getExplaination(), updating.getValue());
        Set<Answer> newList = new HashSet<>();
        if (updating.answers.size() < 1) { existing.answers.clear(); }
        else{
            for (Answer updatingAnswer : updating.answers) { // for each question in the new list
                if (updatingAnswer.getId() != null) {
                    existing.answers.forEach(existingAnswer -> { // for each question in old list
                        if (updatingAnswer.getId() != null && existingAnswer.getId() != null) {
                            if (existingAnswer.getId().equals(updatingAnswer.getId())) { // <<<<<<<<< throws here
                                try{ // try update existing question & add to list
                                    existingAnswer.setGeneral(updatingAnswer.getContent(), updatingAnswer.getCorrect());
                                    newList.add(existingAnswer);
                                }
                                catch (Error e){ System.out.println(e.toString()); }
                            }
                        }
                        else {  newList.add(updatingAnswer); } // add question to list if it doesnt have existing id  // this might add answer twice
                    });
                }
                else {  newList.add(updatingAnswer); } // add question to list if it doesnt have existing id
            }
        }
        existing.setAnswers(newList);
        return existing;
    }



////        for(Question existingQuestion: existing){ // for each question in existing list
////            boolean questionExists = false;
////            existing.forEach( existingQuestion -> { // for each question in new list
////                if (existingQuestion.getId() == null){
////                    questionExists = true;
////                }
////                else{
////                    if (existingQuestion.getId().equals( .getId())){
////                        questionExists = true;
////                    }
////                }
////                if(!questionExists){ existing.remove(existingQuestion.getId()); }
////            });
//
//
//        }
//
////        for(Question findCurQ: find.questions ){
////            boolean qExists = false;
////            for (Question attemptCurQ : attempt.questions){
////                if (attemptCurQ.getId() == null) {  qExists = true; }
////                else{  if (findCurQ.getId().equals(attemptCurQ.getId())) { qExists = true; }  } // double condition to prevent being added twice
////            }
////            if (!qExists && !remQ.contains(findCurQ)) { remQ.add(findCurQ); } // double condition to prevent being added twice
////        }
//
//
//        return existing;
//    }
//

//
//
//    public Quiz updateQuizNew(Quiz attempt) {
////        Quiz find = findQuizById(attempt.getId());
////        if (find != null) {
////            find.setGeneral(attempt.getTitle(),attempt.getTimeLimit(),
////                    attempt.getDescription(),attempt.getEndContent(),
////                    attempt.getValue(),attempt.isHidden(),attempt.getSubject());
////
////            ArrayList<Question> remQ = new ArrayList<>();
////            ArrayList<Question> addQ = new ArrayList<>();
////
////            // this is for updating questions
////
////                else{
////
//////                    find.questions
//////                            .stream()
//////                            .filter(question -> question.getId() == attemptQuestion.getId())
//////                            .forEach(entry -> System.out.println(entry.getKey() + ": " + entry.getValue()));
//////
//////                    Question existingQuestion = find.questions.forEach( findQuestion -> (
//////                                    findQuestion.getId() == attemptQuestion.getId() ?
//////                            )
//////                    );
//////
//////                    find.questions.stream().filter(o -> o instanceof Question).forEach(o -> doSomething());
////
////
////
////                }
////                }
////            }
////            // this is for removing a question that no longer exists
////            for(Question findCurQ: find.questions ){
////                boolean qExists = false;
////                for (Question attemptCurQ : attempt.questions){
////                    if (attemptCurQ.getId() == null) {  qExists = true; }
////                    else{  if (findCurQ.getId().equals(attemptCurQ.getId())) { qExists = true; }  } // double condition to prevent being added twice
////                }
////                if (!qExists && !remQ.contains(findCurQ)) { remQ.add(findCurQ); } // double condition to prevent being added twice
////            }
////            find.questions.addAll(addQ);
////            find.questions.removeAll(remQ);
////
////            Module findModule = moduleService.findFirstModuleContainingCode(attempt.getModuleCode());
////            if(findModule == null){ find.setModuleCode(null); }
////            else{ find.setModuleCode(attempt.getModuleCode()); }
////            quizRepo.save(find);
////        }
//        return find;
//    }

    public Quiz findQuizById(Long id)
    {
        Quiz find = quizRepo.findQuizById(id);
        if (find != null){return find;}
        return null;
    }
    public List<Quiz> findAllOrderByGeneratedDateDesc() {
        return quizRepo.findAllByOrderByGeneratedDateDesc();
    }
    public List<Quiz> findAllOrderByGeneratedDateDescAndNotHidden() {
        return quizRepo.findAllByHiddenOrderByGeneratedDateDesc(false);
    }
    public Quiz findQuizOrderByGeneratedDateDescNotHidden() {
        return quizRepo.findFirstByHiddenOrderByIdDesc(false);
    }

}

