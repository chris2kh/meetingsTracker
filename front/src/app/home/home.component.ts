import { Component, OnInit } from '@angular/core';
import { APIrequest } from '../services/APIrequest';
import { MeetingHeader } from '../model/MeetingHeader';
import { Meeting } from '../model/Meeting';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  meetingHeaders: MeetingHeader[];
  constructor(private api: APIrequest) { }

  ngOnInit(): void {
  }

  find(from: Date, until: Date): void {
    this.api.getMeetings(from, until).subscribe( headers => this.meetingHeaders = headers);
  }

  delete(meeting: Meeting): void {
    // are you sure you want to delete meeting ?
    this.api.deleteMeeting(meeting.projectId).subscribe( response => {
        // swal meeting delete
        // delete meetingheader from list
    }, error => {
      // swal oops something
    });
  }




}
