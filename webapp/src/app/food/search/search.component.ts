import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { MenuItemService } from 'src/app/services/menu-item.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private foodService:FoodService, private menuitemService:MenuItemService) { }

  ngOnInit() {

   
  }
  onSearchText(event:any)
   {
    // this.foodService.filter.next({title:event.target.value});
    this.menuitemService.filter.next({title:event.target.value})

   } 

}
