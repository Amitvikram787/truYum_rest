import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { FoodItem } from '../food/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  filter =new Subject();
  baseUrl=environment.baseUrl;


  constructor( private httpClient:HttpClient,private userAuthService:UserAuthService) { }
  getAllMenuitems():Observable<any>
  {
    const httpOptions={
      headers:new HttpHeaders({

        'Content-Type':'application/json',
        'Authorization':'Bearer ' + this.userAuthService.getToken()
      })
    };
    return this.httpClient.get<FoodItem[]>(this.baseUrl + "/menu-items",httpOptions);
  }
  getMenuItems(menuItemId:number):Observable<any>
  {
    const httpOptions={
      headers:new HttpHeaders({
      
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + this.userAuthService.getToken()
      })
    };
    return this.httpClient.get<FoodItem[]>(`${this.baseUrl+"/menu-items"}/${menuItemId}`,httpOptions);
  }

  updateMenuItem(menuItem:FoodItem):Observable<any>
  {
    const httpOptions={
      headers:new HttpHeaders({

        'Content-Type':'application/json',
        'Authorization':'Bearer ' + this.userAuthService.getToken()
      })
  };
  return this.httpClient.put<void>(this.baseUrl+"/menu-items",menuItem,httpOptions);
}
}
