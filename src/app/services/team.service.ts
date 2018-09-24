import { Injectable } from '@angular/core';
import { PersonService } from './person.service';
import { Team } from '../models/team';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable()
export class TeamService {
  teamsSubject: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);

  constructor(private personService: PersonService) {
    this.personService.getPeople().subscribe(p => this.buildTeams(p));
  }

  buildTeams(people: Person[]): void {
    const teams: Array<Team> = [];
    people.forEach(person => {
      if (!teams.find(t => t.name === person.teamName)) {
        teams.push(new Team(person.teamName, [person]));
      } else {
        teams[teams.indexOf(teams.find(t => t.name === person.teamName))].members.push(person);
      }
    });

    this.teamsSubject.next(teams);
  }

  getTeams(): Observable<Team[]> {
    return this.teamsSubject;
  }
}
