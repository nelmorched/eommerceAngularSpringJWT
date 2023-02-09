import { _isNumberValue } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { ImageProccessService } from '../image-proccess.service';
import { Product } from '../_model/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverServiceService implements Resolve<Product> {


  constructor(private productService: ProductService ,private  imageServices:ImageProccessService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const idprod = route.paramMap.get("id")
    if (idprod) {
      return this.productService.findByIdProd(idprod).pipe(
        map (p => this.imageServices.createImages(p)
      )
      )
    } else {
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      id: 0,
      productName: '',
      description: '',
      price: 0,
      actPrice: 0,
      productImages: [],
      category: { id_cat: 0, name: "" },
      brandProduct: { id_brand: 0, nameBrand: "" },
      quantity: 0
    }
  }
}
