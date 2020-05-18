import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ShoppinglistListComponent } from './shoppinglist-list/shoppinglist-list.component';
import { ShoppinglistListItemComponent } from './shoppinglist-list-item/shoppinglist-list-item.component';
import { ShoppinglistDetailsComponent } from './shoppinglist-details/shoppinglist-details.component';
import {ShoppinglistCoronaService} from "./shared/shoppinglist-corona.service";
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { ShoppinglistFormComponent } from './shoppinglist-form/shoppinglist-form.component';
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    ShoppinglistListComponent,
    ShoppinglistListItemComponent,
    ShoppinglistDetailsComponent,
    HomeComponent,
    LoginComponent,
    ShoppinglistFormComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [ShoppinglistCoronaService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
