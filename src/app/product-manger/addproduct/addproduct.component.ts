import { HttpErrorResponse } from '@angular/common/http';
import { Component , Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, UrlHandlingStrategy } from '@angular/router';
import { ProductlistComponent } from '../productlist/productlist.component';
import { fileHandel } from '../../_model/file-handel.model';
import { Product } from '../../_model/product.model';
import { ProductService } from '../../_services/product.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../_model/category.model';
import { CategoryServicesService } from '../../_services/category-services.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Brand } from '../../_model/brand.model';
import { BrandService } from '../../_services/brand.service';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit{
categorys:  Category[] =[];
brands:Brand [] =[];
  constructor(private route:ActivatedRoute, private productService:ProductService , private brandService:BrandService, 
    private sanitizer:DomSanitizer , private router:Router , private categoryService:CategoryServicesService){}
  ngOnInit(): void {
  this.product =  this.route.snapshot.data['product']
    this.listCategory();
    this.allBrand()
  }

  onFileSelected(event:any) {
  if(event.target.files){
     const fileProd=   event.target.files[0];
      const filehandel:fileHandel={
  file:fileProd,
  url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileProd))
}
this.product.productImages.push(filehandel)
   
}
  
}
  
product:Product ={
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

  message:string | undefined

  public addProduct(productForm:NgForm){
  const productFormDate=  this.preparFormData(this.product)
            this.productService.addproduct(productFormDate).subscribe(
            (response : Product)=>{console.log(response)
                productForm.reset()
                this.product.productImages=[]
                this.router.navigate(['/product'])
              },
            (error:HttpErrorResponse)=>{console.log(error)})

  }
  public listCategory(){
        this.categoryService.getAllCategory().subscribe(
          (data  :Category[])=>{console.log(data)
          this.categorys=data;
          })
        }
        allBrand(){
          this.brandService.getAllBrand().subscribe
          ((data)=>{console.log(data)
          this.brands=data;
          
        })
        }

  preparFormData(product:Product):FormData{
const formData=new FormData
formData.append('product',new Blob([JSON.stringify(product)],{ type:'application/json'}));
for(var i =0 ; i<product.productImages.length;i++){
  formData.append('imageFile',
  product.productImages[i].file,
  product.productImages[i].file.name);
}
  return formData;

  }
  removeImage(i:number){
    this.product.productImages.splice(i,1);
  }
}

