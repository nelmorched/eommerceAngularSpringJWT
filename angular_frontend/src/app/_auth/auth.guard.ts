import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserLoginService } from '../_services/user-login.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userAuthService :UserLoginService,
     private router:Router,
      private userService : UserService
      ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): 
    | Observable<boolean| UrlTree> 
    | Promise<boolean | UrlTree> 
    | boolean 
    | UrlTree {
   
      if(this.userAuthService.getToken()!==null )
      {
                  const role = route.data['roles'] as string;
                  if(role){
                  const match =  this.userService.roleMatch(role);
                  if(match){
                    return true;
                  }else{
                    this.router.navigate(['/404']);
                    return false;
                  }
                  }
                 }
                      this.router.navigate(['/login']);
                      return false;
  }
  
}
