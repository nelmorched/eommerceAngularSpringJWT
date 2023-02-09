import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './loginOption/login/login.component';
import { IndexUserComponent } from './index-user/index-user.component';
import { IndexAdminComponent } from './Admin/index-admin/index-admin.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_auth/auth.guard';
import { authInterseptor } from './_auth/auth.intercepter';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import {MatTreeModule} from '@angular/material/tree';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ProductlistComponent } from './product-manger/productlist/productlist.component';
import { AddproductComponent } from './product-manger/addproduct/addproduct.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import { UpdateProductComponent } from './product-manger/update-product/update-product.component';
import { ShowImagesDialogComponent } from './product-manger/show-images-dialog/show-images-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CategoryListComponent } from './category-manger/category-list/category-list.component';
import { BrandListComponent } from './brand-manger/brand-list/brand-list.component';
import { UpdateCategoryComponent } from './category-manger/update-category/update-category.component';
import { UpdateBrandComponent } from './brand-manger/update-brand/update-brand.component';
import { AddAdminComponent } from './Admin/add-admin/add-admin.component';
import { ProductListComponent } from './user/product-list/product-list.component';
import { ListProductByCategoryComponent } from './user/list-product-by-category/list-product-by-category.component';
import { ListProductByBrandComponent } from './user/list-product-by-brand/list-product-by-brand.component';
import { ProductByIdComponent } from './user/product-by-id/product-by-id.component';
import { ByProductComponent } from './user/by-product/by-product.component';
import { RegisterComponent } from './user/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    
    IndexUserComponent,
    IndexAdminComponent,
    ProductlistComponent,
    AddproductComponent,
    UpdateProductComponent,
    ShowImagesDialogComponent,
    CategoryListComponent,
    BrandListComponent,
    UpdateCategoryComponent,
    UpdateBrandComponent,
    AddAdminComponent,
    ProductListComponent,
    ListProductByCategoryComponent,
    ListProductByBrandComponent,
    ProductByIdComponent,
    ByProductComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatTreeModule,
    MatTooltipModule,
    MatIconModule,MatFormFieldModule,MatInputModule,MatGridListModule,MatTableModule,MatDialogModule,
    MatSelectModule, 
  ],
  providers: [
    AuthGuard,
    {provide:HTTP_INTERCEPTORS,
     useClass:authInterseptor,
     multi:true},
     UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
