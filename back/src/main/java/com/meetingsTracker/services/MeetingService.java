/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.meetingsTracker.services;

import com.meetingsTracker.model.Meeting;
import com.meetingsTracker.model.MeetingHeader;
import com.meetingsTracker.repo.MeetingRepo;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author cristian
 */
@Service
public class MeetingService {
    @Autowired private MeetingRepo repo;
    
    public List<MeetingHeader> getHeaders(String from, String until) {
        return repo.getHeaders(from, until);
    }
    
    public Meeting getMeeting(int id) {
        return repo.getMeeting(id);
    }
    
    public void save(Meeting meeting) {
        repo.save(meeting);
    }
    
    public void deleteMeeting(int id) {
        repo.deleteMeeting(id);
    }
}
