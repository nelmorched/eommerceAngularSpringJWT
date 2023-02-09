import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminComponent } from './Admin/add-admin/add-admin.component';
import { AddproductComponent } from './product-manger/addproduct/addproduct.component';
import { BrandListComponent } from './brand-manger/brand-list/brand-list.component';
import { CategoryListComponent } from './category-manger/category-list/category-list.component';
import { IndexAdminComponent } from './Admin/index-admin/index-admin.component';
import { IndexUserComponent } from './index-user/index-user.component';
import { LoginComponent } from './loginOption/login/login.component';
import { NotAuthComponent } from './loginOption/not-auth/not-auth.component';
import { ProductlistComponent } from './product-manger/productlist/productlist.component';
import { UpdateBrandComponent } from './brand-manger/update-brand/update-brand.component';
import { UpdateCategoryComponent } from './category-manger/update-category/update-category.component';
import { UpdateProductComponent } from './product-manger/update-product/update-product.component';
import { ListProductByBrandComponent } from './user/list-product-by-brand/list-product-by-brand.component';
import { ListProductByCategoryComponent } from './user/list-product-by-category/list-product-by-category.component';
import { ProductByIdComponent } from './user/product-by-id/product-by-id.component';
import { ProductListComponent } from './user/product-list/product-list.component';
import { AuthGuard } from './_auth/auth.guard';
import { ByProductComponent } from './user/by-product/by-product.component';
import { ProductResolverServiceService } from './_services/product-resolver-service.service';
import { ProductDetailsForUserService } from './_services/product-details-for-user.service';
import { BuyProductResolverServiceService } from './_services/buy-product-resolver-service.service';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"indexadmin",component:IndexAdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
    {path:"",component:IndexUserComponent },
    {path:"404",component:NotAuthComponent},
    {path:"product" ,component:ProductlistComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
    {path:"addProduct",component:AddproductComponent, canActivate:[AuthGuard], data:{roles:['Admin']},
     resolve : {
      product :ProductResolverServiceService
    }
  },
    {path:"category" , component:CategoryListComponent},
    {path:"brand" , component:BrandListComponent},
    {path:"updateCat/:id_cat" , component:UpdateCategoryComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
    {path:"updateBrand/:id_brand" , component:UpdateBrandComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
    {path:"addAdmin" , component:AddAdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
    {path:"product-list",component:ProductListComponent },
    {path:"product-list-by-category/:id_cat", component:ListProductByCategoryComponent},
    {path:"product-list-by-brand/:id_brand", component:ListProductByBrandComponent},
    {path:"product-by-id", component:ProductByIdComponent
  , resolve : {
    product :ProductDetailsForUserService
  }},
    {path:"buy-product", component:ByProductComponent , canActivate:[AuthGuard], data:{roles:['User']},
    resolve : {
      productDetails :BuyProductResolverServiceService
    }
  },
  {path:"register", component:RegisterComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
