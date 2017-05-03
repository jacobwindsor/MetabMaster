import {Component, Input, OnInit} from '@angular/core';
import Noty from 'noty';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  private allowed = ['success', 'warning', 'error', 'alert', 'info'];
  @Input() type: string;
  @Input() heading: string;
  @Input() message: string;
  constructor() { }

  ngOnInit() {
    if (! this.allowed.indexOf(this.type)) {
      // Default to info
      this.type = 'info';
    }

    new Noty({
      type: this.type,
      text: this.message,
      timeout: 3000,
      closeWith: ['click', 'button'],
      queue: 'global',
      animation: {
        open: 'noty_effects_open',
        close: 'noty_effects_close'
      },
    }).show();
  }

}
