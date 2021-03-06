import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  template: `
    <div class="w3-center-card w3-container w3-animate-top">
      <form (ngSubmit)="onSubmit(regForm)" #regForm="ngForm"
            class="w3-container w3-half w3-card-4 w3-light-grey w3-text-teal">
        <h2 class="w3-center">Registration</h2>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
          <div class="w3-rest">
            <input
              class="w3-input w3-border"
              name="first"
              type="text"
              placeholder="First Name"
              name="firstName"
              ngModel>
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
          <div class="w3-rest">
            <input
              class="w3-input w3-border"
              name="last"
              type="text"
              placeholder="Last Name"
              name="lastName"
              ngModel>
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fas fa-envelope"></i></div>
          <div class="w3-rest">
            <input
              class="w3-input w3-border"
              name="email"
              type="text"
              placeholder="Email"
              name="email"
              ngModel>
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge far fa-id-card"></i></div>
          <div class="w3-rest">
            <input
              class="w3-input w3-border"
              name="position"
              type="text"
              placeholder="Position"
              name="position"
              ngModel>
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fas fa-lock"></i></div>
          <div class="w3-rest">
            <input
              class="w3-input w3-border"
              type="password"
              name="password"
              type="text"
              placeholder="Password"
              name="password"
              ngModel>
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fas fa-lock"></i></div>
          <div class="w3-rest">
            <input
              class="w3-input w3-border"
              type="password"
              name="passwordConfirmation"
              type="text"
              placeholder="Password Confirmation"
              name="confirmation"
              ngModel>
          </div>
        </div>
        <div class="w3-display-container w3-half w3-right w3-margin-bottom">
          <div class="w3-center">
            <button type="submit" class="w3-button w3-teal w3-margin-left w3-right">Save</button>
            <button routerLink="/login" class="w3-button w3-red w3-right">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
