/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.meetingsTracker.services;

import com.meetingsTracker.model.Project;
import com.meetingsTracker.repo.ProjectRepo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author cristian
 */
@Service
public class ProjectService {
     @Autowired private ProjectRepo repo;
    
     public List<Project> getProjects() {
         return repo.getProjects();
     }
    
    
}
