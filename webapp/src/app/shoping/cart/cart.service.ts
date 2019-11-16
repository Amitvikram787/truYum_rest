import { Injectable, EventEmitter } from "@angular/core";
import { Cart } from "../cart";
import { FoodService } from "src/app/food/food.service";
import { FoodItem } from "src/app/food/food-item.model";
import { UUID } from 'angular2-uuid';
import { environment } from "src/environments/environment";
import { UserAuthService } from "src/app/services/user-auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
}) 
export class CartService
{

    user:string;
    menuItemId:number;
    baseUrl=environment.baseUrl;
    cart:Cart=
    {
        items:null,
        total:0
    }
    changeEmitter:EventEmitter<void>=new EventEmitter();
    constructor( private foodService:FoodService,private userAuthService:UserAuthService,private httpClient:HttpClient){}
    getCart():Observable<any>
    {
        console.log("inside get all cart items");
        this.user=this.userAuthService.getuser();
        console.log(this.user);
        const httpOptions={
            headers:new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Bearer '+this.userAuthService.getToken()

            })
           
        };
        return this.httpClient.get<Cart[]>(this.baseUrl+"/carts"+"/"+this.user,httpOptions);
    }

addToCart(user:string ,menuIitemId:number)
{
    console.log("inside add cart item");
    console.log(user);
    console.log(this.userAuthService.getToken());
    const httpOptions={
        headers:new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer '+this.userAuthService.getToken()

        })
       
    };
    return this.httpClient.post<Cart>(this.baseUrl+"/carts"+"/"+user+"/"+menuIitemId,{},httpOptions);


}

    // addToCart(foodid:number,quantity:number)
    // {
    //     this.foodService.getItem(foodid).subscribe((foodToadded:FoodItem)=>{
    //         const uid =UUID.UUID();
    //         if(this.cart.items==null)
    //         {
    //             this.cart.items=[{itemId:uid,foodItem:foodToadded,quantity}];
    //             this.cart.total =foodToadded.price;
    //         }
    //          else{
    //                             let repeated =this.cart.items.findIndex(cartItem=>cartItem.foodItem.id === foodid);
    //                             if(repeated!==-1){
    //                                 this.cart.items[repeated].quantity+=quantity;
    //                             }else{
    //                                 this.cart.items.push({itemId:uid,foodItem:foodToadded,quantity});
    //                             }
    //                             this.cart.total+=foodToadded.price*quantity;
    //                         }  

    //     });
    // }
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
    removeFromCart(itemId:number,quantity:number)
    {
    //     const itemIndex=this.cart.items.findIndex(cartItem=>cartItem.itemId===itemId);
    //     const itemTobeRemoved=this.cart.items.splice(itemIndex,1)[0];
    //     this.cart.total-=itemTobeRemoved.foodItem.price;
    console.log("inside remove cart item");
    this.user=this.userAuthService.getuser();
    const httpOptions={
        headers:new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer '+this.userAuthService.getToken()

        })
       
    };
    return this.httpClient.delete<Cart>(`${this.baseUrl}/carts/${this.user}/${itemId}?quantity=${quantity}`,httpOptions);
     }
    clearCart()
    {
        this.cart.items=null;
        this.cart.total=0;
    }
}