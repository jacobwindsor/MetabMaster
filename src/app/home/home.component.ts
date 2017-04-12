import { Component, OnInit } from '@angular/core';
import {PathwayService} from "../pathway.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pathways: any = [];

  constructor(public pathwayService: PathwayService) { }

  ngOnInit() {
    this.pathwayService.list().subscribe(pathways => {
      const newPathways = pathways.map(pathway => {
        return {
          title: pathway.title,
          id: pathway.id,
          image: this.pathwayService.staticImageUrlFromWPId(pathway.WPId)
        };
      });
      this.pathways = this.pathways.concat(newPathways);
    });
  }

}
