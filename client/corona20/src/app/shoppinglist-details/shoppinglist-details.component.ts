import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import {Shoppinglist} from "../shared/shoppinglist";
import {ShoppinglistCoronaService} from "../shared/shoppinglist-corona.service";
import {ActivatedRoute, Router} from "@angular/router";
import {conditionallyCreateMapObjectLiteral} from "@angular/compiler/src/render3/view/util";
import {ShoppinglistFactory} from "../shared/shoppinglist-factory";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-shoppinglist-details',
  templateUrl: './shoppinglist-details.component.html',
  styles: []
})
export class ShoppinglistDetailsComponent implements OnInit{
  shoppinglist:Shoppinglist = ShoppinglistFactory.empty();

  constructor(
      private bs: ShoppinglistCoronaService,
      private router: Router,
      private route:ActivatedRoute,
      public authService: AuthenticationService
  ){}

  ngOnInit(){

    const params = this.route.snapshot.params;
    //this.shoppinglist = this.bs.getSingle(params['id']);
    this.bs.getSingle(params['id']).subscribe(b => this.shoppinglist = b);
    console.log("ng on init");
  }

  removeShoppinglist(){
    if(confirm("Shoppinglist wirklich löschen?")){
      this.bs.remove(this.shoppinglist.id)
          .subscribe(res => this.router.navigate(['../'], {relativeTo:this.route}));
    }

  }

  takeShoppinglist() {
    if (confirm('Shoppingliste wirklich übernehmen?')) {
      this.bs.update(this.shoppinglist).subscribe(res => {
        this.shoppinglist.shopper_id = this.authService.getCurrentUserId();
        this.bs.update(this.shoppinglist).subscribe(res => this.router.navigate(['../'], {relativeTo: this.route}));
      })
    }
  }
  //@Input() shoppinglist:Shoppinglist;
  //@Output() showListEvent = new EventEmitter<any>();

  /*getQuantity(num: number){
    return new Array(num);
  }*/

  /*showShoppingList(){
    this.showListEvent.emit();
  }*/




}
