import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  title = 'My pathway';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route)
    this.route.params.subscribe((params: Params) => {
      Pvjs.loadDiagram('#pathway', 'WP' + params.id, {
        width: '100%',
        height: '100%'
      }, instance => {
        this.pathwayInstance = instance;
        window.instance = instance;
      });
    });
  }
}
