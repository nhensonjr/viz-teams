import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-edit-person',
  template: `
    <div class="w3-center-card w3-container w3-animate-top">
      <form class="w3-container w3-half w3-card-4 w3-light-grey w3-text-teal">
        <h2 class="w3-center">Edit Team Member</h2>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
          <div class="w3-rest">
            <input class="w3-input w3-border" name="firstName" type="text" placeholder="First Name"
                   [(ngModel)]="person.firstName">
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
          <div class="w3-rest">
            <input class="w3-input w3-border" name="lastName" type="text" placeholder="Last Name"
                   [(ngModel)]="person.lastName">
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge far fa-id-card"></i></div>
          <div class="w3-rest">
            <input class="w3-input w3-border" name="position" type="text" placeholder="Position"
                   [(ngModel)]="person.position">
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fas fa-users"></i></div>
          <div class="w3-rest">
            <input class="w3-input w3-border" type="text" name="teamName"
                   placeholder="Team Name" [(ngModel)]="person.teamName">
          </div>
        </div>

        <h2 class="w3-center">Proficiencies</h2>
        <div class="w3-row w3-section w3-padding-large w3-white w3-text-teal w3-border">
          <div class="w3-threequarter">
            <div class="w3-container w3-margin-top w3-margin-bottom">
              <div class="w3-container">
                Front End <i id="frontIcon" class="fa fa-caret-down w3-cursor"
                             (click)="toggleDropdown('frontEnd','frontIcon')"></i>
              </div>

              <div id="frontEnd"
                   class="w3-hide w3-container w3-margin w3-animate-right w3-white w3-padding w3-text-teal">
                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>
              </div>
            </div>

            <div class="w3-container w3-margin-bottom">
              <div class="w3-container">
                Back End <i id="backIcon" class="fa fa-caret-down w3-cursor"
                            (click)="toggleDropdown('backEnd','backIcon')"></i>
              </div>

              <div id="backEnd"
                   class="w3-hide w3-container w3-margin w3-animate-right w3-white w3-padding w3-text-teal">
                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>
              </div>
            </div>

            <div class="w3-container w3-margin-bottom">
              <div class="w3-container">
                Dev-Ops <i id="devOpsIcon" class="fa fa-caret-down w3-cursor"
                            (click)="toggleDropdown('devOps','devOpsIcon')"></i>
              </div>

              <div id="devOps"
                   class="w3-hide w3-container w3-margin w3-animate-right w3-white w3-padding w3-text-teal">
                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>

                <input class="w3-check w3-margin-right" type="checkbox">
                <label class="w3-margin-right">Skill</label>
              </div>
            </div>
          </div>
        </div>

        <div class="w3-display-container w3-half w3-right w3-margin-bottom">
          <div class="w3-center">
            <button class="w3-button w3-teal w3-margin-left w3-right" (click)="finishEditing(person)">Save</button>
            <button class="w3-button w3-purple w3-margin-left w3-right" (click)="home()">Cancel</button>
            <button class="w3-button w3-red w3-right" (click)="removePerson(person)">Remove</button>
          </div>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent {
  personToRemove: string;
  person = new Person(0, '', '', '', '');

  constructor(private route: ActivatedRoute, private personService: PersonService, private router: Router) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.person = this.personService.getPerson(id);
  }

  removePerson(person: Person) {
    this.personToRemove = this.person.firstName + ' ' + this.person.lastName;
    if (confirm('Are you sure you want to remove ' + this.personToRemove + '?')) {
      this.personService.removePerson(person);
      this.home();
    }
  }

  finishEditing() {
    this.personService.updatePerson(this.person);
    this.home();
  }

  home(): void {
    this.router.navigateByUrl('/');
  }

  toggleDropdown(id1, id2) {
    const x = document.getElementById(id1);
    const y = document.getElementById(id2);
    if (x.className.indexOf('w3-show') === -1) {
      x.className += ' w3-show';
    } else {
      x.className = x.className.replace(' w3-show', '');
    }

    if (y.className.includes('fa fa-caret-down')) {
      y.className = y.className.replace('fa fa-caret-down', ' fa fa-caret-up');
    } else {
      y.className = y.className.replace('fa fa-caret-up', ' fa fa-caret-down');
    }
  }
}




