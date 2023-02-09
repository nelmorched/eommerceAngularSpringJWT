import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserApp } from '../../_model/user.model';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  admin:UserApp = new UserApp
constructor(private userService:UserService){}
addAdmin(){
this.userService.addUserAdmin(this.admin).subscribe(
  (data:UserApp)=>{console.log(data)}
)

}
}
