import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ImageProccessService } from '../image-proccess.service';
import { Product } from '../_model/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverServiceService implements Resolve<Product[]> {


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[]| Observable<Product[]> | Promise<Product[]> {
  const id =    route.paramMap.get('id')
  const isSingleProductsheckOut =    route.paramMap.get('isSingleProductsheckOut')
    return this.productServices.getProductdetails(isSingleProductsheckOut,id).pipe(
      map(
        (x :Product[], i )=>x.map((product:Product)=>this.imageService.createImages(product))
      )
    ) 
  }
  constructor(private productServices:ProductService ,private  imageService:ImageProccessService) { }

}
