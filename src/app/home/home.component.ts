import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Pathway, PathwayService} from "../pathway.service";
import {PathwayListService} from "../pathway-list.service";
import {Observable, Subject} from "rxjs/Rx";
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements  OnInit {
  loading: boolean;
  limit = 10;
  private clickEvent: Subject<null[]> = new Subject();
  clickEvent$ = this.clickEvent.asObservable();
  pathways: any[] = [];
  private lastReversedCreatedAt: number;
  constructor(public pathwayList: PathwayListService, public pathwayService: PathwayService) { }

  ngOnInit() {
    this.loading = true;
    this.clickEvent$.startWith([]).flatMap((pathways: Pathway[]) => {
      // Use the lastReversedCreatedAt to start at
      // Add one to the timestamp to get the next one
      return this.pathwayService.list(this.limit, this.lastReversedCreatedAt + 1);
    }).map(pathways => {
      return pathways.map(singlePathway => {
        return Object.assign({image$: this.pathwayService.staticImageUrlFromWPId(singlePathway.WPId)}, singlePathway);
      });
    }).subscribe(pathways => {
      // The pathways service is inclusive so we remove any duplicates
      this.pathways = _.uniqBy(this.pathways.concat(pathways), 'id');
      this.lastReversedCreatedAt = pathways.length > 0 ? pathways[pathways.length - 1].reversedCreatedAt : null;
      this.loading = false;
    });
  }

  getNext() {
    this.clickEvent.next([]);
    this.loading = true;
  }
}
