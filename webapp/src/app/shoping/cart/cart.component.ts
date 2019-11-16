import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { CartService } from './cart.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/site/user.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  error: string;

  constructor(private cartService: CartService,private userService:UserAuthService) {
     this.cartService.getCart().subscribe((data)=>{
       this.cart=data;
     });
  }
  ngOnInit() {
    this.cartService.changeEmitter.subscribe(()=>{      
      this.cartService.getCart().subscribe(cart => {
        console.log(cart);
        this.cart = cart;
      }, (error) => {
        this.cart = {
          items: null,
          total: 0
        };
        this.error = error.error.message;
      });
    })
  }
  onIncrement(itemId:number){
    
    return this.cartService.addToCart(this.userService.getuser(),itemId).subscribe(()=>{
      this.cartService.changeEmitter.emit();
    });
  }
  onDecrement(itemId:number){
    return this.cartService.removeFromCart(itemId,1).subscribe(()=>{
      this.cartService.changeEmitter.emit();
    });
  }
  onDelete(itemId:number){
    console.log(itemId);
    console.log("delete",this.cart.items.find(item=>item.foodItem.id===itemId).quantity);
    return this.cartService.removeFromCart(itemId,this.cart.items.find(item=>item.foodItem.id===itemId).quantity).subscribe(()=>{
      this.cartService.changeEmitter.emit();
    });
  }

}
