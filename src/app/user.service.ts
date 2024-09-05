import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './token.service';
import { User } from './User';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http:HttpClient,private storageService:StorageService) { }

  url = "http://localhost:7777"

  login(username: string,password :string): Observable<any>{
    let obj = {
      "username" : username,
      "password" : password
    }
    return this.http.post(this.url+"/api/login",obj)
  }
  getUserByEmail(email: string): Observable<any>{
    return this.http.get(this.url+"/users/user/"+email)
  }
  register(user:User): Observable<any>{
    return this.http.post(this.url+"/users",user)
    // return this.http.post(this.url+"/users",user,{headers : this.tokenService.get("header"),responseType : 'text' as 'json'})
  }
}
