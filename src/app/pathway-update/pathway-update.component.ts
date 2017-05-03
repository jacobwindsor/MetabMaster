import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PathwayService} from "../pathway.service";
import {NotifierService} from "../notifier.service";

@Component({
  selector: 'app-pathway-update',
  templateUrl: './pathway-update.component.html',
  styleUrls: ['./pathway-update.component.css']
})
export class PathwayUpdateComponent implements OnInit {
  loading: boolean;
  title: string;
  WPId: number;
  markdown: string;
  private id: string;
  private userId: string;


  constructor(private route: ActivatedRoute, public pathwayService: PathwayService, private router: Router,
              private notifier: NotifierService) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      const id: string = params.id;
      this.id = id;
      this.pathwayService.get(id).subscribe(pathway => {
        console.log(pathway);
        this.title = pathway.title;
        this.WPId = pathway.WPId;
        this.markdown = pathway.description;
        this.userId = pathway.userId;
        this.loading = false;
      });
    });
  }

  updatePathway(val) {
    this.pathwayService.update(this.id, {
      WPId: val.WPId,
      title: val.title,
      description: val.markdown
    }).then(_ => {
      this.router.navigate(['/pathway', this.id]);
    }).catch(err => {
      this.notifier.notify(err.message, 'error');
    });
  }

}
