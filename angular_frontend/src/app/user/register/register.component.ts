import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApp } from '../../_model/user.model';
import { UserLoginService } from '../../_services/user-login.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  userApp:UserApp= new UserApp()
  message: string;
  valid: boolean;
  msg: string;
  NotValid: boolean;
constructor(private userService:UserService , private router:Router , private authService:UserLoginService){}
  ngOnInit(): void {
if(this.isLoggedIn()){
  this.router.navigate(['/'])
}
  }
  public isLoggedIn(){
    return this.authService.isLoggedIn();
  }
  Register(){
    
  const form=  this.userService.addUser(this.userApp).subscribe(
      (data:UserApp)=>{console.log(data)
      if(data == null){
          this.message="User Name is already exist ";
          this.NotValid=true 
        } else
        {
         this.router.navigate(['/login'])
        }
      },
      (errerr:HttpErrorResponse)=>{console.log(errerr)
       
      }
    )
    
  }
}
