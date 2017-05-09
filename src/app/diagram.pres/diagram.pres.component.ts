import {Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';

declare var Pvjs: any;

@Component({
  selector: 'app-pres-diagram',
  templateUrl: './diagram.pres.component.html',
  styleUrls: ['./diagram.pres.component.scss']
})
export class DiagramPresComponent {
  @ViewChild('pathway') pathway;
  @Input('WPId') set WPId(WPId: number){this.loadDiagram(WPId); };

  // TODO: Use Pvjs type when can remove delcaration
  @Output() pathwayInstance = new EventEmitter<any>();

  constructor() { }

  loadDiagram(WPId: number) {
    if (! WPId) { return; }
    this.pathway.nativeElement.innerHTML = '';

    Pvjs.loadDiagram('#' + this.pathway.nativeElement.id, 'WP' + WPId, {
      width: '100%',
      height: '100%'
    }, instance => {
      this.pathwayInstance.emit(instance);
    });
  }
}
