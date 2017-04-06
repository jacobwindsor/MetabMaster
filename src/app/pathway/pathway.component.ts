import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {PathwayService} from "../pathway.service";
import * as Showdown from 'showdown';

// TODO: Track https://github.com/furqanZafar/react-selectize/pull/130 and add back when can compile
// import {Pvjs} from 'pvjs';
declare var Pvjs: any;
declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './pathway.component.html',
  styleUrls: ['./pathway.component.css']
})
export class PathwayComponent implements OnInit {
  @ViewChild('pathway') pathwayElem;
  pathwayInstance: any;
  title: string;
  description: string;

  constructor(private route: ActivatedRoute, public pathwayService: PathwayService) { }

  ngOnInit(): void {
    const converter = new Showdown.Converter({
      headerLevelStart: 2
    });

    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.pathwayService.get(id).subscribe(pathway => {
        this.title = pathway.title;
        this.description = converter.makeHtml(pathway.description);


        Pvjs.loadDiagram('#pathway', 'WP' + pathway.WPId, {
          width: '100%',
          height: '100%'
        }, instance => {
          this.pathwayInstance = instance;
          window.instance = instance;
        });
      });
    });
  }
}
