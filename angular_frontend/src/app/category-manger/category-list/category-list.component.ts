import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { Category } from '../../_model/category.model';
import { CategoryServicesService } from '../../_services/category-services.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  id_cat:number;
  message:string;

  displayedColumns: string[] = ['ID', 'CATEGORY NAME', 'ACTION'];
  category: Category[] = []
  cat:Category = new Category
  valid: boolean;

  
  constructor(
    private categoryService: CategoryServicesService,
    private router:Router,private rout:ActivatedRoute, public dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.id_cat=this.rout.snapshot.params['id_cat']  
    this.categoryService.getCategoryByID(this.id_cat).subscribe((data)=>
    {console.log(data)})
    this.getAllCategory();
  }
  public getAllCategory() {
    this.categoryService.getAllCategory().subscribe(
      (data: Category[]) => {
        console.log(data)
       
        this.category = data;
        if(this.category.length==0){
          this.message="no category exist ";
          this.valid=true
        }
      })
  }
public addCategory(){
  this.categoryService.addCategory(this.cat).subscribe(
    (data: Category) => {
      console.log(data)
      
      if(data === null){
        this.message ="Category is null or already exist"
        this.valid=false;
        this.getAllCategory() 
      }else{
        this.cat.name=""
        this.message ="Category added successffuly"
        this.valid=true;
        this.getAllCategory()
      }

      })
}
saveCategory(){
  this.addCategory()
  this.router.navigate(['/category'])
}
/* updateCat(){
  this.categoryService.updateCategory(this.cat,this.id_cat).subscribe(
    (data:Object)=>{console.log(data)}
  )
  console.log();
} */
deleteCat(element:any){
this.categoryService.deleteCategoryByID(element).subscribe(
  (data)=>{console.log(data)
    if(data=== null){
      this.message="Category   deleted with success "
      this.valid=true;
      this.getAllCategory();

    }},
  (errer:HttpErrorResponse)=>{console.log(errer)}
  )
}
updateCat(id_cat:number){
this.router.navigate(['/updateCat',id_cat])
}

}
