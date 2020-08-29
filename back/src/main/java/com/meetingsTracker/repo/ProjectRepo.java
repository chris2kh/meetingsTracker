/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.meetingsTracker.repo;

import com.meetingsTracker.model.Project;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author cristian
 */
@Repository
public class ProjectRepo {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Project> getProjects() {
        String sql = "select * from projects";
        List<Project> projects = jdbcTemplate.query(sql, (rs,rn) -> {
            return new Project(rs.getInt("id"),rs.getString("my_name"));
        });
        return projects;
    }
}
