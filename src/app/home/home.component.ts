import { Component, OnInit } from '@angular/core';
import {PathwayService} from "../pathway.service";
import {PathwayListService} from "../pathway-list.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pathways: any = [];
  loading: boolean;
  empty: boolean;

  constructor(public pathwayList: PathwayListService, public pathwayService: PathwayService) { }

  ngOnInit() {
    this.getPathways();
  }

  getPathways(startAt?) {
    this.pathways = this.pathwayList.pathwayList$
      .map(pathways => {
        if (pathways.length < 1) {
          return;
        }
        return pathways.map(singlePathway => {
          return {
            title: singlePathway.title,
            id: singlePathway.id,
            image: this.pathwayService.staticImageUrlFromWPId(singlePathway.WPId),
            createdAt: singlePathway.createdAt,
            reversedCreatedAt: singlePathway.reversedCreatedAt
          };
        });
      });
    this.loading = this.pathways.mapTo(false).startWith(true);
    this.pathwayList.next();
  }

  getNextPathways() {
    this.pathwayList.next();
  }

}
