import { OrderProductQte } from "./OrderProductQte.model";

export interface OrderDetails {
    idOrder: number;
     fullName :string;
	 fullAdresse:string;
	 contactNumber:string;
     altContactNumber:string;
    productQtes: OrderProductQte[]
}