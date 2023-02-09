import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { fileHandel } from './_model/file-handel.model';
import { Product } from './_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProccessService {

  constructor( private sanitizer:DomSanitizer) { }
  public createImages(product:Product){
    const productImages:any[]=product.productImages;

    const productImagestoFileHandel:fileHandel[]=[];
    for(let i=0;i<productImages.length;i++){
      const imageFileData=productImages[i];
     const imageBlob = this.dataUriToBlob(imageFileData.pic,imageFileData.type)
    const file = new File(
      [imageBlob],imageFileData.name ,{type:imageFileData.type})
      const finalFileHandel:fileHandel={file:file,url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      };
      productImagestoFileHandel.push(finalFileHandel);
    
    }
   product.productImages=productImagestoFileHandel;
   return product;
  }
  public dataUriToBlob(pic:any,type:any){
    const byteString = window.atob(pic);
    const arrayuffer= new ArrayBuffer(byteString.length);
    const int8Array= new Uint8Array(arrayuffer);
    for(let i=0 ; i<byteString.length; i++){
       int8Array[i]=  byteString.charCodeAt(i);
       }
      const blob= new Blob([int8Array], {type:type});
      return blob;
  }
}
