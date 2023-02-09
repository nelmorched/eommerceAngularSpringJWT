import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ImageProccessService } from '../../image-proccess.service';
import { Product } from '../../_model/product.model';
import { ProductService } from '../../_services/product.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent implements OnInit {
   msg : string | undefined ;
   productdetails:Product[]=[]
   
constructor(private userService:UserService, private productservice:ProductService, private imageService:ImageProccessService){
}
  ngOnInit(): void {
      this.getAllProduct();
      this.forAdmin();
        }  

        public getAllProduct(){
          this.productservice.allproduct()
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

public forAdmin(){
  this.userService.forAdmin().subscribe(
    (response)=>{
      console.log(response);
      this.msg=response
    },
    (error)=>{
      console.log(error)
   }
    
  );
}
}
