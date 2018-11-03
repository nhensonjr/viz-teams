import {Component, OnInit} from '@angular/core';
import {FirebaseTestItem, FirebaseTestService} from '../../services/firebase-test.service';

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

    <div *ngIf="singleItem">
      <h3>Single Item</h3>
      <div>
        <span>{{singleItem.id}} - {{singleItem.value}} - {{singleItem.color}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./firebase-test.component.scss']
})
export class FirebaseTestComponent implements OnInit {

  allItems: FirebaseTestItem[];
  queryItems: FirebaseTestItem[];
  singleItem: FirebaseTestItem;

  constructor(private service: FirebaseTestService) {
  }

  ngOnInit() {
    this.service.getTestList().subscribe(x => this.allItems = x);
    this.service.queryTestItem().subscribe(x => this.queryItems = x);
    this.service.getTestItem().subscribe(x => this.singleItem = x);
  }
}
