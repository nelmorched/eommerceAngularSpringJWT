import { CartItem } from "./cart.model";
import { UserApp } from "./user.model";

export class ShoppingCart{
    idShoppingCart : number;
    totalItem:number;
     totalPrice :number;
    userApp :UserApp;
    cartItem :CartItem [];
}