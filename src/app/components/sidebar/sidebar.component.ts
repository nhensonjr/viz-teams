import { Component } from '@angular/core';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';
import { Team } from '../../models/team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="sidebar" appDropTarget (myDrop)="onDrop($event,team)">
      <button class="w3-button w3-purple w3-animate-top" *ngIf="!isAdding" (click)="startAdding()">Add Person<i
        class='fas fa-user w3-margin-left'></i></button>
      <div *ngIf="isAdding" class="add-form w3-animate-top">
        <input class="w3-input" type="text" [(ngModel)]="person.firstName" placeholder="First Name"
               (ngModelChange)="validatePerson()">
        <input class="w3-input" type="text" [(ngModel)]="person.lastName" placeholder="Last Name"
               (ngModelChange)="validatePerson()">
        <input class="w3-input" type="text" [(ngModel)]="person.position" placeholder="Position"
               (ngModelChange)="validatePerson()">
        <input class="w3-input" type="text" [(ngModel)]="person.teamName" placeholder="Team Name"
               (ngModelChange)="validatePerson()">
        <div class="form-btns">
          <button class="w3-button w3-red w3-margin-right" (click)="stopAdding()">Cancel</button>
          <button class="w3-button w3-teal" (click)="finishAdding()" [disabled]="isDisabled()">Done</button>
        </div>
      </div>
      <br>

      <div class="freeAgentContainer w3-animate-left" *ngFor="let person of (freeAgents | sidebarSortAsc)">
        <div class="freeAgent" [appDraggable]="{data:person}">
          <p>{{ person.firstName }} {{ person.lastName }}, {{ person.position }}</p>
          <div class="form-btns">
            <div class="w3-container w3-hover-none w3-hover-text-red" (click)="removePerson(person)"><i
              class='fas fa-trash'></i></div>
            <div class="w3-container w3-hover-none w3-hover-text-teal" (click)="edit(person)"><i
              class='fas fa-edit'></i></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  people: Array<Person> = [];
  freeAgents: Array<Person> = [];
  isAdding = false;
  person: Person = new Person(0, '', '', '', '');
  canSubmit = false;
  team: Team;
  isAddingTeam = false;
  personToRemove: string;

  constructor(
    private personService: PersonService,
    private router: Router) {
    this.personService.getPeople().subscribe(p => this.getFreeAgents(p));
  }

  startAdding() {
    this.isAdding = true;
  }

  stopAdding() {
    this.isAdding = false;
    this.clearFields();
  }

  finishAdding() {
    // Temporary fix until database is hooked up
    const randomId = Math.floor(Math.random() * 1000);
    const person = new Person(randomId, this.person.firstName, this.person.lastName, this.person.position, this.person.teamName);
    this.personService.addPerson(person);
    this.stopAdding();
  }

  clearFields() {
    this.person = new Person(0, '', '', '', '');
    this.canSubmit = false;
  }

  validatePerson() {
    this.person.firstName !== ''
    && this.person.lastName !== ''
    && this.person.position !== ''
      ? this.canSubmit = true : this.canSubmit = false;
  }

  isDisabled() {
    return !this.canSubmit;
  }

  startAddingTeam() {
    this.isAddingTeam = true;
  }

  stopAddingTeam() {
    this.isAddingTeam = false;
    this.clearFields();
  }


  validateTeam() {
    this.team.name !== ''
      ? this.canSubmit = true : this.canSubmit = false;
  }

  isDisabledTeam() {
    return !this.canSubmit;
  }

  getFreeAgents(people: Person[]): void {
    const freeAgents: Person[] = [];
    for (const person of people) {
      if (person.teamName === '') {
        freeAgents.push(person);
      }
    }
    this.freeAgents = freeAgents;
  }

  onDrop(person: Person, team: Team) {
    person = new Person(person.id, person.firstName, person.lastName, person.position, person.teamName);
    this.personService.addToTeam(person, new Team(0, '', []));
  }

  edit(person: Person) {
    this.router.navigateByUrl('/edit/' + person.id);
  }

  removePerson(person: Person) {
    this.personToRemove = person.firstName + ' ' + person.lastName;
    if (confirm('Are you sure you want to remove ' + this.personToRemove + '?')) {
      this.personService.removePerson(person);
    }
  }
}
