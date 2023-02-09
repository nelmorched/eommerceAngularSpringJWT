import { Product } from "./product.model";
import { ShoppingCart } from "./shoppingCart.model";

export class CartItem{
    idcart :number;
    quantity :number;
    totalPrice:number;
    shoppingCart:ShoppingCart
    product:Product;
}