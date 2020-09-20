import { Component, OnInit } from '@angular/core';
import { APIrequest } from '../services/APIrequest';
import { MeetingHeader } from '../model/MeetingHeader';
import { Router } from '@angular/router';
import Swal  from 'sweetalert2';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: String[];
  dataSource: MeetingHeader[];
  checkboxes: SelectionModel<MeetingHeader>;
  
  constructor(private api: APIrequest, private router: Router) { }
  
  ngOnInit(): void {
    this.displayedColumns = ["checkbox","title","project","date"];
    this.checkboxes = new SelectionModel<MeetingHeader>(true, []);
  }

  newMeeting(): void {
    this.router.navigate(["meeting"]);
  }

  load(meeting: MeetingHeader): void {
    this.router.navigate(["meeting"], {queryParams:{ id: meeting.id}});
  }

  find(from: String, to: String): void {
    if(from === "") {
      from = "01/01/1900";
    }
    if(to === "") {
      to = "01/01/3000";
    }
    from = this.parseDate(from);
    to = this.parseDate(to);
    this.api.getMeetings(from, to).subscribe( headers => {
      this.dataSource = this.convertMillisecondsToDate(headers);
    },
    error => Swal.fire(error.error));
  }

  delete(meeting: MeetingHeader): void {
    this.api.deleteMeeting(meeting.id).subscribe( response => Swal.fire(response.toString()), 
    error => Swal.fire(error.error));
  }

  deleteDialog(): void {
    let message: string;
    let confirmText: string;
    let selected: number = this.checkboxes.selected.length
    if( selected == 1) {
      message = 'this meeting?';
      confirmText = 'Yes, delete it';
    }
    else {
      message = 'these ' + selected + ' meetings?';
      confirmText = 'Yes, delete them';
    }

    Swal.fire({
      title: 'Are you sure you want to delete ' + message,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmText
    }).then(result => {
        if (result.value) {
          this.deleteMeetings();
        }
        else {
          this.checkboxes.clear();
        }
    });
  }

  deleteMeetings(): void {
    let ids: number[] = this.checkboxes.selected.map(meeting => meeting.id);
    this.api.deleteMeetings(ids).subscribe( response => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: response.toString(),
        showConfirmButton: false,
        timer: 1500
      });
      this.checkboxes.clear();
      this.deleteFromView(ids);
    }, 
    error => Swal.fire(error.error));
  }

  deleteFromView(ids: number[]): void {
    this.dataSource = this.dataSource.filter( meeting => ids.indexOf(meeting.id) === -1);
    this.checkboxes.clear();
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
  
  allChecked(): boolean {
    return this.dataSource.length === this.checkboxes.selected.length;
  }

  toggleAll(): void {
    if (this.allChecked()) {
      this.checkboxes.clear();
    }
    else {
      this.dataSource.forEach(meeting => this.checkboxes.select(meeting));
    }
  }
}