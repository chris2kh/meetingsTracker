import { Task } from "./Task";
import { Person } from "./Person";

export interface Meeting {
    title : string,
    projectId : number,
    date : Date,
    tasks : Task[], 
    attendees : Person[],
    minute: string,
}