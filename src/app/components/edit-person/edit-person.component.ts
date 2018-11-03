import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PersonService} from '../../services/person.service';
import {Person} from '../../models/person';

@Component({
  selector: 'app-edit-person',
  template: `
    <div class="container">
      <div class="edit-form">
        <div class="top">
          <div class="fields">
            <h1>Edit Team Member</h1>
            <form class="w3-container">
              <div class="form-group">
                <input type="text" class="form-control w3-input" name="firstName" id="firstName" placeholder="First Name" [(ngModel)]="person.firstName">
              </div>

              <div class="form-group">
                <input type="text" class="w3-input" name="lastName" id="lastName" placeholder="Last Name" [(ngModel)]="person.lastName">
              </div>

              <div class="form-group">
                <input type="text" class="w3-input" name="position" id="position" placeholder="Position" [(ngModel)]="person.position">
              </div>

              <div class="form-group">
                <input type="text" class="w3-input" name="teamName" id="teamName" placeholder="Team Name" [(ngModel)]="person.teamName">
              </div>

              <div class="w3-container w3-card-4">
                <h4>Proficiencies</h4>
                <p>
                  <input class="w3-check w3-margin-right" type="checkbox">
                  <label>CSS</label></p>
                <p>
                  <input class="w3-check w3-margin-right" type="checkbox">
                  <label>HTML</label></p>
                <p>
                  <input class="w3-check w3-margin-right" type="checkbox">
                  <label>JavaScript</label></p>
              </div>
            </form>
          </div>

          <div class="w3-bar">
            <button class="w3-button" (click)="removePerson(person)">Remove</button>
            <button class="w3-button" (click)="home()">Cancel</button>
            <button class="w3-button" (click)="finishEditing()">Save</button>
          </div>
        </div>
      </div>
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
    confirm('Are you sure you want to remove ' + this.personToRemove + '?');
    this.personService.removePerson(person);
    this.home();
  }

  finishEditing() {
    this.personService.updatePerson(this.person);
    this.home();
  }

  home(): void {
    this.router.navigateByUrl('/');
  }
}




