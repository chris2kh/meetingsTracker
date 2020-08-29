/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.meetingsTracker.model;


import java.sql.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author cristian
 */
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Meeting {
    private int id;
    private String title;
    private int projectId;
    private Date date;
    private String minute;
    private List<Person> attendees;
    private List<Task> tasks;
}
