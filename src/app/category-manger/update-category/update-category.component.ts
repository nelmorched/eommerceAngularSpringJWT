import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../_model/category.model';
import { CategoryServicesService } from '../../_services/category-services.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent  implements OnInit{
  message : string;
  valid:boolean;
  id_cat: number;
  constructor(private categoryService :CategoryServicesService,
    private rout:ActivatedRoute , private router:Router){}
    cat:Category =new Category
  ngOnInit(): void {
    this.id_cat=this.rout.snapshot.params['id_cat']  
    this.categoryService.getCategoryByID(this.id_cat).subscribe((data :Category)=>
    {console.log(data)
      this.cat=data
    }
    )  
  }
    updateCat(){
      this.categoryService.addCategory(this.cat).subscribe(data=>{
        console.log(data)
      if(data.name != this.cat.name )
    {
      this.message="update with success";
      this.valid=false;
    }},
        (errer:HttpErrorResponse)=>{console.log(errer)}
    )
    this.router.navigate(['/category'])
}
}

