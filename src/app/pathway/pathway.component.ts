import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {PathwayService} from "../pathway.service";
import * as Showdown from 'showdown';
import {DomSanitizer} from "@angular/platform-browser";
import {getShowdown} from '@wikipathways/kaavio-showdown';

// TODO: Track https://github.com/furqanZafar/react-selectize/pull/130 and add back when can compile
// import {Pvjs} from 'pvjs';
declare var Pvjs: any;

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

  constructor(private route: ActivatedRoute, public pathwayService: PathwayService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.pathwayService.get(id).subscribe(pathway => {
        this.title = pathway.title;

        Pvjs.loadDiagram('#pathway', 'WP' + pathway.WPId, {
          width: '100%',
          height: '100%'
        }, instance => {
          this.pathwayInstance = instance;
          const showdown = getShowdown(instance);
          const converter = new showdown.Converter({extensions: ['kaavio']});
          this.description = this.sanitizer.bypassSecurityTrustHtml(converter.makeHtml(pathway.description)) as string;
        });
      });
    });
  }
}
