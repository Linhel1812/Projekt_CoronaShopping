import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";
import {ShoppinglistFactory} from "../shared/shoppinglist-factory";
import {ShoppinglistCoronaService} from "../shared/shoppinglist-corona.service";
import {Shoppinglist, Item, Comment} from "../shared/shoppinglist";
import {ShoppinglistFormErrorMessages} from "./shoppinglist-form-error-messages";
import {AuthenticationService} from "../shared/authentication.service";


//import {ShoppinglistFormErrorMessages} from './book-form-error-messages';

@Component({
  selector: 'bs-shoppinglist-form',
  templateUrl: './shoppinglist-form.component.html',
  styles: []
})
export class ShoppinglistFormComponent implements OnInit {

  shoppinglistForm: FormGroup;
  shoppinglist = ShoppinglistFactory.empty();
  errors:{[key:string]:string} = {};
  isUpdatingShoppinglist = false;
  items: FormArray;
  comments:FormArray;

  constructor(private fb: FormBuilder, private bs: ShoppinglistCoronaService,
              private route: ActivatedRoute, private router: Router, public authService:AuthenticationService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingShoppinglist = true;
      this.bs.getSingle(id).subscribe(shoppinglist => {
        this.shoppinglist = shoppinglist;
        this.initShoppinglist();
      });
    }
    this.initShoppinglist();
  }

  initShoppinglist(){

    this.buildThumbnailsArray();

    this.shoppinglistForm = this.fb.group({
      id: this.shoppinglist.id,
      name: [this.shoppinglist.name, Validators.required],
      due_date: this.shoppinglist.due_date,
      creator_id: this.shoppinglist.creator_id,
      actual_price: this.shoppinglist.actual_price,
      items:this.items,
      comments:this.comments
    });
    this.shoppinglistForm.statusChanges.subscribe(()=>
    this.updateErrorMessages());
  }

  buildThumbnailsArray(){
    console.log(this.shoppinglist.items);

    if(this.shoppinglist.items.length == 0){ //if new shoppinglist had no itemns -> but no in edit mode
      this.shoppinglist.items.push(new Item(0,'',0, 0))
    }
    this.items = this.fb.array(
        this.shoppinglist.items.map(
            t => this.fb.group({
              id: this.fb.control(t.id),
              name: this.fb.control(t.name),
              quantity: this.fb.control(t.quantity),
              max_price:this.fb.control(t.max_price)
            })
        )
    );
    console.log(this.items);

    if(this.shoppinglist.comments.length == 0){
      console.log("Hier");
      this.shoppinglist.comments.push(new Comment(0, '', 0, new Date('YYYY-MM-DD HH:MI:SS')))
    }
    this.comments = this.fb.array(
        this.shoppinglist.comments.map(
            t => this.fb.group({
              id: this.fb.control(t.id),
              text: this.fb.control(t.text),
              user_id: this.fb.control(t.user_id),
              updated_at:this.fb.control(t.updated_at)
            })
        )
    );

  }


  addThumbnailControl() {
    this.items.push(this.fb.group({ name: null, quantity: null, max_price:null }));
  }

  addThumbnailControl2() {
    console.log("Kommentar hinzufügen");
    //console.log(this.authService.getCurrentUserId());
    this.comments.push(this.fb.group({ text: null}));
  }


  submitForm() {
    // filter empty values
    this.shoppinglistForm.value.items = this.shoppinglistForm.value.items.filter(thumbnail => thumbnail.name);
    this.shoppinglistForm.value.comments = this.shoppinglistForm.value.comments.filter(thumbnail => thumbnail.text);

    const shoppinglist: Shoppinglist = ShoppinglistFactory.fromObject(this.shoppinglistForm.value);
    //deep copy  - did not work without??
    shoppinglist.items = this.shoppinglistForm.value.items;
    console.log("this:");
    //console.log(shoppinglist.creator_id);

    //just copy the authors
   shoppinglist.comments = this.shoppinglistForm.value.comments;

    if (this.isUpdatingShoppinglist) {
      this.bs.update(shoppinglist).subscribe(res => {
        this.router.navigate(['../../shoppinglists', shoppinglist.id], { relativeTo: this.route });
      });
    } else {
      //let a = getCurrentUserId();
      shoppinglist.creator_id = this.authService.getCurrentUserId();// just for testing
      console.log("looook form component");
      //console.log(shoppinglist.actual_price);
      this.bs.create(shoppinglist).subscribe(res => {
        this.shoppinglist = ShoppinglistFactory.empty();
        this.shoppinglistForm.reset(ShoppinglistFactory.empty());
        this.router.navigate(['../shoppinglists'], { relativeTo: this.route });
      });
    }
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of ShoppinglistFormErrorMessages) {
      const control = this.shoppinglistForm.get(message.forControl);
      if (control &&
          control.dirty &&
          control.invalid &&
          control.errors[message.forValidator] &&
          !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

}
