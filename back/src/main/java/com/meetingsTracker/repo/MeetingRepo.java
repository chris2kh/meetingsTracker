/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.meetingsTracker.repo;

import com.meetingsTracker.model.Meeting;
import com.meetingsTracker.model.MeetingHeader;
import com.meetingsTracker.model.Person;
import com.meetingsTracker.model.Task;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author cristian
 */
@Repository
public class MeetingRepo {
    @Autowired private JdbcTemplate jdbcTemplate;

    public List<MeetingHeader> getHeaders(String from, String until) {
        String sql = " select  m.id, m.title, p.my_name, m.my_date "
                  +  " from meetings m join projects p on m.fk_project_id = p.id "
                  +  " where m.my_date between ?::date and ?::date"
                  +  " order by m.my_date desc;";
        List<MeetingHeader> headers = jdbcTemplate.query(sql, new Object[] { from, until }, (rs,rn) -> {
            return new MeetingHeader(
                rs.getInt("id"),
                rs.getString("title"),
                rs.getString("my_name"),
                rs.getDate("my_date")
            );
        });
        return headers;
    }
    
    public Meeting getMeeting(int id) {
        List<Person> attendees = getMeetingParticipants(id);
        List<Task> tasks = getMeetingTasks(id);
        
        String sql = " select * from meetings where id = ?";
        Meeting meeting = jdbcTemplate.queryForObject(sql, new Object[] {id}, (rs,rn) -> {
           return new  Meeting(
               rs.getInt("id"),
               rs.getString("title"),
               rs.getInt("fk_project_id"),
               rs.getDate("my_date"),
               rs.getString("my_minute"),
               attendees,
               tasks
           );
        });
        return meeting;
    }
    
    @Transactional
    public void save (Meeting meeting) {
        String sql = " insert into meetings(title, fk_project_id, my_date, my_minute) values(?,?,current_date,?);";
        jdbcTemplate.update(sql,"'"+meeting.getTitle()+"'",meeting.getProjectId(),"'"+meeting.getMinute()+"'");
        sql = "select id from meetings order by id desc limit 1;";
        int id = jdbcTemplate.queryForObject(sql, Integer.class);
        meeting.setId(id);
        
        saveAttendees(meeting);
        saveTasks(meeting);
    }
    
    
    public void deleteMeeting(int id) {
        String sql = " delete from meetings where id = ?;";
        jdbcTemplate.update(sql, new Object[] {id}); // we just need to delete the register on this table
                                                     // because database deletes other tables associated entries on cascade   
    }
    
    
    private List<Person> getMeetingParticipants(int id) {
        String sql = " select p.* from persons p join attendees a on p.id = a.fk_person_id " 
                   + " where a.fk_meeting_id = ?;";
        List<Person> attendees = jdbcTemplate.query(sql, new Object[] {id}, (rs,rn) -> {
           return new Person(rs.getInt("id"),rs.getString("my_name"));
        });
        return attendees;
    }
    
    private List<Task> getMeetingTasks(int id) {
        String sql =  " select * from tasks where fk_meeting_id = ? ";
        List<Task> tasks = jdbcTemplate.query(sql, new Object[] {id}, (rs,rn) -> {
            return new Task(
                rs.getInt("id"),
                rs.getInt("fk_meeting_id"),
                rs.getInt("fk_person_id"),
                rs.getDate("due_date"),
                rs.getString("description")
            );
        });
        return tasks;
    }
    
    private void saveAttendees(Meeting meeting) {
        List<Person> attendees = meeting.getAttendees();
        int id = meeting.getId();
        String sql = " insert into attendees(fk_meeting_id, fk_person_id) values(?,?);";
        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                ps.setInt(1,id);
                ps.setInt(2,attendees.get(i).getId());
            }
            @Override
            public int getBatchSize() {
                return attendees.size();
            }
        });
    }
    
    private void saveTasks(Meeting meeting) {
        List<Task> tasks = meeting.getTasks();
        int id = meeting.getId();
        String sql = " insert into tasks(fk_meeting_id, fk_person_id, due_date, description) values(?,?,?,?);";
        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int i) throws SQLException {
                Task task = tasks.get(i);
                ps.setInt(1,id);
                ps.setInt(2,task.getPersonId());
                ps.setDate(3,task.getDueDate());
                ps.setString(4,"'" + task.getDescription()+"'");
            }
            @Override
            public int getBatchSize() {
                return tasks.size();
            }
        });
    }
    
    
    
    
    
    
    
    
    
    
    
    /*
    public Meeting getMeeting(int id) {
       return null; 
    } 
    
    public List<MeetingHeader> getHeaders(String from, String until) {
        
    }
    
    public void save(Meeting meeting) { 
    }
    
    public void deleteMeeting(int id) {
    }*/
}
