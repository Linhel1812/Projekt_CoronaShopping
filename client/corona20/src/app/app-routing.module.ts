import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {ShoppinglistDetailsComponent} from "./shoppinglist-details/shoppinglist-details.component";
import {ShoppinglistListComponent} from "./shoppinglist-list/shoppinglist-list.component";
import {HomeComponent} from "./home/home.component";
import {ShoppinglistFormComponent} from "./shoppinglist-form/shoppinglist-form.component";
import {LoginComponent} from "./login/login.component";



const routes : Routes = [
    {path: '', redirectTo:'home', pathMatch:'full'},
    {path: 'home', component:HomeComponent},
    {path: 'shoppinglists', component:ShoppinglistListComponent},
    {path: 'shoppinglists/:id', component:ShoppinglistDetailsComponent},
    {path: 'admin', component: ShoppinglistFormComponent},
    {path: 'admin/:id', component: ShoppinglistFormComponent},
    {path: 'login', component:LoginComponent}

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule{}
