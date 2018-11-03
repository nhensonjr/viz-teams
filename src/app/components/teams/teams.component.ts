import {Component} from '@angular/core';
import {TeamService} from '../../services/team.service';
import {Team} from '../../models/team';

@Component({
  selector: 'app-teams',
  template: `
    <div class="container">
      <div class="app-sidebar">
        <app-sidebar></app-sidebar>
      </div>
      <div [ngClass]="teams.length > 0 ? 'app-team-list team-view' : 'app-team-list no-team-view'">
        <app-team-list></app-team-list>
      </div>
    </div>

  `,
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {

  teams: Team[] = [];

  constructor(private teamService: TeamService) {
    this.teamService.getTeams().subscribe(t => this.getTeams(t));
  }

  getTeams(teams: Team[]): void {
    const theTeams: Team[] = [];
    for (const team of teams) {
      if (team.name !== '') {
        theTeams.push(team);
      }
    }
    this.teams = theTeams;
  }
}
