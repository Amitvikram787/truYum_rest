import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"

import { Observable, from, Subject, Observer } from "rxjs";
import { FoodItem } from "./food-item.model";


@Injectable({providedIn:'root'})
export class FoodService
{
    configUrl='assets/item.json'
    filter=new Subject();
    constructor(private http:HttpClient){}
    getItems():Observable<any>{
        return this.http.get(this.configUrl);
    }
    getItem(id:number):Observable<any>
    {
        return Observable.create((observer:Observer<FoodItem>)=>
        {
            this.getItems().subscribe((foods:FoodItem[])=>
            {
                const prod=foods.find(product=>product.id==id);
                observer.next(prod);
            })

        })
    }
   
}