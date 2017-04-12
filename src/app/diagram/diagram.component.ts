import {Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';

declare var Pvjs: any;

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent {
  @ViewChild('pathway') pathway;
  @Input('WPId') set WPId(WPId: number){this.loadDiagram(WPId);};

  // TODO: Use Pvjs type when can remove delcaration
  @Output() pathwayInstance = new EventEmitter<any>();

  constructor() { }

  loadDiagram(WPId: number) {
    if (! WPId) { return; }
    this.pathway.nativeElement.innerHTML = '';

    Pvjs.loadDiagram('#pathway', 'WP' + WPId, {
      width: '100%',
      height: '100%'
    }, instance => {
      this.pathwayInstance.emit(instance);
    });
  }
}
