import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApp } from '../_model/user.model';
import { UserLoginService } from '../_services/user-login.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  message:string;
  valid:boolean;
  userApp:    UserApp = new UserApp()
constructor(private authService:UserLoginService , private router:Router
  , public userService:UserService){
}
  ngOnInit(): void {
  }

public isLoggedIn(){
  return this.authService.isLoggedIn();
}
public logout(){
  this.authService.clear();
  this.router.navigate(['/login']);

}

}

 
 




