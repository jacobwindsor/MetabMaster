import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Pathway, PathwayService} from "../pathway.service";
import {MdDialog} from "@angular/material";
import {PathwayDeleteDialogComponent} from "../pathway-delete-dialog/pathway-delete-dialog.component";
import {NotifierService} from "../notifier.service";

// TODO: Track https://github.com/furqanZafar/react-selectize/pull/130 and add back when can compile
// import {Pvjs} from 'pvjs';
declare var Pvjs: any;

@Component({
  selector: 'app-pathway',
  templateUrl: './pathway.component.html',
  styleUrls: ['./pathway.component.scss']
})
export class PathwayComponent implements OnInit {
  error: {heading: string, message: string};
  loading: boolean;
  pathwayInstance: any; // TODO: set type to Pvjs
  title: string;
  markdown: string; // Not parsed from Markdown
  WPId: number;
  private id: string;

  constructor(private route: ActivatedRoute, public pathwayService: PathwayService,
              private dialog: MdDialog, public router: Router, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.notifier.notify(`
      <h3>Not working?</h3>
      <p>
        Diagrams may not render correctly in some browsers. Please download the latest version of Chrome 
        <a href="https://www.google.co.uk/chrome/browser/desktop/index.html" target="_blank">here</a>.
      </p>
    `, 'info', false);
    this.loading = true;

    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.id = id;
      this.pathwayService.get(id).subscribe((pathway: Pathway) => {
        this.title = pathway.title;
        this.WPId = pathway.WPId;
        this.markdown = pathway.description;
      }, err => {
        this.loading = false;
        this.error = {heading: 'Couldn\'t get that pathway!', message: 'Does it exist? Try refreshing the page.'};
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

  onDescriptionRenderedChange(rendered: boolean): void {
    if (! rendered) { return; }

    this.loading = false;
  }

  destroy(): void {
    this.dialog.open(PathwayDeleteDialogComponent)
      .afterClosed().subscribe(result => {
        if (result.confirmed) {
          this.pathwayService.destroy(this.id).then(_ => {
            this.router.navigate(['']);
          }).catch(err => {
            this.notifier.notify(err.message, 'error');
          });
        }
    });
  }
}
