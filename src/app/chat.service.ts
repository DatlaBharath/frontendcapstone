import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private storageService:StorageService,private http:HttpClient) { }
  // /api/groups

  url : string = "http://localhost:7777"
  
  getAllAnnouncements():Observable<any>{
    console.log(localStorage.getItem("token"))
    console.log(this.storageService.getAuthHeader())
    return this.http.get("http://localhost:7777/api/groups",{headers : this.storageService.getAuthHeader()})
  }

  createAnnouncements(name:String, tags:String):Observable<any>{
    return this.http.post(`${this.url}/api/groups?name=${name}&admins=${this.storageService.get("user").id}&users=${this.storageService.get("user").id}&tags=${tags}`,{},{headers : this.storageService.getAuthHeader()})
  }

  createMessage(groupId:number,content:string,sentBy: number):Observable<any>{
    let encodedContent = encodeURIComponent(content);
    return this.http.post(`${this.url}/api/groups/${groupId}/announcements?sentBy=${sentBy}&content=${encodedContent}`,{},{headers : this.storageService.getAuthHeader()})
  }



}
