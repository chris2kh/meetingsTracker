import { Component, OnInit } from '@angular/core';
import { APIrequest } from '../services/APIrequest';
import { MeetingHeader } from '../model/MeetingHeader';
import { Meeting } from '../model/Meeting';
import { Router } from '@angular/router';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  meetingHeaders: MeetingHeader[];
  displayedColumns: String[];
  dataSource: MeetingHeader[];
  constructor(private api: APIrequest, private router: Router) { }
  ngOnInit(): void {
    this.displayedColumns = ["title","project","date"];
  }

  newMeeting(): void {
    this.router.navigate(["meeting"]);
  }

  loadMeeting(id: number): void {
    this.router.navigate(["meeting"], {queryParams:{ load: 'true', id: id}});
  }

  find(from: String, until: String): void {
    if(from === "") {
      from = "01/01/1900";
    }
    if(until === "") {
      until = "01/01/3000";
    }
    from = this.parseDate(from);
    until = this.parseDate(until);
    this.api.getMeetings(from, until).subscribe( headers => {
    this.dataSource = this.convertMillisecondsToDate(headers);
    },
    error => Swal.fire(error.error));
  }

  delete(meeting: Meeting): void {
    this.api.deleteMeeting(meeting.projectId).subscribe( response => Swal.fire(response.toString()), 
    error => Swal.fire(error.error));
  }

  deleteByIdDialog(id: number): void {
    Swal.fire({
      title: 'Are you sure you want to delete this meeting?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
        if (result.value) {
          this.deleteById(id);
        }
    });
  }

  deleteById(id: number): void {
    this.api.deleteMeeting(id).subscribe( response => {
        Swal.fire(response.toString());
        // TODO delete meetingheader from list
    }, 
    error => Swal.fire(error.error));
  }

  parseDate(date: String): String {      
    let array: String[] = date.split("/");               // change the date format from MM/DD/YYYY to 
    return array[2] + "-" + array[0] + "-" + array[1];   // YYYY-MM-DD
  }

  convertMillisecondsToDate(meetingHeaders: MeetingHeader[]): MeetingHeader[] {
    meetingHeaders.forEach(header => {
      let milliseconds: string = header.date;
      header.date = new Date(milliseconds).toISOString().split("T")[0];
    });
    return meetingHeaders;
  } 

}
