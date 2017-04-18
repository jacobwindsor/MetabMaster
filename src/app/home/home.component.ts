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
    this.pathwayService.list().subscribe(pathways => {
      console.log(pathways);
      const newPathways = pathways.map(pathway => {
        return {
          title: pathway.title,
          id: pathway.id,
          image: this.pathwayService.staticImageUrlFromWPId(pathway.WPId)
        };
      });
      this.pathways = this.pathways.concat(newPathways);
      this.loading = false;
    });
  }

}
