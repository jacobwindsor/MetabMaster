import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {PathwayService} from "../pathway.service";
import * as Showdown from 'showdown';
import {DomSanitizer} from "@angular/platform-browser";
import {getShowdown} from '@wikipathways/kaavio-showdown';
import {MdDialog} from "@angular/material";
import {PathwayDeleteDialogComponent} from "../pathway-delete-dialog/pathway-delete-dialog.component";

// TODO: Track https://github.com/furqanZafar/react-selectize/pull/130 and add back when can compile
// import {Pvjs} from 'pvjs';
declare var Pvjs: any;

@Component({
  selector: 'app-pathway',
  templateUrl: './pathway.component.html',
  styleUrls: ['./pathway.component.css']
})
export class PathwayComponent implements OnInit {
  retrievingData: boolean;
  pathwayLoading: boolean;
  title: string;
  private rawDescription: string; // Not parsed from Markdown
  description: string;
  WPId: number;
  private id: string;

  constructor(private route: ActivatedRoute, public pathwayService: PathwayService,
              private sanitizer: DomSanitizer, private dialog: MdDialog) { }

  ngOnInit(): void {
    this.retrievingData = true;
    this.pathwayLoading = true;

    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.id = id;
      this.pathwayService.get(id).subscribe(pathway => {
        this.title = pathway.title;
        this.WPId = pathway.WPId;
        this.rawDescription = pathway.description;
        this.retrievingData = false;
      });
    });
  }

  pathwayLoaded(pathwayInstance: any) {
    const showdown = getShowdown(pathwayInstance);
    const converter = new showdown.Converter({extensions: ['kaavio']});
    this.description = this.sanitizer.bypassSecurityTrustHtml(converter.makeHtml(this.rawDescription)) as string;
    this.pathwayLoading = false;
  }

  destroy(): void {
    this.dialog.open(PathwayDeleteDialogComponent)
      .afterClosed().subscribe(result => {
        if (result.confirmed) {
          this.pathwayService.destroy(this.id);
        }
    });
  }
}
