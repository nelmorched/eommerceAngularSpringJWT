import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../_model/oderDetails.model';
import { Product } from '../_model/product.model';
import { ShoppingCart } from '../_model/shoppingCart.model';
import { UserApp } from '../_model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  PATH_LOCAL ="http://localhost:8080/nassreddine-com/";
  constructor(private httpClient:HttpClient) { }

  public addproduct(product:FormData){    
    return this.httpClient.post<Product>(`${this.PATH_LOCAL + "product/add"}`,product);
  }
  public allproduct(){
    return this.httpClient.get<Product[]>(`${this.PATH_LOCAL + "product/all"}`);
  }
  public allproductbyEtat(){
    return this.httpClient.get<Product[]>(`${this.PATH_LOCAL + "product/allbyetat"}`);
  }
  public allproductbyCategory(id_cat:number){
    return this.httpClient.get<Product[]>(`${this.PATH_LOCAL + "product/allbycaegory/"+id_cat}`);
  }
  public allproductbyBrand(id_brand:number){
    return this.httpClient.get<Product[]>(`${this.PATH_LOCAL + "product/allbyBrand/"+id_brand}`);
  }
  public disableProduct(id:number):Observable<Product>{
    return this.httpClient.delete<Product>(`${this.PATH_LOCAL + "product/disable/"+id}`)
  }
  public enableProduct(id:number):Observable<Product>{
    return this.httpClient.delete<Product>(`${this.PATH_LOCAL + "product/enable/" +id}`)
  }
  public findByIdProd(id: string | number){
    return this.httpClient.get<Product>(`${this.PATH_LOCAL + "product/" + id}`)
  }
  public findByIdProdUser(id:any):Observable<Product>{
    return this.httpClient.get<Product>(`${this.PATH_LOCAL + "product/User/" + id}`)
  }

 public getProductdetails(isSingleProductsheckOut:any , id:any){
  return this.httpClient.get<Product[]>(`${this.PATH_LOCAL + "product/"+id+"/"+isSingleProductsheckOut}`)

 }
 public placeOrder(OrderDetails:OrderDetails){
  return this.httpClient.post(`${this.PATH_LOCAL + "placeOrder/"}`,OrderDetails)
 }
}
