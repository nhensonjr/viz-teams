import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="container w3-orange">
      <div class="logo">
        <img routerLink="home" src="/assets/vizTeams.png" alt="Viz Teams Logo">
      </div>
      <div class="links">
        <button class="header-login-button" routerLink="login">
          Login/Register
        </button>
      </div>
    </div>

  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor() {
  }
}
