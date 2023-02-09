import { Component } from '@angular/core';
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
  selector: 'app-list-product-by-brand',
  templateUrl: './list-product-by-brand.component.html',
  styleUrls: ['./list-product-by-brand.component.css']
})
export class ListProductByBrandComponent {
  categorys: Category[]=[];
  id_brand:number;
  brands:Brand [] =[];
productsByCatgeorys:Product[] =[]
constructor(private productservice:ProductService 
  ,private categoryServices:CategoryServicesService
  , private route:ActivatedRoute
  ,private imageService:ImageProccessService
  ,private router:Router
  ,private brandService:BrandService){}


  ngOnInit(): void {
this.id_brand = this.route.snapshot.params['id_brand']
this.brandService.getByIDBrandUser(this.id_brand).subscribe((data)=>{console.log(data)
  
})
this.allProductByBrand(this.id_brand);
this.listCategory();
this.listBrand()
  }



public allProductByBrand(id_brand:number){
  this.productservice.allproductbyBrand(id_brand)
  .pipe(
    map((x:Product[], i ) => x.map((product:Product)=>this.imageService.createImages(product)))
    )
    .subscribe((data:Product[])=>{console.log(data)
    this.productsByCatgeorys=data})

}
public listCategory(){
  this.categoryServices.getAllCategoryForUser().subscribe(
    (data  :Category[])=>{console.log(data)
    this.categorys=data;
    })
  }
  public listBrand(){
    this.brandService.getAllBrandForUser().subscribe(
      (data  :Brand[])=>{console.log(data)
      this.brands=data;
      })
    }
    productByCategory(id_cat: number) {
      this.router.navigate(['/product-list-by-category/', id_cat])
    } 
    productById(id:number){
      this.router.navigate(['/product-by-id/',{id}])
     
     }

}
