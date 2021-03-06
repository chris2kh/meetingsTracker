/*
 * To change this license header, choose License Headers in ProjectAPIS Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.meetingsTracker.apis;

import com.meetingsTracker.model.Project;
import com.meetingsTracker.services.ProjectService;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author cristian
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/projects")
public class ProjectAPIS {
    
    @Autowired private ProjectService service;
    
    @GetMapping()
    public ResponseEntity getProjects(){
        try {
            List<Project> projects = service.getProjects();
            return new ResponseEntity<>(projects, HttpStatus.OK);
        } catch (DataAccessException ex) {
            return somethingWentWrong(ex);
        }
    }
	
    private ResponseEntity somethingWentWrong (Exception ex) {
		Logger.getLogger(ProjectAPIS.class.getName()).log(Level.SEVERE, null, ex);
        return new ResponseEntity<>("\"oops...something went wrong trying to process your request\"", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
