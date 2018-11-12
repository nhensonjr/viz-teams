import { Component, OnInit } from '@angular/core';
import { FirebaseTestItem, FirebaseTestService } from '../../services/firebase-test.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-firebase-test',
  template: `
    <div *ngIf="allItems">
      <h3>All Items</h3>
      <div *ngFor="let item of allItems">
        <span>{{item.id}} - {{item.value}} - {{item.color}}</span>
      </div>
    </div>

    <div *ngIf="queryItems">
      <h3>Items Where Color == Red</h3>
      <div *ngFor="let item of queryItems">
        <span>{{item.id}} - {{item.value}} - {{item.color}}</span>
      </div>
    </div>

    <div *ngIf="user">
      <h3>Single Item</h3>
      <div>
        <span>{{user.firstName}} - {{user.lastName}} - {{user.position}} - {{user.email}} - {{user.password}}</span>
        <button (click)="register()">reg</button>
      </div>
    </div>
  `,
  styleUrls: ['./firebase-test.component.scss']
})
export class FirebaseTestComponent implements OnInit {

  allItems: FirebaseTestItem[];
  queryItems: FirebaseTestItem[];
  singleItem: FirebaseTestItem;
  user: User;

  constructor(private service: FirebaseTestService, private userService: UserService) {
  }

  ngOnInit() {
    this.service.getTestList().subscribe(x => this.allItems = x);
    this.service.queryTestItem().subscribe(x => this.queryItems = x);
    this.service.getTestItem().subscribe(x => this.singleItem = x);
    this.userService.getUser().subscribe(x => this.user = x);
  }

  register() {
    this.userService.register();
  }
}
