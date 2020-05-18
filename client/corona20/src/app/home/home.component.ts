import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-home',
  template: `
    <div class="ui container" id="homecontainer">
      <h1 class="headline">Willkommen!</h1>
      <p class="headertxt">Brauchen Sie Hilfe oder werden Sie selbst zum Helfer?</p>
      <p class="headertxt">#KWMgegenCorona </p>
      <a routerLink="../shoppinglists" id="homebtn" class="ui red button">

        Einkaufslisten ansehen

        <i class="right arrow icon"></i>

      </a>

    </div>
  `,
  styles: []
})
export class HomeComponent {

  constructor() { }

  ngOnInit(): void {
  }
}