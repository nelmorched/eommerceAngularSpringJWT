import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserApp } from '../_model/user.model';
import { UserLoginService } from './user-login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
PATH_LOCAL ="http://localhost:8080/nassreddine-com";
requestHeader = new HttpHeaders(
  {
    "No-Auth" : "True"
  }
);
  constructor(private httpclient : HttpClient , private userAuthService:UserLoginService
    ) { }

public login(loginData:NgForm):Observable<any>{
return this.httpclient.post<any>(`${this.PATH_LOCAL +"/login"}`,loginData,{headers:this.requestHeader})
}
public addUserAdmin(adminData :UserApp):Observable<any>{
  return this.httpclient.post<any>(`${this.PATH_LOCAL +"/addAdmin"}`,adminData)
}

public addUser(userData :UserApp):Observable<any>{
  return this.httpclient.post<any>(`${this.PATH_LOCAL +"/registerNewUser"}`,userData)
}



public forUser(){
  return this.httpclient.get(`${this.PATH_LOCAL +"/forUser"}` ,{responseType:'text'}, )
}
public forAdmin(){
  return this.httpclient.get(`${this.PATH_LOCAL +"/forAdmin"}` ,{responseType:'text'}, )
}
public roleMatch(allowedRole:any) : boolean
{
  let isMatch=false;
  const roleUser : any = this.userAuthService.getRoles();
  if(roleUser!=null && roleUser){
    for(let i=0 ; i < roleUser.length;i++){
     for(let j=0; j< allowedRole.length ; j++){
        if(roleUser[i].roleName === allowedRole[j]){
          isMatch=true;
          return isMatch;
        }
        else{
          isMatch=false;
          return isMatch;
        }
      }

      }
      
  }
  return isMatch;
}
}
