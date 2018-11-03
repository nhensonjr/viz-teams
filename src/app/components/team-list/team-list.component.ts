import {Component, Input} from '@angular/core';
import {Person} from '../../models/person';
import {PersonParserService} from '../../services/person-parser.service';
import {Team} from '../../models/team';
import {PersonService} from '../../services/person.service';
import {TeamService} from '../../services/team.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-team-list',
  template: `
    <div *ngIf="teams.length <= 0" class="no-teams w3-container">
      <div class="w3-margin w3-large">
        Would you like to add a team?
      </div>
      <button onclick="document.getElementById('addTeamModal').style.display='flex'" class="w3-button w3-teal">
        Add Team
      </button>
    </div>

    <!--<div *ngIf="teams.length > 0" class="">-->
    <!--<div *ngFor="let team of (teams | teamSortAsc)">-->
    <!--<div class="w3-card-4 w3-margin w3-pink">-->
    <!--<h3>{{team.name}}</h3>-->
    <!--<div *ngFor="let person of (team.members | personSortAsc)">-->
    <!--<div class="w3-content w3-padding-large">-->
    <!--<div>{{person.firstName}} {{person.lastName}}</div>-->
    <!--<div>, {{person.position}}</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <div *ngIf="teams.length > 0" class="team-list">
      <button class="add-team w3-button w3-teal w3-animate-top"
              onclick="document.getElementById('addTeamModal').style.display='flex'">
        Add Teams
      </button>
      <div class="team-column w3-animate-top" *ngFor='let team of (teams | teamSortAsc)'>
        <div class="drop-target" appDropTarget (myDrop)="onDrop($event,team)">
          <div class="team-header w3-display-container w3-padding w3-margin-top w3-teal w3-center">
            {{team.name}} Team
            <div class="w3-display-right" (click)="removeTeam(team)">
              <div class="w3-container w3-hover-none w3-hover-text-red"><i class='fas fa-trash'></i></div>
            </div>
          </div>
          <div *ngFor='let person of (team.members | personSortAsc)'>
            <div [appDraggable]="{data:person}" class="team-member">
              <div class="details">
                <div>{{person.firstName}} {{person.lastName}},</div>
                <div>{{person.position}}</div>
              </div>
              <div id="edit" class="btns">
                  <div class="w3-container w3-hover-none w3-hover-text-green" (click)="edit(person)"><i class='fas fa-pen'></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="addTeamModal" class="w3-modal">
      <div class="w3-modal-content w3-card-4 w3-animate-top">
        <header class="w3-container w3-teal w3-center">
      <span onclick="document.getElementById('addTeamModal').style.display='none'"
            class="w3-button w3-display-topright">&times;</span>
          <h2>Add Team</h2>
        </header>
        <div class="w3-container w3-margin">
          <input class="w3-input" type="text" [(ngModel)]="team.name" placeholder="Team Name" (change)="validateTeam()">
        </div>
        <div class="w3-container w3-margin">
          <button class="w3-button w3-teal w3-margin-bottom w3-margin-left w3-right" (click)="addTeam()"
                  onclick="document.getElementById('addTeamModal').style.display='none'">
            Save
          </button>
          <button class="w3-button w3-red w3-right" onclick="document.getElementById('addTeamModal').style.display='none'">
            Cancel
          </button>
        </div>
      </div>
    </div>


    <!--<div class="button-container">-->
    <!--<button class='realButton' onclick="document.getElementById('addTeamModal').style.display='block'">-->
    <!--Add New Team-->
    <!--</button>-->
    <!--<button class="realButton" (click)="openUpload()">-->
    <!--Import <input type="file" class="hiddenUpload" id="srcfile" ngModel (change)="checkExtension($event)" accept=".csv" visibility="hidden">-->
    <!--</button>-->
    <!--<button class="realButton" (click)="exportCsv()" >-->
    <!--Export-->
    <!--</button>-->
    <!--<button class="realButton" (click)="templateCsv()">-->
    <!--Template-->
    <!--</button>-->
    <!--</div>-->
  `,
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent {
  @Input() people: Person[] = [];

  valid = '';
  validation = '';

  teams: Team[] = [];
  team: Team = new Team(0, '', []);
  canSubmit = false;

  constructor(
    private personParserService: PersonParserService,
    private personService: PersonService,
    private teamService: TeamService,
    private router: Router,
  ) {
    this.teamService.getTeams().subscribe(t => this.getTeams(t));
  }

  onDrop(person: Person, team: Team) {
    person = new Person(person.id, person.firstName, person.lastName, person.position, person.teamName);
    this.personService.addToTeam(person, team);
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

  removeTeam(team: Team): void {
    if (confirm('This will permanently delete this team, are you sure?')) {
      this.teamService.removeTeam(team);
    }
  }

  addTeam() {
    // Temporary fix until database is hooked up
    const randomId = Math.floor(Math.random() * 1000);
    const thisTeam = new Team(randomId, this.team.name, []);
    this.teamService.addTeam(thisTeam);
    this.team = new Team(0, '', []);
  }

  validateTeam() {
    this.team.name !== ''
      ? this.canSubmit = true : this.canSubmit = false;
  }

  edit(person: Person): void {
    this.router.navigateByUrl('/edit/' + person.id);
  }

  checkExtension(val): void {
    const fileList = val.srcElement.files;
    const fileName = fileList[0].name.split('.');
    const extension = fileName[1];
    if (extension === 'csv') {
      this.valid = 'Valid';
      this.validation = 'green';
      if (confirm('Importing will delete current data. Are you sure?')) {
        this.importCsv(val);
        (< HTMLInputElement > document.getElementById('srcfile')).value = null;
      }

    } else {
      this.valid = 'Invalid';
      this.validation = 'red';
    }
  }

  importCsv(val): void {
    const file = new Blob(val.srcElement.files);
    this.personParserService.parsecsv(file);
  }

  exportCsv(): void {
    this.personParserService.unparseIntoFile();
  }

  templateCsv(): void {
    const fileText = 'Firstname, Lastname, Position, Team' + '\n';
    this.downloadTemplate(fileText);
  }

  openUpload(): void {
    if (this.detectIEorFirefox()) {
      document.getElementById('srcfile').click();
    }
  }

  detectIEorFirefox(): boolean {
    const ua = window.navigator.userAgent;

    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return true;
    }

    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      return true;
    }

    const edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return true;
    }

    const firefox = ua.indexOf('Firefox/');
    if (firefox > 0) {
      return true;
    }

    // other browser
    return false;
  }

  downloadTemplate(data: any) {
    const blob = new Blob([data], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = 'VizTeamsTemplate.csv';
    anchor.href = url;
    anchor.click();
  }
}
