import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageProccessService } from '../../image-proccess.service';
import { Brand } from '../../_model/brand.model';
import { Category } from '../../_model/category.model';
import { Product } from '../../_model/product.model';
import { BrandService } from '../../_services/brand.service';
import { CategoryServicesService } from '../../_services/category-services.service';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-product-by-id',
  templateUrl: './product-by-id.component.html',
  styleUrls: ['./product-by-id.component.css']
})
export class ProductByIdComponent implements OnInit {
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
  isSingleProductsheckOut: boolean;
  constructor(private route:ActivatedRoute ,private imageService: ImageProccessService, private router:Router,
    private productService:ProductService ,private categoryService:CategoryServicesService,
    private brandService:BrandService ){}
  ngOnInit(): void 
  {
    this.product =  this.route.snapshot.data['product']
    this.listCategory();
    this.listBrand();
  }
    public listCategory() {
      this.categoryService.getAllCategoryForUser().subscribe(
        (data: Category[]) => {
          console.log(data)
          this.categorys = data;
        })
    }
    public listBrand() {
      this.brandService.getAllBrandForUser().subscribe(
        (data: Brand[]) => {
          console.log(data)
          this.brands = data;
        })
    }
  
  productByCategory(id_cat: number) {
    this.router.navigate(['/product-list-by-category/', id_cat])
  }
  allProductByBrand(id_brand: number) {
    this.router.navigate(['/product-list-by-brand/', id_brand])
  }
  buyProduct(id :number){
    this.router.navigate(['/buy-product/',{
      isSingleProductsheckOut:true,
      id}]);
  }
}
