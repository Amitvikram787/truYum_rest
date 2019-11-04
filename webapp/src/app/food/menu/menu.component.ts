import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../food-item.model';
import { FoodService } from '../food.service';
import { CartService } from 'src/app/shoping/cart/cart.service';
import { AuthService } from 'src/app/site/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

 foods:FoodItem[];
 orignallist:FoodItem[];
  constructor( private foodService:FoodService, private cartService:CartService,private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.foodService.getItems().subscribe((data:FoodItem[])=>
    {
      this.foods=[...data];
      this.orignallist=[...data];
    });
    this.foodService.filter.subscribe((obj:{title:string})=>
    {
      if(obj.title!=='')
      {
        const result=this.orignallist.filter(prod=>prod.name.toLowerCase().includes(obj.title.toLowerCase()));
        this.foods=result?result :[];
      }
      else{
        this.foods=[...this.orignallist];
      }
    }
    )

  }
  addFoodToCart(foodid:number)
  {
    this.cartService.addToCart(foodid,1);
    if(!this.authService.logedIn )
    {
      this.router.navigate(['/login'],{queryParams:{notLogged:true}});
    }

  }
 
}
