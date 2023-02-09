import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { UserLoginService } from "../_services/user-login.service";
import {catchError} from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class authInterseptor implements HttpInterceptor{
constructor(private userAuthService:UserLoginService , private router:Router){

}

    intercept(
        req: HttpRequest<any>,
         next: HttpHandler
         ): Observable<HttpEvent<any>> {
        if(req.headers.get('No-Auth') === 'True'){
            return next.handle(req.clone());
        }
        const token = this.userAuthService.getToken();
        if(token){
            req = this.addToken(req,token);
            console.log
        }
        return next.handle(req).pipe(
        catchError(
            (err:HttpErrorResponse)=>{
                console.log(err.status);
                if(err.status===401){
                    this.router.navigate(['/login'])
                }  
                if(err.status===403){
                    this.router.navigate(['/404'])    
                }
                return throwError ("someThing error") 
            }
        )
       )
    }

    private addToken(request:HttpRequest<any>, token:string){
        return request.clone(
            {
                setHeaders:{
                    Authorization :`Bearer ${token}` 
                }
            }
        );
    }
    
}