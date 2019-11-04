import { FoodItem } from "../food/food-item.model";

export interface Cart
{
    items:[{
        itemId:string,
        foodItem:FoodItem;
        quantity?:number;
        
    }];
    total:number;
}