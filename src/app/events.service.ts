import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './Event';
import { StorageService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http:HttpClient,private storageService:StorageService) { }

  createEvent(event:Event):Observable<Event>{
    let url = "http://localhost:7777/events"
    return this.http.post<Event>(url,event,{headers : this.storageService.getAuthHeader()})
  }

  getEvents():Observable<any>{
    let url = "http://localhost:7777/events"
    return this.http.get<any>(url,{headers : this.storageService.getAuthHeader()})
  }

  deleteEvents(id:number):Observable<any>{
    let url = "http://localhost:7777/events"
    return this.http.delete<any>(`${url}/${id}`,{headers : this.storageService.getAuthHeader()});
  }
}
