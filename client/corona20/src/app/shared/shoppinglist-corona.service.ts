import { Injectable } from '@angular/core';
import {Shoppinglist, Item, Comment} from "./shoppinglist";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable()
  //providedIn: 'root'
export class ShoppinglistCoronaService{
    private api = 'http://corona20.s1710456022.student.kwmhgb.at/api';

    constructor(private http:HttpClient){}

    getAll():Observable<Array<Shoppinglist>>{
        return this.http.get(`${this.api}/shoppinglists`).pipe(retry(3)).pipe(catchError(this.errorHandler))
    }

    getSingle(id: number): Observable<Shoppinglist> {
        return this.http.get<Shoppinglist>(`${this.api}/shoppinglists/${id} `)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    create(shoppinglist: Shoppinglist): Observable<any> {
        return this.http.post(`${this.api}/shoppinglist`, shoppinglist)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    update(shoppinglist: Shoppinglist): Observable<any> {
        return this.http.put(`${this.api}/shoppinglist/${shoppinglist.id} `, shoppinglist)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    remove(id: number): Observable<any> {
        console.log("Observable");
        return this.http.delete(`${this.api}/shoppinglist/${id} `)
            .pipe(retry(3)).pipe(catchError(this.errorHandler));
    }

    private errorHandler(error: Error | any): Observable<any> {
        return throwError(error);
    }


}


/*export class ShoppinglistCoronaService {
  shoppinglists:Shoppinglist[];

  constructor() {
      console.log("service constructor");
    this.shoppinglists = [
      new Shoppinglist(
          1,
          'DamenEinkaufsliste',
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
    ];
  }
  getAll(){
    return this.shoppinglists;
  }

  getSingle(id :number) : Shoppinglist{
      console.log(this.shoppinglists);
      return this.shoppinglists.find(shoppinglist => shoppinglist.id == id);
  }

}*/
