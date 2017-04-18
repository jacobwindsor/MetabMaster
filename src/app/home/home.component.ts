import { Component, OnInit } from '@angular/core';
import {PathwayService} from "../pathway.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pathways: any = [];
  loading: boolean;

  constructor(public pathwayService: PathwayService) { }

  ngOnInit() {
    this.loading = true;
    this.pathwayService.list()
      .map(pathway => {
        return {
          title: pathway.title,
          id: pathway.id,
          image: this.pathwayService.staticImageUrlFromWPId(pathway.WPId),
          createdAt: pathway.createdAt
        };
      })
      .scan((acc, x) => {
        acc.push(x);
        return acc;
      }, [])
      .map(pathways => {
        const sorted = pathways.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          return 0;
        });
        return sorted;
      })
      .subscribe(pathways => {
        this.pathways = pathways;
        this.loading = false;
      });
  }

}
