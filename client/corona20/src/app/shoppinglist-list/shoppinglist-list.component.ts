import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Shoppinglist, Item, Comment} from "../shared/shoppinglist";
import {ShoppinglistCoronaService} from "../shared/shoppinglist-corona.service";


@Component({
  selector: 'bs-shoppinglist-list',
  templateUrl: './shoppinglist-list.component.html',
  styles: []
})
export class ShoppinglistListComponent implements OnInit {

  shoppinglists: Shoppinglist[];

  @Output() showDetailsEvent = new EventEmitter<Shoppinglist>();

  constructor(private bs: ShoppinglistCoronaService){}

  ngOnInit() {
      //this.shoppinglists= this.sl.getAll();
    this.bs.getAll().subscribe(res=>this.shoppinglists=res);
    /*this.shoppinglists = [
        new Shoppinglist(
            1,
            'Damen Einkaufsliste',
            new Date(2019, 4,3),
            1,
            null,
            null,
            [new Item(1, 'Milch', 2, 4),
              new Item(2, 'Eier', 10, 5)],
            [new Comment(1,'Das ist ein Kommentar. Yay!', 2,new Date(2020, 4,3) ),
            new Comment(2, 'Das ist Kommentar 2', 3,new Date(2020, 4,3) )]
        ),
      new Shoppinglist(
          2,
          'Laurent Einkaufsliste',
          new Date(2019, 4,3),
          1,
          null,
          null,
          [new Item(1, 'Cola', 2, 4),
            new Item(2, 'Sprite', 10, 5)],
      ),
    ];*/
  }

  showDetails(shoppinglist:Shoppinglist){
      this.showDetailsEvent.emit(shoppinglist);
  }

}
