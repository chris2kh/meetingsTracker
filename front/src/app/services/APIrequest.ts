import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meeting } from '../model/Meeting';
import { MeetingHeader } from '../model/MeetingHeader';
import { Project } from '../model/Project';
import { Person } from '../model/Person';

@Injectable()
export class APIrequest {
    headers: HttpHeaders;
    API_MEETING: string = 'http://localhost:8080/api/meetings';
    API_PERSONS: string = 'http://localhost:8080/api/persons';
    API_PROJECTS: string = 'http://localhost:8080/api/projects';

    constructor(private client: HttpClient) {
       this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    }

    getMeetings(from: String, until: String): Observable<MeetingHeader[]> {
        return this.client.get<MeetingHeader[]>(this.API_MEETING + "/list?from=" + from + "&until=" + until);
    }

    getProjects(): Observable<Project[]> {
        return this.client.get<Project[]>(this.API_PROJECTS);
    }

    getPersons(): Observable<Person[]> {
        return this.client.get<Person[]>(this.API_PERSONS);
    }

    save(meeting: Meeting): Observable<string> {
        return this.client.post<string>(this.API_MEETING+ "/save",meeting, {headers: this.headers});
    }

    deleteMeeting(id: number): Observable<String> {
        return this.client.delete<String>(this.API_MEETING + "/delete?id=" + id);
    }

    deleteMeetings(ids: number[]): Observable<String> {
        if (ids.length == 1) return this.deleteMeeting(ids[0]);
        return this.client.post<String>(this.API_MEETING+ "/delete",ids,{headers: this.headers});
    }

    getMeeting(id: number): Observable<Meeting> {
        return this.client.get<Meeting>(this.API_MEETING + "/get?id="+id);
    }
}