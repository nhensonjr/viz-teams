import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="w3-center-card w3-container w3-animate-top">
      <form class="w3-container w3-half w3-card-4 w3-light-grey w3-text-teal">
        <h2 class="w3-center">Login</h2>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fas fa-envelope"></i></div>
          <div class="w3-rest">
            <input class="w3-input w3-border" name="email" type="text" placeholder="Email">
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fas fa-lock"></i></div>
          <div class="w3-rest">
            <input class="w3-input w3-border" type="password" name="password" type="text" placeholder="Password">
          </div>
        </div>

        <div class="w3-display-container w3-half w3-right w3-margin-bottom">
          <div class="w3-center">
            <button class="w3-button w3-teal w3-margin-left w3-right" (click)="login()">Login</button>
            <button routerLink="/registration" class="w3-button w3-purple w3-right">Sign Up</button>
            <div id="no-cursor" class="w3-button w3-hover-none w3-hover-text-teal w3-right">Not a member?</div>
          </div>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AngularFireAuth, private router: Router, private userService: UserService) {
  }

  login() {
    console.log('YOu loGged in');
  }
}
