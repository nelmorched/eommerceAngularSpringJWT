import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';

import { Product } from '../../_model/product.model';
import { ImageProccessService } from '../../image-proccess.service';
import { ProductService } from '../../_services/product.service';

import { ShowImagesDialogComponent } from '../show-images-dialog/show-images-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  
  displayedColumns: string[] = ['ID', 'PRODUCT NAME', 'PRICE', 'ACTUAL PRICE','CATEGORY','BRAND','ACTION'];
  productdetails:Product[]=[]
  message: string;
  valid: boolean;

constructor(private productservice:ProductService,
            public dialog: MatDialog, 
            private imageService:ImageProccessService , 
            private router:Router){}
    ngOnInit(): void {
    this.getAllProduct();
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
      if(this.productdetails.length==0){
        this.message="No PRODUCT IN DATA BASE"
        this.valid=true
          }
          
    },
    (error : HttpErrorResponse)=>{console.log(error)}
)}

desactiveProduct(element: any){
  this.productservice.disableProduct(element).subscribe(
    (res)=>{console.log(res)
     this.getAllProduct() },
    (errer:HttpErrorResponse)=>{console.log(errer)}
    )
  
}

activeProduct(element:any){
  this.productservice.enableProduct(element).subscribe(
    (res)=>{console.log(res)
     this.getAllProduct() },
    (errer:HttpErrorResponse)=>{console.log(errer)}
    )
  
}
Dialog(product:Product){
  this.dialog.open(ShowImagesDialogComponent,{
    data:{
      images :product.productImages,
      productName:product.productName,
    },
   
    height: '300px',
    width: '300px',
  });
  console.log(product.productImages);
}
updateProduct(id:number){
  this.router.navigate(['/addProduct',{id}])
}
}


