import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ImageProccessService } from '../../image-proccess.service';
import { Brand } from '../../_model/brand.model';
import { Category } from '../../_model/category.model';
import { fileHandel } from '../../_model/file-handel.model';
import { Product } from '../../_model/product.model';
import { BrandService } from '../../_services/brand.service';
import { CategoryServicesService } from '../../_services/category-services.service';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit 
{
  id:number ;

  categorys:  Category[] =[];
  brands:Brand [] =[]
  product:Product={
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
    
  constructor(private rout:ActivatedRoute,private categoryService:CategoryServicesService,
    private brandService:BrandService,
    private imageService:ImageProccessService,  private sanitizer:DomSanitizer, private router :Router, private productService :ProductService){}
  ngOnInit(): void 
  {
    this.id=this.rout.snapshot.params['id']  
    this.productService.findByIdProd(this.id)
      .subscribe((data :Product)=>{
     this.product = data,
          this.imageService.createImages(this.product);
    },
    (errer:HttpErrorResponse)=>
    {console.log(errer)
    })
this.listCategory()
    this.allBrand()
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
  removeImage(i:number){
    this.product.productImages.splice(i,1);
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
}