import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meeting } from '../model/Meeting';
import { MeetingHeader } from '../model/MeetingHeader';

@Injectable()
export class APIrequest {
    headers: HttpHeaders;
    API_MEETING: String = 'localhost:8080/api/meetings';
    API_PERSONS: String = 'localhost:8080/api/persons';
    API_PROJECTS: String = 'localhost:8080/api/projects';

    constructor(private client: HttpClient) {
       this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    }

    getMeetings(from: Date, until: Date): Observable<MeetingHeader[]> {
        return this.client.get<MeetingHeader[]>(this.API_MEETING + "/list?from=" + from + "&until=" + until);
    }

    getProjects(): void {

    }

    getPersons(): void {

    }

    save(meeting: Meeting): void {

    }

    deleteMeeting(id: number): Observable<String> {
        return this.client.delete<String>(this.API_MEETING + "/delete?id=" + id, {headers: this.headers})
    }

}