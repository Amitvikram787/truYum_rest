import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FoodItem } from '../food-item.model';
import { AuthService } from 'src/app/site/auth.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {
  ngOnInit(){}
  

  @Input() Food:FoodItem;
  @Output() addedToCart:EventEmitter<number>=new EventEmitter<number>();
  foodAdded= false;
  constructor( private authService:AuthService) { }

  onAddToCart(foodid:number)
  {
    this.addedToCart.emit(foodid);
    this.foodAdded=true;
    setTimeout(()=>{
      this.foodAdded=false;
    },1000);
    return false;

  }
   authsource=false;

  isEditAllowed()
  {
    return this.authService.logedIn && this.authService.isAdminUser();
  }
  loggedInn(){
     if(this.authService.logedIn){
       this.authsource=true;
     }
  }
}
