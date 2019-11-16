import { FoodItem } from "../food/food-item.model";

export interface Cart
{
    items:[{
        itemId:number,
        foodItem:FoodItem;
        quantity?:number;
    }];
    total:number;
}