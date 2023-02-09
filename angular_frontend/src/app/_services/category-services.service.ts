import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../_model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryServicesService {
  API_PATH ="http://localhost:8080/nassreddine-com/category/";
  
  constructor(private httpClient:HttpClient) { }
//admin
  public getAllCategory(){
    return this.httpClient.get<Category[]>(`${this.API_PATH +"all"}`)
  }
  public addCategory(cat:Category) :Observable<Category>{
    return this.httpClient.post<Category>(`${this.API_PATH +"add"}`, cat);
  }
 
  public getCategoryByID(id_cat:number){
    return this.httpClient.get<Category>(`${this.API_PATH +""+id_cat}`)
  }
  public getCategoryByIDForUser(id_cat:number){
    return this.httpClient.get<Category>(`${this.API_PATH +"User/"+id_cat}`)
  }
  public deleteCategoryByID(id_cat:number){
    return this.httpClient.delete(`${this.API_PATH +"delete/"+id_cat}`)
  }
  //user 
  public getAllCategoryForUser(){
    return this.httpClient.get<Category[]>(`${this.API_PATH +"allCategoryForUser"}`)
  }
  
}
