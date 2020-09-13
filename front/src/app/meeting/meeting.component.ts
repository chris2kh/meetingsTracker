import { Component, OnInit, ɵSWITCH_TEMPLATE_REF_FACTORY__POST_R3__ } from '@angular/core';
import { APIrequest } from '../services/APIrequest';
import { Project } from '../model/Project';
import { Person } from '../model/Person';
import { Task } from '../model/Task';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  projects: Project[];
  selectedProject: Project;
  attendees: Person[];
  persons: Person[];
  tasks: Task[];
  displayedTaskColumns: String[];

  constructor(private api: APIrequest) { }

  ngOnInit(): void {
    this.api.getProjects().subscribe(response => this.projects = response);
    this.api.getPersons().subscribe(response => this.persons = response);
   
    this.tasks = [];
    this.displayedTaskColumns = ['responsible','task','dueDate','action'];
  }

  remove(attendee: Person): void {
    if (attendee.hasTask) {
      Swal.fire('cannot remove attendee because there´s at least one task assigned to this person. Clear attendee as responsible before procceding')
      return;
    }
    this.attendees = this.attendees.filter( x => x.id !== attendee.id );
  }

  newTask() {
    let task: Task = {
      personId: null,
      dueDate: null,
      description: ''
    };
    this.tasks.push(task);
    this.tasks = this.tasks.slice(0); // little dirty trick so mat-table knows that it needs to render a new version of tasks
    console.log(this.tasks);
  }


}
