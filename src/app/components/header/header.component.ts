import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  template: `
    <div class="container w3-orange">
      <div class="logo">
        <img routerLink="home" src="/assets/vizTeams.png" alt="Viz Teams Logo">
      </div>
      <div class="links">
        <button *ngIf="!isAuth" class="header-login-button" routerLink="login">
          Login/Register
        </button>
        <button *ngIf="isAuth" class="header-login-button" (click)="onLogout()">
          Logout
        </button>
      </div>
    </div>

  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }


}
