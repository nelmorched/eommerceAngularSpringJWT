import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor() { }

  public setRoles(roles:[]){
    localStorage.setItem('roles',JSON.stringify(roles));
  }
  public setToken(jwtToken:string) {
    localStorage.setItem('jwtToken',jwtToken);
  }
  public getToken():string {
    
    return localStorage.getItem('jwtToken') as string
  }
  public getRoles(): []{
    return JSON.parse(localStorage.getItem('roles') as string) 
  }
  public clear() {
    localStorage.clear();
  }
 public isLoggedIn(){
  return this.getRoles() && this.getToken();
 }
}
