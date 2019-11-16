import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './site/header/header.component';
import { LoginComponent } from './site/login/login.component';
import { SignupComponent } from './site/signup/signup.component';
import { SearchComponent } from './food/search/search.component';
import { MenuComponent } from './food/menu/menu.component';
import { ItemEditComponent } from './food/item-edit/item-edit.component';
import { ItemInfoComponent } from './food/item-info/item-info.component';
import {  HttpClientModule } from '@angular/common/http';
import { FoodService } from './food/food.service';
import { CartComponent } from './shoping/cart/cart.component';
import { UserService } from './site/user.service';
import { AuthService } from './site/auth.service';
import { NotFoundComponent } from './site/not-found/not-found.component';
import { UserAuthService } from './services/user-auth.service';
import { MenuItemService } from './services/menu-item.service';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent,
    MenuComponent,
    ItemEditComponent,
    ItemInfoComponent,
    CartComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [FoodService,UserService,AuthService,UserAuthService,MenuItemService,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
