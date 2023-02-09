import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ImageProccessService } from '../../image-proccess.service';
import { Brand } from '../../_model/brand.model';
import { Category } from '../../_model/category.model';
import { Product } from '../../_model/product.model';
import { BrandService } from '../../_services/brand.service';
import { CategoryServicesService } from '../../_services/category-services.service';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-list-product-by-category',
  templateUrl: './list-product-by-category.component.html',
  styleUrls: ['./list-product-by-category.component.css']
})
export class ListProductByCategoryComponent implements OnInit {
  categorys: Category[];
  id_cat:number;
  brands:Brand [] =[];
productsByCatgeorys:Product[] =[]
constructor(private productservice:ProductService ,
  private brandService:BrandService
  ,private categoryServices:CategoryServicesService 
  , private route:ActivatedRoute
  ,private imageService:ImageProccessService
  ,private router:Router){}


  ngOnInit(): void {
this.id_cat = this.route.snapshot.params['id_cat']
this.categoryServices.getCategoryByIDForUser(this.id_cat).subscribe((data)=>{console.log(data)
})
this.allProductByCategory(this.id_cat);
this.listCategory();
this.listBrand();
  }



public allProductByCategory(id_cat:number){
  this.productservice.allproductbyCategory(id_cat)
  .pipe(
    map((x:Product[], i ) => x.map((product:Product)=>this.imageService.createImages(product)))
    )
    .subscribe((data:Product[])=>{console.log(data)
    this.productsByCatgeorys=data})

}
public listBrand(){
  this.brandService.getAllBrandForUser().subscribe(
    (data  :Brand[])=>{console.log(data)
    this.brands=data;
    })
  }
public listCategory(){
  this.categoryServices.getAllCategoryForUser().subscribe(
    (data  :Category[])=>{console.log(data)
    this.categorys=data;
    })
  }
      
  allProductByBrand(id_brand: number) {
    this.router.navigate(['/product-list-by-brand/', id_brand])
  }
  productById(id:number){
    this.router.navigate(['/product-by-id/',{id}])
   
   }

}
