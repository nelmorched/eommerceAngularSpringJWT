import { Component  ,OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UpdateBrandComponent } from '../update-brand/update-brand.component';
import { Brand } from '../../_model/brand.model';
import { BrandService } from '../../_services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
 displayedColumns: string[] = ['ID', 'BRAND NAME','ACTION'];
  brands:Brand[]=[] 
  brand:Brand= new Brand;
  message:string;
  valid:boolean;
  constructor(private brandService:BrandService ,private router:Router){}
  ngOnInit(): void {
     this.allBrand()
  }
  allBrand(){
    this.brandService.getAllBrand().subscribe
    ((data)=>{console.log(data)
    this.brands=data;
    if(this.brands.length==0){
      this.message="No Brand in DATA BASE"
      this.valid=true
        }
  })
  }
  deleteBrand(element:any){
    this.brandService.deleteByIDBrand(element).subscribe(
      (data)=>{console.log(data)
     if(data==null){
      this.valid=true;
      this.message="Brand deleted with success";
      this.allBrand();
     }})
    console.log(element)
  }
  updateBrands(id_brand:number){
   this.router.navigate(['/updateBrand/',id_brand])
  }
public addBrand(){
  this.brandService.addBrand(this.brand).subscribe(
    (data: Brand) => {
      console.log(data)
      
      if(data === null){
        this.message ="Brand is null or already exist"
        this.valid=true;
        this.allBrand() 
      }else{
        this.brand.nameBrand=""
        this.message ="Brand added successffuly"
        this.valid=true;
        this.allBrand()
      }

      })
}
}
