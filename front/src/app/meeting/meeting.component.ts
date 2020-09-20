import { Component, OnInit } from '@angular/core';
import { APIrequest } from '../services/APIrequest';
import { Project } from '../model/Project';
import { Person } from '../model/Person';
import { Task } from '../model/Task';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Meeting } from '../model/Meeting';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  projects: Project[];
  persons: Person[];
  displayedTaskColumns: String[];
  meeting: Meeting;
  editMode: boolean;

  constructor(private api: APIrequest, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.meeting = {title: '',projectId: 0,date: null, tasks:[], attendees: [], minute: ''};
    this.api.getProjects().subscribe(response => this.projects = response);
    this.api.getPersons().subscribe(response => this.persons = response);
    this.activatedRoute.queryParams.subscribe(queryParams => {
      let id: number = queryParams["id"];
      if( id == null) {
        this.newMeetingInit();
      }
      else {
        this.loadMeetingInit(id);
      }
    });
  }

  newMeetingInit(): void {
    this.editMode = true;
    this.displayedTaskColumns = ['responsible','task','dueDate','action'];
  }

  loadMeetingInit(id: number): void {
    this.editMode = false;
    this.displayedTaskColumns = ['responsible','task','dueDate'];
    this.api.getMeeting(id).subscribe(response => {
      this.meeting = response;
    });
  }

  remove(attendee: Person): void {
    if (this.someTaskAssignedTo(attendee)) {
      Swal.fire(`${attendee.name} is responsible of at least one task.
      If you want to remove ${attendee.name} from the attendees list, make sure he/she does not have any tasks assigned`);
      return;
    }
    this.meeting.attendees = this.meeting.attendees.filter( x => x.id !== attendee.id );
  }

  someTaskAssignedTo(attendee: Person): boolean {
    return this.meeting.tasks.some(task => task.personId === attendee.id);
  }

  newTask() {
    let task: Task = {
      personId: null,
      dueDate: null,
      description: ''
    };
    this.meeting.tasks.push(task);
    this.meeting.tasks = this.meeting.tasks.slice(0); // little dirty trick so mat-table knows that it needs to render a new version of tasks
  }

  delete(task: Task): void {
    let index: number = this.meeting.tasks.indexOf(task);
    this.meeting.tasks.splice(index,1);
    this.meeting.tasks = this.meeting.tasks.slice(0);
  }

  cancelDialog(): void {
    Swal.fire({
      title: 'Are you sure you want to exit without saving?',
      text: "You will lose the changes done in this meeting!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, exit without saving'
    }).then(result => {
        if (result.value) {
          this.goToHomepage();
        }
    });
  }

  goToHomepage(): void {
    this.router.navigate([""]);
  }

  saveDialog(): void {
    Swal.fire({
      title: 'Are you sure you want to save this meeting?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText:  'Yes, save it!'
    }).then(result => {
        if (result.value) {
          this.save();
        }
    }); 
  }

  save(): void {
    this.api.save(this.meeting).subscribe(response => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: response.toString(),
        showConfirmButton: false,
        timer: 1500
      }).then(result => this.goToHomepage());
    },
    error => {
      Swal.fire("Error trying to save the meeting " + error.error);
    });
  }
}