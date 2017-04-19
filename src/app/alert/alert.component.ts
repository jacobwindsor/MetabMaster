import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  private allowed = ['success', 'warning', 'danger', 'info'];
  @Input() type: string; // success, warning, danger, info
  @Input() heading: string;
  @Input() message: string;
  constructor() { }

  ngOnInit() {
    if (! this.allowed.indexOf(this.type)) {
      // Default to info
      this.type = 'info';
    }
  }

}
