import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PathwayService} from "../pathway.service";
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
  pathwayInstance: any; // TODO: set type to Pvjs
  title: string;
  markdown: string; // Not parsed from Markdown
  WPId: number;
  private id: string;

  constructor(private route: ActivatedRoute, public pathwayService: PathwayService,
              private dialog: MdDialog, public router: Router) { }

  ngOnInit(): void {
    this.retrievingData = true;
    this.pathwayLoading = true;

    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.id = id;
      this.pathwayService.get(id).subscribe(pathway => {
        this.title = pathway.title;
        this.WPId = pathway.WPId;
        this.markdown = pathway.description;
        this.retrievingData = false;
      });
    });
  }

  pathwayLoaded = (pathwayInstance: any) => {
    pathwayInstance.ready.subscribe(ready => {
      if (ready) {
        this.pathwayInstance = pathwayInstance;
      }
    });
  };

  destroy(): void {
    this.dialog.open(PathwayDeleteDialogComponent)
      .afterClosed().subscribe(result => {
        if (result.confirmed) {
          this.pathwayService.destroy(this.id).then(_ => {
            this.router.navigate(['']);
          });
        }
    });
  }
}
