/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.meetingsTracker.apis;

import com.meetingsTracker.model.Person;
import com.meetingsTracker.services.PersonService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author cristian
 */
@RestController
@RequestMapping("/api/persons")
public class PersonAPIS {
    
    @Autowired private PersonService service;
    
    @GetMapping()
    public ResponseEntity getPersons(){
        try {
            List<Person> persons = service.getPersons();
            return new ResponseEntity(persons, HttpStatus.OK);
        } catch (Exception ex) {   
            return somethingWentWrong(ex);
        }
    }
    
    private ResponseEntity somethingWentWrong (Exception ex) {
        System.out.println(ex.toString());
        return new ResponseEntity<>("oops...something went wrong trying to process your request", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}





