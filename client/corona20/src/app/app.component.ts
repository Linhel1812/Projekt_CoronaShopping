import { Component } from '@angular/core';
import {Shoppinglist} from "./shared/shoppinglist";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  /*template: `<bs-shoppinglist-list *ngIf="listOn"
                                   (showDetailsEvent)="showDetails($event)"></bs-shoppinglist-list>
  <bs-shoppinglist-details *ngIf="detailsOn" [shoppinglist]="shoppinglist"
  (showListEvent)="showList()"></bs-shoppinglist-details>`*/
  //styles: []
})
export class AppComponent {
  //listOn = true;
  //detailsOn=false;

  constructor(public authService:AuthenticationService){

  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    } else{
      return "Login";
    }
  }

  //shoppinglist:Shoppinglist;



  /*showList(){
    this.listOn = true;
    this.detailsOn = false;
  }

  showDetails(shoppinglist:Shoppinglist){
    this.shoppinglist=shoppinglist;
    this.listOn=false;
    this.detailsOn=true;
  }*/

  //title = 'corona20';
  //person = undefined;
  //myUrl = "http://www.fh-ooe.at";
  /*person = {
    name: 'Laurent'
  }*/
  //myProperty="Startwert";

  /*myclickHandler(){
    console.log("In click handler");
    this.title = "Corona20 clicked";
  }*/
}

