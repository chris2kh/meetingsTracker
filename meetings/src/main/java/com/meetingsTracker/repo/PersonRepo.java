/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.meetingsTracker.repo;

import com.meetingsTracker.model.Person;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author cristian
 */
@Repository
public class PersonRepo {
    @Autowired private JdbcTemplate jdbcTemplate;
    
    public List<Person> getPersons() {
        String sql = " select * from persons;";
         List<Person> persons = jdbcTemplate.query(sql, (rs,rn) -> {
            return new Person(rs.getInt("id"),rs.getString("my_name"));
        });
        return persons;
    }
}
