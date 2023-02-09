import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserLoginService } from '../../_services/user-login.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  message: string;
  valid: boolean;
constructor(private userService:UserService,
   private authService:UserLoginService,
   private router:Router){

}
ngOnInit(): void {
  if(this.isLoggedIn()){
    this.router.navigate(['/'])
  }
    }
    public isLoggedIn(){
      return this.authService.isLoggedIn();
    }

login(loginForm:NgForm){
   this.userService.login(loginForm.value).subscribe(
    (data:any) => 
    { 
      this.authService.setRoles(data.userApp.role)
      this.authService.setToken(data.jwtAccessToken)
      console.log(data);
     const role = data.userApp.role[0].roleName;
      if(role==='Admin'){
        this.router.navigate(['/indexadmin'])
      }else if(role==='User') {
        this.router.navigate(['/'])
      }
    },
    (error) => { console.log(error); 
    if(error){
      this.message="User Name Or Password are not Valid "
      this.valid=true
    }
    },

  );


 }



}
