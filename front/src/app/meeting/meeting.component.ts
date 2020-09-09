import { Component, OnInit } from '@angular/core';
import { APIrequest } from '../services/APIrequest';
import { Project } from '../model/Project';
import { FormControl } from '@angular/forms';
import { Person } from '../model/Person';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  projects: Project[];
  selectedProject: Project;
  atendees: Person[];
  persons: Person[];
  people = new FormControl();

  constructor(private api: APIrequest) { }

  ngOnInit(): void {
    this.api.getProjects().subscribe(response => this.projects = response);
    this.api.getPersons().subscribe(response => this.persons = response);
  }

  oe(): void {
    console.log(this.selectedProject.name);
  }

}
