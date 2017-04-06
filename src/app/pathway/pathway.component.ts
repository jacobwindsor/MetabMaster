import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {PathwayService} from "../pathway.service";
import * as Showdown from 'showdown';
import {DomSanitizer} from "@angular/platform-browser";

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

  constructor(private route: ActivatedRoute, public pathwayService: PathwayService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const showdownExt = () => {
      return [
        {
          type: 'lang',
          filter: function (text, converter, options) {
            // Replace zoomOn
            text = text.replace(/\[(?:(?:zoomOn) ([\w, ?]+))]\((.+)\)/g, (match, p1, p2) => {
              const nodes = p1.split(/\s*,\s*/);
              let nodesAsString = '[';
              nodes.forEach(node => {
                nodesAsString += `'${node}',`;
              });
              nodesAsString += ']';
              return `<a onclick="pathwayInstance.manipulator.zoomOn(${nodesAsString})">${p2}</a>`;
            });
            return text;
          }
        },
      ];
    };


    const converter = new Showdown.Converter({
      headerLevelStart: 2, // Set the header level to two since we have a title with h1
      extensions: showdownExt()
    });

    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.pathwayService.get(id).subscribe(pathway => {
        this.title = pathway.title;
        this.description = this.sanitizer.bypassSecurityTrustHtml(converter.makeHtml(pathway.description)) as string;


        Pvjs.loadDiagram('#pathway', 'WP' + pathway.WPId, {
          width: '100%',
          height: '100%'
        }, instance => {
          this.pathwayInstance = instance;
          window.pathwayInstance = instance;
        });
      });
    });
  }
}
