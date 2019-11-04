import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:Cart;

  constructor(private cartService:CartService) { 
    this.cart=this.cartService.getCart();
  }
 onRemoveItem(itemId:string)
 {
   this.cartService.removeFromCart(itemId);
 }
  ngOnInit() {
  }
  onIncrement(id:number){
      this.cartService.addToCart(+id,1);
      }
      onDecrement(id:number){
      this.cartService.removeQuantityFromCart(+id);
      }  
}
