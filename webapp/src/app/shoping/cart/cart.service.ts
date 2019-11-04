import { Injectable } from "@angular/core";
import { Cart } from "../cart";
import { FoodService } from "src/app/food/food.service";
import { FoodItem } from "src/app/food/food-item.model";
import { UUID } from 'angular2-uuid';

@Injectable({
    providedIn:'root'
}) 
export class CartService
{
    cart:Cart=
    {
        items:null,
        total:0
    }
    constructor( private foodService:FoodService){}
    getCart()
    {
        return this.cart;
    }
    addToCart(foodid:number,quantity:number)
    {
        this.foodService.getItem(foodid).subscribe((foodToadded:FoodItem)=>{
            const uid =UUID.UUID();
            if(this.cart.items==null)
            {
                this.cart.items=[{itemId:uid,foodItem:foodToadded,quantity}];
                this.cart.total =foodToadded.price;
            }
             else{
                                let repeated =this.cart.items.findIndex(cartItem=>cartItem.foodItem.id === foodid);
                                if(repeated!==-1){
                                    this.cart.items[repeated].quantity+=quantity;
                                }else{
                                    this.cart.items.push({itemId:uid,foodItem:foodToadded,quantity});
                                }
                                this.cart.total+=foodToadded.price*quantity;
                            }  

        });
    }
    removeQuantityFromCart(itemId:number){
                const itemIndex=this.cart.items.findIndex(cartItem=>cartItem.foodItem.id === itemId);
                if(itemIndex!==-1){
                    this.cart.total-=this.cart.items[itemIndex].foodItem.price;
                    this.cart.items[itemIndex].quantity--;
                    if(this.cart.items[itemIndex].quantity<1){
                        this.cart.items.splice(itemIndex,1);
                    }
                }
            }  
    removeFromCart(itemId:string)
    {
        const itemIndex=this.cart.items.findIndex(cartItem=>cartItem.itemId===itemId);
        const itemTobeRemoved=this.cart.items.splice(itemIndex,1)[0];
        this.cart.total-=itemTobeRemoved.foodItem.price;
    }
    clearCart()
    {
        this.cart.items=null;
        this.cart.total=0;
    }
}