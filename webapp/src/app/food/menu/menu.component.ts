import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../food-item.model';
import { FoodService } from '../food.service';
import { CartService } from 'src/app/shoping/cart/cart.service';
import { AuthService } from 'src/app/site/auth.service';
import { Router } from '@angular/router';
import { MenuItemService } from 'src/app/services/menu-item.service';
import { UserAuthService } from 'src/app/services/user-auth.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

 foods:FoodItem[];
 orignallist:FoodItem[];
 temporaryList:FoodItem[];
 user:string;
  constructor( private foodService:FoodService, private cartService:CartService,private authService:AuthService,private router:Router, private menuItemService:MenuItemService,private userAuthService:UserAuthService) { }

  ngOnInit() {
    // this.foodService.getItems().subscribe((data:FoodItem[])=>
    // {
    //   this.foods=[...data];
    //   this.orignallist=[...data];
    // });
    // this.foodService.filter.subscribe((obj:{title:string})=>
    // {
    //   if(obj.title!=='')
    //   {
    //     const result=this.orignallist.filter(prod=>prod.name.toLowerCase().includes(obj.title.toLowerCase()));
    //     this.foods=result?result :[];
    //   }
    //   else{
    //     this.foods=[...this.orignallist];
    //   }
    // }
    // )
    this.menuItemService.getAllMenuitems().subscribe((food :FoodItem[])=>
    {
      this.temporaryList=[...food];
      this.foods=[...food];
    });
    this.menuItemService.filter.subscribe((obj:{title:string})=>
    {
      if(obj.title!=='')
      {
        const result=this.temporaryList.filter(food=>food.name.toLowerCase().includes(obj.title.toLowerCase()));
        this.foods=result?result:[];
      }
      else{
        this.foods=[...this.temporaryList];
      }
    });

  }
  addFoodToCart(productId:number)
  {
    // this.cartService.addToCart(foodid,1);
    // if(!this.authService.logedIn )
    // {
    //   this.router.navigate(['/login'],{queryParams:{notLogged:true}});
    // }
    this.user=this.userAuthService.getuser();
    console.log("add food"+ this.user);
    this.cartService.addToCart(this.user,productId).subscribe();

  }
 
}
