import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { User } from "./user.model";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn:'root'
})
export class UserService
{
    user:User;
    baseUrl=environment.baseUrl;

    constructor(private httpClient:HttpClient){}
    authenticate(username:string ,password:string):Observable<User>
    {
        return Observable.create((observer:Observer<any>)=>
        {
            if(username!=='admin')
            {
                observer.next({username,firstname:'John',lastname:'Doe',role:'Customer'});
            }
            else{
                observer.next({username,firstname:'Admin',lastname:'User',role:'Admin'});

            }
            return null;
        })
    }
    addUser(user)
    {
        this.user={
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            password:user.password
        }

        return this.httpClient.post(this.baseUrl+ "/users",user);
    }
    getUser(){
        return this.user.username;
    }
}