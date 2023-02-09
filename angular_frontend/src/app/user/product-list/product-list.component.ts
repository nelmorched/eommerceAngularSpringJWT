import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ImageProccessService } from '../../image-proccess.service';
import { Brand } from '../../_model/brand.model';
import { Category } from '../../_model/category.model';
import { Product } from '../../_model/product.model';
import { ShoppingCart } from '../../_model/shoppingCart.model';
import { UserApp } from '../../_model/user.model';
import { BrandService } from '../../_services/brand.service';
import { CategoryServicesService } from '../../_services/category-services.service';
import { ProductService } from '../../_services/product.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  categorys: Category[] = [];
  brands: Brand[] = [];
  id_cat: number;
  productdetails: Product[] = []
  id:number;
  product:Product ={
    id: 0,
    productName: '',
    description: '',
    price: 0,
    quantity: 0,
    actPrice: 0,
    productImages: [],
    category: new Category,
    brandProduct: new Brand
  }
  userApp:UserApp

  constructor(private userService: UserService,
    private categoryService: CategoryServicesService, private brandService: BrandService,
    private productservice: ProductService, private imageService: ImageProccessService,
    private router: Router ,
    private route:ActivatedRoute) {}
  
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id']  
    this.productservice.findByIdProdUser(this.id)
      .subscribe((data :Product)=>{
     this.product = data,
          this.imageService.createImages(this.product);
    },
    (errer:HttpErrorResponse)=>
    {console.log(errer)
    })
    this.getAllProduct();
    this.listCategory();
    this.listBrand()
  }

  public getAllProduct() {
    this.productservice.allproductbyEtat()
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageService.createImages(product)))
      )
      .subscribe(
        (res: Product[]) => {
          console.log(res)
          this.productdetails = res;
        },
        (error: HttpErrorResponse) => { console.log(error) }
      )
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
  productByBrand(id_brand: number) {
    this.router.navigate(['/product-list-by-brand/', id_brand])
  }
  productById(id:number){
    this.router.navigate(['/product-by-id',{id}])
   
   }
   addToCart(id:number){
    console.log(id)
}

   }


