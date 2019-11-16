import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  loggedIn:boolean;
  menuItemId:number=-1;
  role:string;
  redirectUrl='/';
  token:string;
  user:string;


  constructor() { }
  public  getMenuId()
  {
    return this.menuItemId;
  }
  public setMenuItemId(menuItemId:number)
  {
    this.menuItemId=menuItemId;
    console.log("menu Item id"+ menuItemId);
  }
  public getToken()
  {
    return this.token;
  }
  public setToken(token:string)
  {
    this.token=token;

  }
  public getRole()
  {
    return this.role;
  }
  public setRole( role: string)
  {
    this.role=role;

  }


  public getuser()
  {
    return this.user;
  }
  public setUser( user:string)
  {
    this.user=user;
  }
  logOut()
  {
    this.redirectUrl='/';
    this.user=null;
    this.role=null;
    this.loggedIn=false;
  }

}
