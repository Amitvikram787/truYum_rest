import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './site/login/login.component';
import { SignupComponent } from './site/signup/signup.component';
import { NotFoundComponent } from './site/not-found/not-found.component';
import { MenuComponent } from './food/menu/menu.component';
import { CartComponent } from './shoping/cart/cart.component';
import { ItemEditComponent } from './food/item-edit/item-edit.component';
import { AuthService } from './site/auth.service';
import { AuthGardService } from './site/auth-gard.service';

const routes: Routes = [
  {path:'',component:MenuComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'cart' ,component:CartComponent,canActivate:[AuthGardService]},
  {path:'productEdit/:id',component:ItemEditComponent,canActivate:[AuthGardService]},
  {path:'menu',component:MenuComponent},
  
  {path :'**' ,component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

