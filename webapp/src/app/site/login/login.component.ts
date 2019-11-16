import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { CartService } from 'src/app/shoping/cart/cart.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   error:string;
   //isLoginValid:boolean=true;
   authSource:boolean=false;
  constructor(
    private route:ActivatedRoute,
    private router:Router,private authenticationService:AuthenticationService, private userAuthService:UserAuthService, private cartService:CartService,private authService:AuthService) { 
      this.authSource=route.snapshot.queryParams['notLogged'];
    }

  ngOnInit() {
    if( this. userAuthService.getMenuId()!=-1)
    {
     // this.isLoginValid=true;
    }
      else
      {
       // this.isLoginValid=false;
      }



  }
  onSubmit(form:NgForm)
  {
     this.authService.logIn(form.value.uname,form.value.pwd);
    //  this.authenticationService.authenticate(form.value.username,form.value.password).subscribe(data=>{

    //   this.userAuthService.loggedIn=true;
    //   console.log(data.token);
    //   this.userAuthService.setToken(data.token);
    //   this.userAuthService.setRole(data.role);
    //   this.userAuthService.setUser(form.value.username);
    //   if(this.userAuthService.getuser()!="admin" && this.userAuthService.getMenuId()!=-1)
    //   {
    //    // this.cartService.addToCart(this.userAuthService.getuser(),this.userAuthService.getMenuId()).subscribe(data =>
    //       // {
    //       //   console.log("Added");
    //       // });
        
    //   }
    //   this.router.navigate(['menu']);
     
    //   },
    //   (error)=>
    //   {
    //     console.log(error.message);
    //     if(error.status==404)
    //     {
    //       this.error="Invalid username/password"
    //     }

    //  })
    
     
    }
    isLoginValid()
    {
      return this.authService.isloginValid;
    }
  
  }


