import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  template: `
    <div class="registration-form w3-container w3-animate-top">
      <form class="w3-container w3-half w3-card-4 w3-light-grey w3-text-teal">
        <h2 class="w3-center">Registration</h2>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
          <div class="w3-rest">
            <input class="w3-input w3-border" name="first" type="text" placeholder="First Name">
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
          <div class="w3-rest">
            <input class="w3-input w3-border" name="last" type="text" placeholder="Last Name">
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fas fa-envelope"></i></div>
          <div class="w3-rest">
            <input class="w3-input w3-border" name="email" type="text" placeholder="Email">
          </div>
        </div>


        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge far fa-id-card"></i></div>
          <div class="w3-rest">
            <input class="w3-input w3-border" name="position" type="text" placeholder="Position">
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fas fa-lock"></i></div>
          <div class="w3-rest">
            <input class="w3-input w3-border" type="password" name="password" type="text" placeholder="Password">
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fas fa-lock"></i></div>
          <div class="w3-rest">
            <input class="w3-input w3-border" type="password" name="passwordConfirmation" type="text"
                   placeholder="Password Confirmation">
          </div>
        </div>
        <div class="w3-display-container w3-half w3-right w3-margin-bottom">
          <div class="w3-center">
            <button class="w3-button w3-teal w3-margin-left w3-right">Save</button>
            <button routerLink="/login" class="w3-button w3-red w3-right">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
