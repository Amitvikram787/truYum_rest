import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   signup:FormGroup;
   formss:boolean;
   error:string;
   passwordError:string;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.signup=new FormGroup({
        'username' :new FormControl(null,[Validators.required,Validators.maxLength(20)],this.isuser),
       'firstName':new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(50)]),
       'lastName':new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]+$'),Validators.maxLength(50)]),
       'password': new FormControl(null,Validators.required),
       'cpassword': new FormControl(null,[Validators.required,this.mcp.bind(this)] )

      

    });
    
    
  }
  get username()
    {
      return this.signup.get('username');
    }

  get firstName()
  {
    return this.signup.get('firstName');
  }
  get lastName()
  {
    return this.signup.get('lastName');

  }
  get password()
  {
    return this.signup.get('password');
  }
  get cpassword()
  {
    return this.signup.get('cpassword');
  }
  isuser(formcontrol:FormControl): Promise<any>
  {
    const promise= new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(formcontrol.value==='John')
        {
          resolve({'userNameTaken':true});
        }else{
          resolve(null);
        }
      },1000);
    

    }



    
    );
    return promise;

  }
  mcp(formcontrol:FormControl)
  {
    if(this.signup)
    {
      if(formcontrol.value && formcontrol.value.length>0 &&
        formcontrol.value !==this.password.value)
        {
          return {'nomatch':true};
        }
    }
  return null;
  }
  onSubmit()
  {
    // this.formss=true;
    // this.signup.reset();
  let user1=this.signup.value.password;
  let user2=this.signup.value.cpassword;
  if(user1===user2)
  {
    this.userService.addUser(this.signup.value).subscribe(data=>
      {
        this.router.navigate(['/login']);
      }, error =>
      {
        this.error=error.error.message;
        console.log(this.error);
        
      }
      
      );

  }
  else{
    this.passwordError="Password and confirm password is not match";
  }


  }
  
}
