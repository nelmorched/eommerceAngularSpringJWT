import { Brand } from "./brand.model";
import { Category } from "./category.model";
import { fileHandel } from "./file-handel.model";

export interface Product{
    id:number;
    productName:string;
    description:string;
    price:number;
    quantity:number;
    actPrice:number;
    productImages:fileHandel[];
    category:Category;
    brandProduct:Brand;
   
}