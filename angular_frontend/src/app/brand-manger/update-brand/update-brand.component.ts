import { HttpErrorResponse } from '@angular/common/http';
import { Component ,OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '../../_model/brand.model';
import { BrandService } from '../../_services/brand.service';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent  implements OnInit {
  id_brand: number;
  brand:Brand =new Brand
  constructor(private brandService :BrandService,
    private rout:ActivatedRoute , private router:Router){}

    
  ngOnInit(): void {
    this.id_brand=this.rout.snapshot.params['id_brand']  
    this.brandService.getByIDBrand(this.id_brand).subscribe((data :Brand)=>
    {console.log(data)
      this.brand=data
    }
    )  
  }
    updateBrand(){
      this.brandService.addBrand(this.brand).subscribe(data=>{
        console.log(data)
    },
        (errer:HttpErrorResponse)=>{console.log(errer)}
    )
    this.router.navigate(['/brand'])
}

 

}
