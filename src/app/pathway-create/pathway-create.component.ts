import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs";
import {PathwayService} from "../pathway.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

declare var Pvjs: any;

@Component({
  selector: 'app-pathway-create',
  templateUrl: './pathway-create.component.html',
  styleUrls: ['./pathway-create.component.css']
})
export class PathwayCreateComponent implements OnInit {

  constructor(public pathwayService: PathwayService, public auth: AuthService, public router: Router) { }

  ngOnInit() {

  }

  savePathway(val: any) {
    // TODO: Only fire when form valid
    this.pathwayService.create({
      WPId: val.WPId,
      title: val.title,
      description: val.description,
      userId: this.auth.user.uid
    }).then(key => {
      this.router.navigate(['/pathway', key]);
    }).catch(err => {
      console.log(err);
    });
  }
}
