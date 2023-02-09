import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../_model/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
PATH_API="http://localhost:8080/nassreddine-com/brandProduct/"
  constructor(private httpClient :HttpClient) { }

  public addBrand(brand:Brand): Observable<Brand>{
    return this.httpClient.post<Brand>(`${this.PATH_API +"add"}`,brand);
  }
  public getAllBrand(): Observable<Brand[]>{
    return this.httpClient.get<Brand[]>(`${this.PATH_API +"all"}`);
  }
  public getAllBrandForUser(): Observable<Brand[]>{
    return this.httpClient.get<Brand[]>(`${this.PATH_API +"allBrandForUser"}`);
  }
  public getByIDBrand(id_brand:number): Observable<Brand>{
    return this.httpClient.get<Brand>(`${this.PATH_API +""+id_brand}`);
  }
  public getByIDBrandUser(id_brand:number): Observable<Brand>{
    return this.httpClient.get<Brand>(`${this.PATH_API + "User/"+id_brand}`);
  }
  public deleteByIDBrand(idBrand:number){
    return this.httpClient.delete(`${this.PATH_API +"delete/"+idBrand}`,);
  }
}
