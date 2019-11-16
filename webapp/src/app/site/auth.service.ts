import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { UserAuthService } from "../services/user-auth.service";
import { AuthenticationService } from "../services/authentication.service";
import { Router } from "@angular/router";
import { CartComponent } from "../shoping/cart/cart.component";
import { CartService } from "../shoping/cart/cart.service";

@Injectable({
    providedIn:'root'
})
export class AuthService
{
   error:string;
    
    logedIn=false;
    isAdmin=false;
    accessToken:string;
    redirectUrl='/';
    userAuthenticated:User;
    isloginValid:boolean=true;

    constructor(private userService:UserService,private userAuthService:UserAuthService, private authentiactionService:AuthenticationService, private router:Router,private cartService:CartService){}
    logIn(username:string,password:string)
    {

        this.authentiactionService.authenticate(username,password).subscribe(data=>
            {
        this.userAuthService.loggedIn=true;
      console.log(data.token);
      this.userAuthService.setToken(data.token);
      this.userAuthService.setRole(data.role);
      this.userAuthService.setUser(username);
      this.logedIn=true;
      this.isloginValid=true;
      this.isAdmin=data.role==='ROLE_ADMIN';
       if(this.userAuthService.getuser()!="admin" && this.userAuthService.getMenuId()!=-1)
            {
             this.cartService.addToCart  (this.userAuthService.getuser(),this.userAuthService.getMenuId()).subscribe(data =>
                {
                  console.log("Added");
                });
              
            }
      
            
           
            this.router.navigate(['/menu']);
     
            },
         (error)=>
        {
          this.isloginValid=false;
          this.userAuthService.loggedIn=false;
          this.logedIn=false;
          console.log(error.message);
          if(error.status==404)
          {
            this.error="Invalid username/password"
          } 
  
       });
      

        // this.userService.authenticate(username,password).subscribe((user:User)=>
        // {
        //     if(user)
        //     {
        //         this.logedIn=true;
        //         this.userAuthenticated=user;
        //         this.isAdmin=user.role==='Admin';
        //     }
        // })
    }
    logOut()
    {
        this.redirectUrl='/';
        this.logedIn=false;
    }
    isAdminUser()
    {
        return this.isAdmin;
    }
}