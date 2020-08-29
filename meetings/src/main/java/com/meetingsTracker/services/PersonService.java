/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.meetingsTracker.services;

import com.meetingsTracker.model.Person;
import com.meetingsTracker.repo.PersonRepo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author cristian
 */
@Service
public class PersonService {
    @Autowired private PersonRepo repo;
    
    public List<Person> getPersons() {
        return repo.getPersons();
    }
    
}
