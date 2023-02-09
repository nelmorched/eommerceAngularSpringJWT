import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ImageProccessService } from '../image-proccess.service';
import { Category } from '../_model/category.model';
import { Product } from '../_model/product.model';
import { CategoryServicesService } from '../_services/category-services.service';
import { ProductService } from '../_services/product.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.css']
})
export class IndexUserComponent implements OnInit {
  msg : string | undefined ;

  productdetails:Product[]=[]
  categorys: Category[];
  
constructor(private userService:UserService,
   private productservice:ProductService,
   private categoryService:CategoryServicesService,
    private imageService:ImageProccessService,
    private router:Router){
}
 ngOnInit(): void {
     this.getAllProduct();
       }  

       public getAllProduct(){
         this.productservice.allproductbyEtat()
         .pipe(
             map((x:Product[], i ) => x.map((product:Product)=>this.imageService.createImages(product)))
             )
         .subscribe(
           (res: Product[])=>{
             console.log(res)
             this.productdetails=res;
           },
           (error : HttpErrorResponse)=>{console.log(error)}
       )}

       productById(id:number){
        this.router.navigate(['/product-by-id/',{id}])
       
       }

 
}
