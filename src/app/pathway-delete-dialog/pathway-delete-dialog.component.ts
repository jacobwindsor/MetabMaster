import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-pathway-delete-dialog',
  templateUrl: './pathway-delete-dialog.component.html',
  styleUrls: ['./pathway-delete-dialog.component.css']
})
export class PathwayDeleteDialogComponent {

  constructor(private dialog: MdDialogRef<any>) { }

  cancel() {
    this.dialog.close({confirmed: false});
  }

  confirm() {
    this.dialog.close({confirmed: true});
  }
}
