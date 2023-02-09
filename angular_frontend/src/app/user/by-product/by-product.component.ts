import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ImageProccessService } from '../../image-proccess.service';
import { Brand } from '../../_model/brand.model';
import { Category } from '../../_model/category.model';
import { OrderDetails } from '../../_model/oderDetails.model';
import { Product } from '../../_model/product.model';
import { BrandService } from '../../_services/brand.service';
import { CategoryServicesService } from '../../_services/category-services.service';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-by-product',
  templateUrl: './by-product.component.html',
  styleUrls: ['./by-product.component.css']
})
export class ByProductComponent {
  categorys:  Category[] =[];
  brands:Brand [] =[]

  orderDetails:OrderDetails = {
    idOrder: 0,
    fullName: '',
    fullAdresse: '',
    contactNumber: '',
    altContactNumber: '',
    productQtes: []
  }
  productDetails:Product[]=[]
  valid: boolean;
  message: string;
  constructor(private route:ActivatedRoute ,private imageService: ImageProccessService, private router:Router,
    private productService:ProductService ,private categoryService:CategoryServicesService,
    private brandService:BrandService ){}
  ngOnInit(): void 
  {
    this.productDetails= this.route.snapshot.data["productDetails"]
    this.productDetails.forEach(
      x=>this.orderDetails.productQtes.push(
       { id:x.id , quantity:1}
      )
    );
    console.log(this.orderDetails)
    console.log(this.productDetails)
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
  public placeOrder(orderForm:NgForm){
    this.productService.placeOrder(this.orderDetails).subscribe(
      (data)=>{console.log(data) 
        if(data === null){
        this.valid=true;
        this.message="Order Placed With Success "
      }},
     
    )
    orderForm.reset()
  }
  getQuantityforProduct(id :number){
 const filterProd=   this.orderDetails.productQtes.filter(
      (prodQte)=>prodQte.id===id
    )
   return filterProd[0].quantity
  }
  calculTotalPrice(id:number, actPrice:number){
    const filterProd=   this.orderDetails.productQtes.filter(
      (prodQte)=>prodQte.id===id
    )
   return filterProd[0].quantity * actPrice
   
}
onQteCHnage(Qte:any, id:number){
   this.orderDetails.productQtes.filter((prodQte)=>prodQte.id===id)[0].quantity=Qte;
}
}
