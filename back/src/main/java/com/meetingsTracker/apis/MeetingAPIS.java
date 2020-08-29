/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.meetingsTracker.apis;

import com.meetingsTracker.model.Meeting;
import com.meetingsTracker.model.MeetingHeader;
import com.meetingsTracker.services.MeetingService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author cristian
 */

@RestController
@RequestMapping("/api/meetings")
public class MeetingAPIS {
    
    @Autowired private MeetingService service;
    
    @GetMapping("/list")
    public ResponseEntity getHeaders(@RequestParam("from") String from, @RequestParam("until") String until) {
        try {
            List<MeetingHeader> headers = service.getHeaders(from, until);
            return new ResponseEntity<>(headers, HttpStatus.OK);
        } catch (Exception ex) {
           return somethingWentWrong(ex);
        }
    }
    
    @GetMapping("/get")
    public ResponseEntity getMeeting(@RequestParam("id") int id){
        try {
            Meeting meeting = service.getMeeting(id);
            return new ResponseEntity<>(meeting, HttpStatus.OK);
        } catch (Exception ex) {   
            return somethingWentWrong(ex);
        }
    }
    
    @PostMapping("/save")
    public ResponseEntity save(@RequestBody Meeting meeting) {
        try {
            service.save(meeting);
            return new ResponseEntity<>("guardado con exito", HttpStatus.OK);
        } catch (Exception ex) {
            return somethingWentWrong(ex);
        }
    }
    
    
    @DeleteMapping("/delete")
    public ResponseEntity deleteMeeting(@RequestParam("id") int id) {
        try {
            service.deleteMeeting(id);
            return new ResponseEntity<>("borrado con exito", HttpStatus.OK);
        } catch (Exception ex) {   
            return somethingWentWrong(ex);
        }
    }
    
    private ResponseEntity somethingWentWrong (Exception ex) {
        System.out.println(ex.toString());
        return new ResponseEntity<>("oops...something went wrong trying to process your request", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
