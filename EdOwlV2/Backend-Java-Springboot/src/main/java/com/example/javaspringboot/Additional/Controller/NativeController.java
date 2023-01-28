package com.example.javaspringboot.Additional.Controller;

import org.aspectj.weaver.ast.Var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.sql.DataSource;

//@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@CrossOrigin( originPatterns = "*", maxAge = 3600, allowCredentials = "true")

@RestController
@RequestMapping("/Application")
public class NativeController {

    @Autowired
    DataSource dataSource;

    @Autowired
    private EntityManagerFactory entityManagerFactory;


    @GetMapping("/storage")
    public ResponseEntity<Object> getDBStorage() { // something is throwing an error here on sign out
        EntityManager session = entityManagerFactory.createEntityManager();
        Var size = null;
        Object[] query = null;
        try {
            query = (Object[]) session.createNativeQuery("SELECT table_schema 'edowljpa2', ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) FROM information_schema.tables WHERE table_schema = 'edowljpa2'")
                    .getSingleResult();
        }
        catch (NoResultException e){ }
        finally {
            if(session.isOpen()) session.close();
            if (query != null){
                return new ResponseEntity<>(query[1], HttpStatus.OK); //ok is 200 status code
            }
        }


        return new ResponseEntity<>(size, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

    @GetMapping("/storage/{table}") // this wont work right here as "table"
    public ResponseEntity<Object> getDBTableStorage(@PathVariable("table") String table) { // something is throwing an error here on sign out
        EntityManager session = entityManagerFactory.createEntityManager();

        Var size = null;
        Object[] query = null;
        try {
            query = (Object[]) session.createNativeQuery("SELECT round(((data_length + index_length) / 1024 / 1024), 2) FROM information_schema.TABLES WHERE table_schema = 'edowljpa2' AND table_name = table") // this wont work right here as "table"
                    .getSingleResult();
        }
        catch (NoResultException e){ }
        finally {
            if(session.isOpen()) session.close();
            if (query != null){
                return new ResponseEntity<>(query[1], HttpStatus.OK); //ok is 200 status code
            }
        }


        return new ResponseEntity<>(size, HttpStatus.NOT_FOUND); //ok is 200 status code
    }

}
