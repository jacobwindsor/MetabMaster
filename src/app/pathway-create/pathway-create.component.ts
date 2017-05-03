import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs/Rx";
import {PathwayService} from "../pathway.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NotifierService} from "../notifier.service";

declare var Pvjs: any;

@Component({
  selector: 'app-pathway-create',
  templateUrl: './pathway-create.component.html',
  styleUrls: ['./pathway-create.component.css']
})
export class PathwayCreateComponent implements OnInit {

  constructor(public pathwayService: PathwayService, public auth: AuthService, public router: Router,
              private notifier: NotifierService) { }

  ngOnInit() {

  }

  savePathway(val: any) {
    this.pathwayService.create({
      WPId: parseInt(val.WPId, 10),
      title: val.title,
      description: val.markdown,
      userId: this.auth.user.uid
    }).then(key => {
      this.router.navigate(['/pathway', key]);
    }).catch(err => {
      this.notifier.notify(err.message, 'error');
    });
  }
}
